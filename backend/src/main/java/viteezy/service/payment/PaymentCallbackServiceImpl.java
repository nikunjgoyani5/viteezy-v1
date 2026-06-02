package viteezy.service.payment;

import be.woutschoovaerts.mollie.data.common.Amount;
import be.woutschoovaerts.mollie.data.common.Link;
import be.woutschoovaerts.mollie.data.payment.PaymentDetailsResponse;
import be.woutschoovaerts.mollie.data.payment.PaymentLinks;
import be.woutschoovaerts.mollie.data.payment.PaymentResponse;
import be.woutschoovaerts.mollie.data.payment.SequenceType;
import com.google.common.base.Throwables;
import io.vavr.collection.Seq;
import io.vavr.control.Try;
import net.jodah.failsafe.function.CheckedSupplier;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import viteezy.configuration.PaymentConfiguration;
import viteezy.controller.dto.TestCallbackPaymentPostRequest;
import viteezy.db.DelayedOrderItemRepository;
import viteezy.db.OrderShipmentMetadataRepository;
import viteezy.db.PaymentPlanRepository;
import viteezy.domain.*;
import viteezy.domain.blend.BlendIngredient;
import viteezy.domain.fulfilment.DelayedOrderItem;
import viteezy.domain.fulfilment.DelayedOrderItemStatus;
import viteezy.domain.fulfilment.DelayedShipmentType;
import viteezy.domain.fulfilment.Order;
import viteezy.domain.fulfilment.OrderShipmentMetadata;
import viteezy.domain.fulfilment.ShipmentPreference;
import viteezy.domain.ingredient.Ingredient;
import viteezy.domain.payment.*;
import viteezy.domain.pricing.*;
import viteezy.gateways.facebook.FacebookService;
import viteezy.gateways.googleanalytics.GoogleAnalyticsService;
import viteezy.gateways.klaviyo.KlaviyoService;
import viteezy.gateways.slack.SlackService;
import viteezy.service.CustomerService;
import viteezy.service.IngredientService;
import viteezy.service.LoggingService;
import viteezy.service.blend.BlendIngredientService;
import viteezy.service.fulfilment.OrderService;
import viteezy.service.mail.EmailService;
import viteezy.service.pricing.CouponService;
import viteezy.service.pricing.ReferralService;
import viteezy.traits.EnforcePresenceTrait;
import viteezy.traits.RetryTrait;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.util.*;
import java.util.function.Consumer;
import java.util.stream.Collectors;

