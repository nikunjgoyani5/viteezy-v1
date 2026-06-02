package viteezy.db.jdbi.mapper;

import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;
import viteezy.domain.fulfilment.OrderShipmentMetadata;
import viteezy.domain.fulfilment.ShipmentPreference;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;

public class OrderShipmentMetadataMapper implements RowMapper<OrderShipmentMetadata> {
    @Override
    public OrderShipmentMetadata map(ResultSet rs, StatementContext ctx) throws SQLException {
        final long id = rs.getLong("id");
        final long orderId = rs.getLong("order_id");
        final long customerId = rs.getLong("customer_id");
        final ShipmentPreference shipmentPreference = ShipmentPreference.fromValue(rs.getString("shipment_preference"));
        final boolean containsDelayedItem = rs.getBoolean("contains_delayed_item");
        final String delayedItemIds = rs.getString("delayed_item_ids");
        final String orderTags = rs.getString("order_tags");
        final LocalDateTime creationTimestamp = rs.getTimestamp("creation_timestamp").toLocalDateTime();
        final LocalDateTime modificationTimestamp = rs.getTimestamp("modification_timestamp").toLocalDateTime();
        return new OrderShipmentMetadata(id, orderId, customerId, shipmentPreference, containsDelayedItem,
                delayedItemIds, orderTags, creationTimestamp, modificationTimestamp);
    }
}
