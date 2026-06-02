package viteezy.domain.fulfilment;

public enum DelayedShipmentType {
    SPLIT("split"),
    HOLD("hold");

    private final String value;

    DelayedShipmentType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
