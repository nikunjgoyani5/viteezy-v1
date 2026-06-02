CREATE TABLE `order_shipment_metadata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `shipment_preference` varchar(20) NOT NULL,
  `contains_delayed_item` tinyint(1) NOT NULL DEFAULT 0,
  `delayed_item_ids` varchar(255),
  `order_tags` varchar(255),
  `creation_timestamp` timestamp DEFAULT NOW(),
  `modification_timestamp` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `order_shipment_metadata_order_id_uq` (`order_id`),
  CONSTRAINT `order_shipment_metadata_order_id_fk`
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_shipment_metadata_customer_id_fk`
    FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

CREATE TABLE `delayed_order_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1,
  `status` varchar(20) NOT NULL,
  `shipment_type` varchar(10) NOT NULL,
  `expected_ship_date` datetime,
  `creation_timestamp` timestamp DEFAULT NOW(),
  `modification_timestamp` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`),
  KEY `delayed_order_items_status_shipment_type_idx` (`status`, `shipment_type`),
  CONSTRAINT `delayed_order_items_order_id_fk`
    FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `delayed_order_items_customer_id_fk`
    FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`),
  CONSTRAINT `delayed_order_items_product_id_fk`
    FOREIGN KEY (`product_id`) REFERENCES `ingredients` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
