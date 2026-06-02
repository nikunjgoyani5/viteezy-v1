package viteezy.domain.fulfilment;

import java.util.Arrays;

public enum ShipmentPreference {
    SPLIT_SHIPMENT("split_shipment"),
    HOLD_ORDER("hold_order");

    private final String value;

    ShipmentPreference(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public String getOrderTag() {
        return this == SPLIT_SHIPMENT ? "SPLIT_SHIPMENT" : "HOLD_ORDER";
    }

    public String getDelayedShipmentTypeValue() {
        return this == SPLIT_SHIPMENT ? "split" : "hold";
    }

    public static ShipmentPreference fromValue(String value) {
        return Arrays.stream(values())
                .filter(shipmentPreference -> shipmentPreference.value.equalsIgnoreCase(value))
                .findFirst()
                .orElse(HOLD_ORDER);
    }
}
