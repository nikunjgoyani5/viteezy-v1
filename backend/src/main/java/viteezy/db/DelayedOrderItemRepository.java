package viteezy.db;

import io.vavr.control.Try;
import org.springframework.transaction.annotation.Transactional;
import viteezy.domain.fulfilment.DelayedOrderItem;
import viteezy.domain.fulfilment.DelayedOrderItemStatus;
import viteezy.domain.fulfilment.DelayedShipmentType;

import java.util.List;

public interface DelayedOrderItemRepository {
    Try<List<DelayedOrderItem>> findPendingByShipmentType(DelayedShipmentType shipmentType);

    @Transactional(transactionManager = "transactionManager")
    Try<DelayedOrderItem> save(DelayedOrderItem delayedOrderItem);

    @Transactional(transactionManager = "transactionManager")
    Try<DelayedOrderItem> updateStatus(Long id, DelayedOrderItemStatus status);
}
