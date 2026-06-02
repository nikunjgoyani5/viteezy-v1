DROP TABLE IF EXISTS `reviews`;
CREATE TABLE `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `source` varchar(50) NOT NULL,
  `total` int(11) NOT NULL,
  `min_score` int(2) NOT NULL,
  `max_score` int(2) NOT NULL,
  `score` decimal(2,1) NOT NULL,
  `score_label` varchar(50) NOT NULL,
  `creation_timestamp` timestamp DEFAULT NOW(),
  `modification_timestamp` timestamp DEFAULT NOW(),
  PRIMARY KEY (`id`),
  CONSTRAINT reviews_pk_2
  UNIQUE (source)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;