public class PaymentCallbackServiceImpl implements PaymentCallbackService, EnforcePresenceTrait, RetryTrait  {

    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentCallbackService.class);

    private final MollieService mollieService;
    private final PaymentPlanRepository paymentPlanRepository;
    private final PaymentService paymentService;
    private final GoogleAnalyticsService googleAnalyticsService;
    private final FacebookService facebookService;
    private final PaymentConfiguration paymentConfiguration;
    private final EmailService emailService;
    private final CouponService couponService;
    private final ReferralService referralService;
    private final CustomerService customerService;
    private final ReferralDiscount referralDiscount;
    private final SlackService slackService;
    private final OrderService orderService;
    private final OrderShipmentMetadataRepository orderShipmentMetadataRepository;
    private final DelayedOrderItemRepository delayedOrderItemRepository;
    private final BlendIngredientService blendIngredientService;
    private final IngredientService ingredientService;
    private final LoggingService loggingService;
    private final KlaviyoService klaviyoService;

    protected PaymentCallbackServiceImpl(
            MollieService mollieService, PaymentPlanRepository paymentPlanRepository, PaymentService paymentService,
            GoogleAnalyticsService googleAnalyticsService, FacebookService facebookService,
            PaymentConfiguration paymentConfiguration, EmailService emailService,
            CouponService couponService, ReferralService referralService,
            CustomerService customerService, SlackService slackService, OrderService orderService,
            OrderShipmentMetadataRepository orderShipmentMetadataRepository,
            DelayedOrderItemRepository delayedOrderItemRepository,
            BlendIngredientService blendIngredientService, IngredientService ingredientService,
            LoggingService loggingService, KlaviyoService klaviyoService) {
        this.mollieService = mollieService;
        this.paymentPlanRepository = paymentPlanRepository;
        this.paymentService = paymentService;
        this.googleAnalyticsService = googleAnalyticsService;
        this.facebookService = facebookService;
        this.paymentConfiguration = paymentConfiguration;
        this.emailService = emailService;
        this.couponService = couponService;
        this.referralService = referralService;
        this.customerService = customerService;
        this.referralDiscount = referralService.getReferralDiscount();
        this.slackService = slackService;
        this.orderService = orderService;
        this.orderShipmentMetadataRepository = orderShipmentMetadataRepository;
        this.delayedOrderItemRepository = delayedOrderItemRepository;
        this.blendIngredientService = blendIngredientService;
        this.ingredientService = ingredientService;
        this.loggingService = loggingService;
        this.klaviyoService = klaviyoService;
    }

    @Override
    public Try<PaymentPlan> testProcessCallback(TestCallbackPaymentPostRequest testCallbackPaymentPostRequest) {
        if (isTestMode()) {
            return processCallback(buildTestPaymentResponse(testCallbackPaymentPostRequest))
                .onFailure(peekException());
        } else {
            return Try.failure(new NoSuchMethodException());
        }
    }

    @Override
    public Try<PaymentPlan> processCallback(String paymentId) {
        LOGGER.debug("handling callback for mollie payment id={}", paymentId);
        return mollieService.find(paymentId)
                .flatMap(this::processCallback)
                .onFailure(peekException());
    }

    private Try<PaymentPlan> processCallback(PaymentResponse paymentResponse) {
        LOGGER.debug("handling paymentResponse={}", paymentResponse);
        final Integer referralId = (Integer) paymentResponse.getMetadata().get(MollieMetadataKeys.REFERRAL_ID);
        final String fbc = (String) paymentResponse.getMetadata().get(MollieMetadataKeys.FACEBOOK_CLICK_ID);
        final String gaSessionId = (String) paymentResponse.getMetadata().get(MollieMetadataKeys.GA_SESSION_ID);
        final ShipmentPreference shipmentPreference = getShipmentPreference(paymentResponse);
        return getPaymentPlanExternalReference(paymentResponse)
                .flatMap(paymentPlanRepository::find)
                .flatMap(paymentPlan -> savePaymentIfNotExist(paymentPlan, paymentService.buildPayment(paymentPlan.id(), paymentResponse), referralId, fbc, gaSessionId, shipmentPreference));
    }

    private Try<PaymentPlan> savePaymentIfNotExist(PaymentPlan paymentPlan, Payment payment, Integer referralId,
                                                   String fbc, String gaSessionId, ShipmentPreference shipmentPreference) {
        if (checkExistingPayment(payment)) {
            return paymentService.save(payment)
                    .flatMap(savedPayment -> handlePayment(paymentPlan, savedPayment, referralId, fbc, gaSessionId, shipmentPreference));
        } else {
            LOGGER.debug("Payment already exist for mollie payment id={}", payment.getMolliePaymentId());
            return Try.success(paymentPlan);
        }
    }

    private boolean checkExistingPayment(Payment payment) {
        final Try<Payment> optionalPayment = paymentService.getByMolliePaymentId(payment.getMolliePaymentId());
        return optionalPayment.isFailure() || !payment.getStatus().equals(optionalPayment.get().getStatus());
    }

    private Try<PaymentPlan> handlePayment(PaymentPlan paymentPlan, Payment payment, Integer referralId,
                                           String fbc, String gaSessionId, ShipmentPreference shipmentPreference) {
        switch (payment.getStatus()) {
            case paid:
                return handlePaymentPaid(payment, paymentPlan, referralId, fbc, gaSessionId, shipmentPreference);
            case open:
            case pending:
            case authorized:
                LOGGER.warn("callback should not be called for id: {} status: {}", payment.getMolliePaymentId(), payment.getStatus());
                break;
            case failed:
            case chargeback:
            case canceled:
            case expired:
                return cancelPaymentPlan(paymentPlan, payment);
        }
        return Try.success(paymentPlan);
    }

    private Try<PaymentPlan> cancelPaymentPlan(PaymentPlan paymentPlan, Payment payment) {
        if (SequenceType.RECURRING.equals(payment.getSequenceType())) {
            notifyCustomerMissingPayment(paymentPlan, payment);
        }
        if (PaymentPlanStatus.PENDING.equals(paymentPlan.status()) || (PaymentPlanStatus.ACTIVE.equals(paymentPlan.status()) && payment.getRetriedMolliePaymentId() == null)) {
            return paymentPlanRepository.update(buildPaymentPlan(paymentPlan, PaymentPlanStatus.CANCELED))
                    .peek(canceledPaymentPlan -> customerService.find(canceledPaymentPlan.customerId())
                            .flatMap(customer -> klaviyoService.upsertFullProfile(customer, canceledPaymentPlan))
                            .peek(customer -> loggingService.create(canceledPaymentPlan.customerId(), LoggingEvent.PAYMENT_PLAN_CANCELED, "Abonnement door systeem stopgezet vanwege betaling: " + payment.getStatus())));
        } else {
            return Try.success(paymentPlan);
        }
    }

    private Try<PaymentPlan> handlePaymentPaid(Payment payment, PaymentPlan paymentPlan, Integer referralId,
                                               String fbc, String gaSessionId, ShipmentPreference shipmentPreference) {
        switch (payment.getSequenceType()) {
            case FIRST:
                return handleFirstPaid(payment, paymentPlan, referralId, fbc, gaSessionId, shipmentPreference);
            case RECURRING:
                return handleRecurringPaid(payment, paymentPlan);
            default:
                return Try.failure(new RuntimeException("Invalid switch case"));
        }
    }

    private void notifyCustomerMissingPayment(PaymentPlan paymentPlan, Payment payment) {
        customerService.find(paymentPlan.customerId())
                .peek(customer -> emailService.sendPaymentMissing(customer.getFirstName(), customer.getEmail(), payment, paymentPlan.externalReference(), 1))
                .onFailure(peekException());
    }

    private Try<PaymentPlan> handleRecurringPaid(Payment payment, PaymentPlan paymentPlan) {
        return paymentPlanRepository.update(buildPaymentPlanForFutureDelivery(paymentPlan, payment.getPaymentDate()))
                .peek(handlePaymentActions(payment, true, false, null, null, ShipmentPreference.HOLD_ORDER));
    }

    private PaymentPlan buildPaymentPlanForFutureDelivery(PaymentPlan paymentPlan, LocalDateTime paidAt) {
        final LocalDateTime deliveryDate = paidAt.plusDays(paymentConfiguration.getDeliveryDateInDays());
        return new PaymentPlan(paymentPlan.id(), paymentPlan.firstAmount(), paymentPlan.recurringAmount(),
                paymentPlan.recurringMonths(), paymentPlan.customerId(),
                paymentPlan.blendId(), paymentPlan.externalReference(), paymentPlan.creationDate(),
                null, paymentPlan.status(), paymentPlan.paymentDate(), paymentPlan.stopReason(),
                deliveryDate, paymentPlan.nextPaymentDate(), paymentPlan.nextDeliveryDate(), paymentPlan.paymentMethod());
    }

    private Try<PaymentPlan> handleFirstPaid(Payment payment, PaymentPlan paymentPlan, Integer referralId,
                                             String fbc, String gaSessionId, ShipmentPreference shipmentPreference) {
        if (referralId != null) {
            checkAndUpdateReferralPaid(referralId.longValue());
        }
        checkAndUpdateCouponPaid(paymentPlan.id());

        if (payment.getRetriedMolliePaymentId() != null) {
            return paymentService.getByMolliePaymentId(payment.getRetriedMolliePaymentId())
                    .filter(__ -> !PaymentPlanStatus.SUSPENDED.equals(paymentPlan.status()))
                    .flatMap(retriedPayment -> updatePaymentPlanWithActions(paymentPlan, PaymentReason.DELIBERATELY_REVERSED.equals(retriedPayment.getReason()) || PaymentPlanStatus.STOPPED.equals(paymentPlan.status()) ? PaymentPlanStatus.STOPPED : PaymentPlanStatus.ACTIVE, payment, retriedPayment.getPaymentDate() == null, SequenceType.FIRST.equals(retriedPayment.getSequenceType()), fbc, gaSessionId, shipmentPreference))
                    .recoverWith(NoSuchElementException.class, throwable -> tryToRecoverFromException(paymentPlan))
                    .onFailure(peekException());
        } else {
            PaymentPlanStatus paymentPlanStatus = PaymentPlanStatus.PENDING_SINGLE_BUY.equals(paymentPlan.status())
                    ? PaymentPlanStatus.PAID_SINGLE_BUY
                    : PaymentPlanStatus.ACTIVE;
            return updatePaymentPlanWithActions(paymentPlan, paymentPlanStatus, payment, true, true, fbc, gaSessionId, shipmentPreference);
        }
    }

    private Try<PaymentPlan> updatePaymentPlanWithActions(PaymentPlan paymentPlan, PaymentPlanStatus status, Payment payment,
                                                          boolean createOrder, boolean sendTracking, String fbc,
                                                          String gaSessionId, ShipmentPreference shipmentPreference) {
        return paymentPlanRepository.update(buildPaymentPlan(paymentPlan, status))
                .peek(handlePaymentActions(payment, createOrder, sendTracking, fbc, gaSessionId, shipmentPreference));
    }

    private Consumer<PaymentPlan> handlePaymentActions(Payment payment, boolean createOrder, boolean sendTracking,
                                                       String fbc, String gaSessionId, ShipmentPreference shipmentPreference) {
        return paymentPlan -> {
            if (createOrder) {
                customerService.find(paymentPlan.customerId())
                        .peek(customer -> createOrderTracking(payment, fbc, paymentPlan, customer, sendTracking, gaSessionId, shipmentPreference));
                if (sendTracking || StringUtils.isNotEmpty(payment.getRetriedMolliePaymentId())) {
                    slackService.notify(paymentPlan, StringUtils.isNotEmpty(payment.getRetriedMolliePaymentId()), isTestMode());
                }
            }
        };
    }

    private void createOrderTracking(Payment payment, String fbc, PaymentPlan paymentPlan, Customer customer,
                                     boolean sendTracking, String gaSessionId, ShipmentPreference shipmentPreference) {
        saveOrderWithRetry(payment, paymentPlan, customer)
                .peek(order -> saveDelayedShipmentTracking(order, paymentPlan, shipmentPreference))
                .onFailure(peekException());
        klaviyoService.upsertFullProfile(customer, paymentPlan)
                .peek(customer1 -> klaviyoService.createPurchasePaidEvent(customer1, paymentPlan, payment));
        if (sendTracking) {
            emailService.createOrder(customer, paymentPlan);
            googleAnalyticsService.sendEcommerceTransaction(customer, paymentPlan, gaSessionId);
        }
        facebookService.sendPurchaseEvent(customer, paymentPlan, sendTracking, payment.getMolliePaymentId(), fbc);
    }

    private Try<Order> saveOrderWithRetry(Payment payment, PaymentPlan paymentPlan, Customer customer) {
        final CheckedSupplier<Try<Order>> supplier = () -> orderService.save(payment, paymentPlan, customer);
        return triggerCallWithRetry(supplier, peekException(), retryPolicy());
    }

    private void saveDelayedShipmentTracking(Order order, PaymentPlan paymentPlan, ShipmentPreference shipmentPreference) {
        findInactiveIngredients(paymentPlan.blendId())
                .peek(inactiveIngredients -> {
                    final List<Long> delayedIngredientIds = inactiveIngredients.stream()
                            .map(Ingredient::getId)
                            .distinct()
                            .collect(Collectors.toList());
                    final boolean containsDelayedItem = !delayedIngredientIds.isEmpty();
                    final String delayedItemIds = delayedIngredientIds.stream()
                            .map(String::valueOf)
                            .collect(Collectors.joining(","));
                    final String orderTags = containsDelayedItem
                            ? "DELAYED_ITEM," + shipmentPreference.getOrderTag()
                            : shipmentPreference.getOrderTag();

                    orderShipmentMetadataRepository.save(new OrderShipmentMetadata(
                            null, order.getId(), order.getCustomerId(), shipmentPreference, containsDelayedItem,
                            delayedItemIds.isEmpty() ? null : delayedItemIds, orderTags, LocalDateTime.now(), LocalDateTime.now()
                    ));

                    if (containsDelayedItem) {
                        inactiveIngredients.forEach(ingredient ->
                                delayedOrderItemRepository.save(new DelayedOrderItem(
                                        null, order.getId(), order.getCustomerId(), ingredient.getId(), 1,
                                        DelayedOrderItemStatus.PENDING,
                                        shipmentPreference == ShipmentPreference.SPLIT_SHIPMENT
                                                ? DelayedShipmentType.SPLIT
                                                : DelayedShipmentType.HOLD,
                                        null, LocalDateTime.now(), LocalDateTime.now()
                                ))
                        );
                    }
                })
                .onFailure(peekException());
    }

    private Try<List<Ingredient>> findInactiveIngredients(Long blendId) {
        return blendIngredientService.findByBlendId(blendId)
                .map(blendIngredients -> blendIngredients.stream()
                        .map(BlendIngredient::getIngredientId)
                        .distinct()
                        .collect(Collectors.toList()))
                .flatMap(ingredientIds -> {
                    final List<Try<Ingredient>> ingredientsTry = ingredientIds.stream()
                            .map(ingredientService::find)
                            .collect(Collectors.toList());
                    return Try.sequence(ingredientsTry);
                })
                .map(Seq::toJavaList)
                .map(ingredients -> ingredients.stream()
                        .filter(ingredient -> !ingredient.getIsActive())
                        .collect(Collectors.toList()));
    }

    private ShipmentPreference getShipmentPreference(PaymentResponse paymentResponse) {
        if (paymentResponse.getMetadata() == null) {
            return ShipmentPreference.HOLD_ORDER;
        }
        final Object shipmentPreference = paymentResponse.getMetadata().get(MollieMetadataKeys.SHIPMENT_PREFERENCE);
        return shipmentPreference == null
                ? ShipmentPreference.HOLD_ORDER
                : ShipmentPreference.fromValue(shipmentPreference.toString());
    }

    private PaymentPlan buildPaymentPlan(PaymentPlan paymentPlan, PaymentPlanStatus status) {
        return new PaymentPlan(paymentPlan.id(), paymentPlan.firstAmount(), paymentPlan.recurringAmount(),
                paymentPlan.recurringMonths(), paymentPlan.customerId(), paymentPlan.blendId(), paymentPlan.externalReference(),
                paymentPlan.creationDate(), null, status, paymentPlan.paymentDate(),
                null, paymentPlan.deliveryDate(), paymentPlan.nextPaymentDate(), paymentPlan.nextDeliveryDate(), paymentPlan.paymentMethod());
    }

    private void checkAndUpdateReferralPaid(Long referralId) {
        referralService.updateStatus(referralId, ReferralStatus.PAID)
                .flatMap(referral -> customerService.find(referral.getTo())
                .peek(customerTo -> customerService.find(referral.getFrom())
                .peek(customerFrom -> emailService.sendReferralCodePaid(customerTo.getFirstName(), customerFrom, referralDiscount)))
                .onFailure(peekException()));
    }

    private void checkAndUpdateCouponPaid(Long paymentPlanId) {
        couponService.findCouponUsedByPaymentPlan(paymentPlanId)
                .onFailure(peekException())
                .filter(Optional::isPresent)
                .flatMap(couponUsed -> couponService.updateCouponUsed(buildCouponUsedPaymentPaid(couponUsed.get()))
                .peek(coupon -> saveCouponDiscount(coupon, paymentPlanId))
                .onFailure(peekException()));
    }

    private CouponUsed buildCouponUsedPaymentPaid(CouponUsed couponUsed) {
        return new CouponUsed(couponUsed.getId(), couponUsed.getCouponId(), couponUsed.getCustomerId(), couponUsed.getPaymentPlanId(), CouponUsedStatus.PAYMENT_PAID);
    }

    private void saveCouponDiscount(Coupon coupon, Long paymentPlanId) {
        Try.run(() -> {
            if (coupon.getRecurringTerms().isPresent()) {
                List<String> recurringTermsList = new ArrayList<>(Arrays.asList(coupon.getRecurringTerms().get().split(",")));
                int month = 0;
                for (String term: recurringTermsList) {
                    BigDecimal amount = new BigDecimal(term);
                    couponService.save(buildCouponDiscount(coupon, paymentPlanId, month, amount, month==0 ? CouponDiscountStatus.COMPLETED : CouponDiscountStatus.VALID));
                    month+=1;
                }
            }
        }).onFailure(peekException());
    }

    private CouponDiscount buildCouponDiscount(Coupon coupon, Long paymentPlanId, Integer month, BigDecimal amount, CouponDiscountStatus status) {
        return new CouponDiscount(null, coupon.getId(), paymentPlanId, month, amount, status, LocalDateTime.now(), LocalDateTime.now());
    }

    private Try<UUID> getPaymentPlanExternalReference(PaymentResponse paymentResponse) {
        return Try.of(() -> UUID.fromString(getExternalReference(paymentResponse)));
    }

    private String getExternalReference(PaymentResponse paymentResponse) {
        if (paymentResponse.getMetadata() != null && paymentResponse.getMetadata().containsKey(MollieMetadataKeys.PAYMENT_PLAN_ID)) {
            return (String) paymentResponse.getMetadata().get(MollieMetadataKeys.PAYMENT_PLAN_ID);
        } else {
            String[] s = paymentResponse.getDescription().split(" ");
            return s[s.length - 1];
        }
    }

    private boolean isTestMode() {
        return paymentConfiguration.getApiKey().startsWith("test_");
    }

    private PaymentResponse buildTestPaymentResponse(TestCallbackPaymentPostRequest testCallbackPaymentPostRequest) {
        PaymentDetailsResponse details = PaymentDetailsResponse.builder().bankReasonCode(Optional.ofNullable(testCallbackPaymentPostRequest.getReason())).build();
        final Link link;
        if (details.getBankReasonCode().isPresent()) {
            link = Link.builder().href("http://test.test/"+testCallbackPaymentPostRequest.getReason()).build();
        } else {
            link = null;
        }
        Map<String, Object> metadata = new HashMap<>();
        metadata.put(MollieMetadataKeys.PAYMENT_PLAN_ID, testCallbackPaymentPostRequest.getPaymentPlanExternalReference());
        metadata.put(MollieMetadataKeys.REFERRAL_ID, testCallbackPaymentPostRequest.getReferralId());
        metadata.put(MollieMetadataKeys.PAYMENT_ID, testCallbackPaymentPostRequest.getRetriedMolliePaymentId());

        PaymentLinks links = PaymentLinks.builder().chargebacks(Optional.ofNullable(link)).build();
        final Optional<OffsetDateTime> paidAt = testCallbackPaymentPostRequest.getPaid() ? Optional.of(OffsetDateTime.now()) : Optional.empty();
        final OffsetDateTime created = OffsetDateTime.now().minusDays(paymentConfiguration.getDeliveryDateInDays());
        return PaymentResponse.builder()
                .id(testCallbackPaymentPostRequest.getMolliePaymentId())
                .mode("test")
                .createdAt(created)
                .paidAt(paidAt)
                .status(testCallbackPaymentPostRequest.getStatus())
                .isCancelable(true)
                .amount(new Amount(testCallbackPaymentPostRequest.getCurrency(), testCallbackPaymentPostRequest.getAmount()))
                .amountRefunded(Optional.empty())
                .description(testCallbackPaymentPostRequest.getDescription())
                .sequenceType(testCallbackPaymentPostRequest.getSequenceType())
                .subscriptionId(Optional.empty())
                .metadata(metadata)
                .links(links)
                .details(details)
                .build();
    }

    private Try<PaymentPlan> tryToRecoverFromException(PaymentPlan paymentPlan) {
        return Try.success(paymentPlan);
    }

    private Consumer<Throwable> peekException() {
        return throwable -> LOGGER.error("throwable={}", Throwables.getStackTraceAsString(throwable));
    }
}
