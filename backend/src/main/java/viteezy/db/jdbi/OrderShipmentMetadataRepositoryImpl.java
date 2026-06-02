package viteezy.db.jdbi;

import io.vavr.control.Try;
import org.jdbi.v3.core.HandleCallback;
import org.jdbi.v3.core.Jdbi;
import viteezy.db.OrderShipmentMetadataRepository;
import viteezy.domain.fulfilment.OrderShipmentMetadata;

import java.util.Optional;

public class OrderShipmentMetadataRepositoryImpl implements OrderShipmentMetadataRepository {
    private static final String SELECT_ALL_BASE_QUERY = "SELECT * FROM order_shipment_metadata ";

    private static final String UPSERT_QUERY = "" +
            "INSERT INTO order_shipment_metadata (order_id, customer_id, shipment_preference, contains_delayed_item, delayed_item_ids, order_tags) " +
            "VALUES (:orderId, :customerId, :shipmentPreference, :containsDelayedItem, :delayedItemIds, :orderTags) " +
            "ON DUPLICATE KEY UPDATE " +
            "shipment_preference = :shipmentPreference, " +
            "contains_delayed_item = :containsDelayedItem, " +
            "delayed_item_ids = :delayedItemIds, " +
            "order_tags = :orderTags, " +
            "modification_timestamp = NOW(), id = LAST_INSERT_ID(id)";

    private final Jdbi jdbi;

    public OrderShipmentMetadataRepositoryImpl(Jdbi jdbi) {
        this.jdbi = jdbi;
    }

    @Override
    public Try<Optional<OrderShipmentMetadata>> findByOrderId(Long orderId) {
        final HandleCallback<Optional<OrderShipmentMetadata>, RuntimeException> queryCallback = handle -> handle
                .createQuery(SELECT_ALL_BASE_QUERY + "WHERE order_id = :orderId")
                .bind("orderId", orderId)
                .mapTo(OrderShipmentMetadata.class)
                .findFirst();
        return Try.of(() -> jdbi.withHandle(queryCallback));
    }

    @Override
    public Try<OrderShipmentMetadata> save(OrderShipmentMetadata orderShipmentMetadata) {
        final HandleCallback<Long, RuntimeException> queryCallback = handle -> handle
                .createUpdate(UPSERT_QUERY)
                .bind("orderId", orderShipmentMetadata.getOrderId())
                .bind("customerId", orderShipmentMetadata.getCustomerId())
                .bind("shipmentPreference", orderShipmentMetadata.getShipmentPreference().getValue())
                .bind("containsDelayedItem", orderShipmentMetadata.getContainsDelayedItem())
                .bind("delayedItemIds", orderShipmentMetadata.getDelayedItemIds())
                .bind("orderTags", orderShipmentMetadata.getOrderTags())
                .executeAndReturnGeneratedKeys()
                .mapTo(Long.class).one();
        return Try.of(() -> jdbi.withHandle(queryCallback))
                .flatMap(this::findById);
    }

    private Try<OrderShipmentMetadata> findById(Long id) {
        final HandleCallback<OrderShipmentMetadata, RuntimeException> queryCallback = handle -> handle
                .createQuery(SELECT_ALL_BASE_QUERY + "WHERE id = :id")
                .bind("id", id)
                .mapTo(OrderShipmentMetadata.class).one();
        return Try.of(() -> jdbi.withHandle(queryCallback));
    }
}
