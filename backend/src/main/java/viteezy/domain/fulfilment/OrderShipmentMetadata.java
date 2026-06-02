package viteezy.domain.fulfilment;

import java.time.LocalDateTime;
import java.util.Objects;
import java.util.StringJoiner;

public class OrderShipmentMetadata {
    private final Long id;
    private final Long orderId;
    private final Long customerId;
    private final ShipmentPreference shipmentPreference;
    private final boolean containsDelayedItem;
    private final String delayedItemIds;
    private final String orderTags;
    private final LocalDateTime creationTimestamp;
    private final LocalDateTime modificationTimestamp;

    public OrderShipmentMetadata(Long id, Long orderId, Long customerId, ShipmentPreference shipmentPreference,
                                 boolean containsDelayedItem, String delayedItemIds, String orderTags,
                                 LocalDateTime creationTimestamp, LocalDateTime modificationTimestamp) {
        this.id = id;
        this.orderId = orderId;
        this.customerId = customerId;
        this.shipmentPreference = shipmentPreference;
        this.containsDelayedItem = containsDelayedItem;
        this.delayedItemIds = delayedItemIds;
        this.orderTags = orderTags;
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

    public ShipmentPreference getShipmentPreference() {
        return shipmentPreference;
    }

    public boolean getContainsDelayedItem() {
        return containsDelayedItem;
    }

    public String getDelayedItemIds() {
        return delayedItemIds;
    }

    public String getOrderTags() {
        return orderTags;
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
        if (!(o instanceof OrderShipmentMetadata that)) return false;
        return containsDelayedItem == that.containsDelayedItem && Objects.equals(id, that.id) && Objects.equals(orderId, that.orderId) && Objects.equals(customerId, that.customerId) && shipmentPreference == that.shipmentPreference && Objects.equals(delayedItemIds, that.delayedItemIds) && Objects.equals(orderTags, that.orderTags) && Objects.equals(creationTimestamp, that.creationTimestamp) && Objects.equals(modificationTimestamp, that.modificationTimestamp);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, orderId, customerId, shipmentPreference, containsDelayedItem, delayedItemIds, orderTags, creationTimestamp, modificationTimestamp);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", OrderShipmentMetadata.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("orderId=" + orderId)
                .add("customerId=" + customerId)
                .add("shipmentPreference=" + shipmentPreference)
                .add("containsDelayedItem=" + containsDelayedItem)
                .add("delayedItemIds='" + delayedItemIds + "'")
                .add("orderTags='" + orderTags + "'")
                .add("creationTimestamp=" + creationTimestamp)
                .add("modificationTimestamp=" + modificationTimestamp)
                .toString();
    }
}
