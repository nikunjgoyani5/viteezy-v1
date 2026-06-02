package viteezy.domain.fulfilment;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.StringJoiner;

public class DelayedOrderItem {
    private final Long id;
    private final Long orderId;
    private final Long customerId;
    private final Long productId;
    private final Integer quantity;
    private final DelayedOrderItemStatus status;
    private final DelayedShipmentType shipmentType;
    private final LocalDateTime expectedShipDate;
    private final LocalDateTime creationTimestamp;
    private final LocalDateTime modificationTimestamp;

    public DelayedOrderItem(Long id, Long orderId, Long customerId, Long productId, Integer quantity,
                            DelayedOrderItemStatus status, DelayedShipmentType shipmentType,
                            LocalDateTime expectedShipDate, LocalDateTime creationTimestamp,
                            LocalDateTime modificationTimestamp) {
        this.id = id;
        this.orderId = orderId;
        this.customerId = customerId;
        this.productId = productId;
        this.quantity = quantity;
        this.status = status;
        this.shipmentType = shipmentType;
        this.expectedShipDate = expectedShipDate;
        this.creationTimestamp = creationTimestamp;
        this.modificationTimestamp = modificationTimestamp;
    }

    public Long getId() {
        return id;
    }

    public Long getOrderId() {
        return orderId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public DelayedOrderItemStatus getStatus() {
        return status;
    }

    public DelayedShipmentType getShipmentType() {
        return shipmentType;
    }

    public LocalDateTime getExpectedShipDate() {
        return expectedShipDate;
    }

    public LocalDateTime getCreationTimestamp() {
        return creationTimestamp;
    }

    public LocalDateTime getModificationTimestamp() {
        return modificationTimestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof DelayedOrderItem that)) return false;
        return Objects.equals(id, that.id) && Objects.equals(orderId, that.orderId) && Objects.equals(customerId, that.customerId) && Objects.equals(productId, that.productId) && Objects.equals(quantity, that.quantity) && status == that.status && shipmentType == that.shipmentType && Objects.equals(expectedShipDate, that.expectedShipDate) && Objects.equals(creationTimestamp, that.creationTimestamp) && Objects.equals(modificationTimestamp, that.modificationTimestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderId, customerId, productId, quantity, status, shipmentType, expectedShipDate, creationTimestamp, modificationTimestamp);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", DelayedOrderItem.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("orderId=" + orderId)
                .add("customerId=" + customerId)
                .add("productId=" + productId)
                .add("quantity=" + quantity)
                .add("status=" + status)
                .add("shipmentType=" + shipmentType)
                .add("expectedShipDate=" + expectedShipDate)
                .add("creationTimestamp=" + creationTimestamp)
                .add("modificationTimestamp=" + modificationTimestamp)
                .toString();
    }
}
