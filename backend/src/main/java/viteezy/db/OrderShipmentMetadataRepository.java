package viteezy.db;

import io.vavr.control.Try;
import org.springframework.transaction.annotation.Transactional;
import viteezy.domain.fulfilment.OrderShipmentMetadata;

import java.util.Optional;

public interface OrderShipmentMetadataRepository {
    Try<Optional<OrderShipmentMetadata>> findByOrderId(Long orderId);

    @Transactional(transactionManager = "transactionManager")
    Try<OrderShipmentMetadata> save(OrderShipmentMetadata orderShipmentMetadata);
}
