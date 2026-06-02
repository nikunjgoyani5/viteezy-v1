package viteezy.db.jdbi;

import io.vavr.control.Try;
import org.jdbi.v3.core.HandleCallback;
import org.jdbi.v3.core.Jdbi;
import viteezy.db.DelayedOrderItemRepository;
import viteezy.domain.fulfilment.DelayedOrderItem;
import viteezy.domain.fulfilment.DelayedOrderItemStatus;
import viteezy.domain.fulfilment.DelayedShipmentType;

import java.util.List;

public class DelayedOrderItemRepositoryImpl implements DelayedOrderItemRepository {
    private static final String SELECT_ALL_BASE_QUERY = "SELECT * FROM delayed_order_items ";

    private static final String INSERT_QUERY = "" +
            "INSERT INTO delayed_order_items (order_id, customer_id, product_id, quantity, status, shipment_type, expected_ship_date, creation_timestamp, modification_timestamp) " +
            "VALUES (:orderId, :customerId, :productId, :quantity, :status, :shipmentType, :expectedShipDate, :creationTimestamp, :modificationTimestamp)";

    private static final String UPDATE_STATUS_QUERY = "" +
            "UPDATE delayed_order_items SET status = :status, modification_timestamp = NOW() WHERE id = :id";

    private final Jdbi jdbi;

    public DelayedOrderItemRepositoryImpl(Jdbi jdbi) {
        this.jdbi = jdbi;
    }

    @Override
    public Try<List<DelayedOrderItem>> findPendingByShipmentType(DelayedShipmentType shipmentType) {
        final HandleCallback<List<DelayedOrderItem>, RuntimeException> queryCallback = handle -> handle
                .createQuery(SELECT_ALL_BASE_QUERY + "WHERE status = :status AND shipment_type = :shipmentType ORDER BY id ASC")
                .bind("status", DelayedOrderItemStatus.PENDING)
                .bind("shipmentType", shipmentType.getValue())
                .mapTo(DelayedOrderItem.class)
                .list();
        return Try.of(() -> jdbi.withHandle(queryCallback));
    }

    @Override
    public Try<DelayedOrderItem> save(DelayedOrderItem delayedOrderItem) {
        final HandleCallback<Long, RuntimeException> queryCallback = handle -> handle
                .createUpdate(INSERT_QUERY)
                .bind("orderId", delayedOrderItem.getOrderId())
                .bind("customerId", delayedOrderItem.getCustomerId())
                .bind("productId", delayedOrderItem.getProductId())
                .bind("quantity", delayedOrderItem.getQuantity())
                .bind("status", delayedOrderItem.getStatus())
                .bind("shipmentType", delayedOrderItem.getShipmentType().getValue())
                .bind("expectedShipDate", delayedOrderItem.getExpectedShipDate())
                .bind("creationTimestamp", delayedOrderItem.getCreationTimestamp())
                .bind("modificationTimestamp", delayedOrderItem.getModificationTimestamp())
                .executeAndReturnGeneratedKeys()
                .mapTo(Long.class).one();
        return Try.of(() -> jdbi.withHandle(queryCallback))
                .flatMap(this::findById);
    }

    @Override
    public Try<DelayedOrderItem> updateStatus(Long id, DelayedOrderItemStatus status) {
        final HandleCallback<Integer, RuntimeException> queryCallback = handle -> handle
                .createUpdate(UPDATE_STATUS_QUERY)
                .bind("id", id)
                .bind("status", status)
                .execute();
        return Try.of(() -> jdbi.withHandle(queryCallback))
                .flatMap(__ -> findById(id));
    }

    private Try<DelayedOrderItem> findById(Long id) {
        final HandleCallback<DelayedOrderItem, RuntimeException> queryCallback = handle -> handle
                .createQuery(SELECT_ALL_BASE_QUERY + "WHERE id = :id")
                .bind("id", id)
                .mapTo(DelayedOrderItem.class).one();
        return Try.of(() -> jdbi.withHandle(queryCallback));
    }
}
