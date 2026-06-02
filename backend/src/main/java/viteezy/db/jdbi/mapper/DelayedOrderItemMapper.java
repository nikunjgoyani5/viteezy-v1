package viteezy.db.jdbi.mapper;

import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;
import viteezy.domain.fulfilment.DelayedOrderItem;
import viteezy.domain.fulfilment.DelayedOrderItemStatus;
import viteezy.domain.fulfilment.DelayedShipmentType;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.LocalDateTime;

public class DelayedOrderItemMapper implements RowMapper<DelayedOrderItem> {
    @Override
    public DelayedOrderItem map(ResultSet rs, StatementContext ctx) throws SQLException {
        final long id = rs.getLong("id");
        final long orderId = rs.getLong("order_id");
        final long customerId = rs.getLong("customer_id");
        final long productId = rs.getLong("product_id");
        final int quantity = rs.getInt("quantity");
        final DelayedOrderItemStatus status = DelayedOrderItemStatus.valueOf(rs.getString("status"));
        final DelayedShipmentType shipmentType = DelayedShipmentType.valueOf(rs.getString("shipment_type").toUpperCase());
        final Timestamp expectedShipDateTimestamp = rs.getTimestamp("expected_ship_date");
        final LocalDateTime expectedShipDate = expectedShipDateTimestamp != null ? expectedShipDateTimestamp.toLocalDateTime() : null;
        final LocalDateTime creationTimestamp = rs.getTimestamp("creation_timestamp").toLocalDateTime();
        final LocalDateTime modificationTimestamp = rs.getTimestamp("modification_timestamp").toLocalDateTime();
        return new DelayedOrderItem(id, orderId, customerId, productId, quantity, status, shipmentType,
                expectedShipDate, creationTimestamp, modificationTimestamp);
    }
}
