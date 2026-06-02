DROP TABLE IF EXISTS `pharmacist_orders`;
CREATE TABLE `pharmacist_orders` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `batch_name` varchar(50) NOT NULL,
                           `batch_number` int(11) NOT NULL,
                           `order_number` varchar(50) NOT NULL,
                           `file_name` varchar(50) NOT NULL,
                           `status` varchar(20) NOT NULL,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT pharmacist_orders_pk_2
                               UNIQUE (order_number)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;