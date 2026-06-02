CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `fruit_consumptions_answers`
--

DROP TABLE IF EXISTS `fruit_consumptions_answers`;
CREATE TABLE `fruit_consumptions_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `fruit_consumption_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT fruit_consumptions_answers_pk_2
                               UNIQUE (quiz_id, fruit_consumption_id),
                           CONSTRAINT fruit_consumptions_answers_fruit_consumptions_id_fk
                               FOREIGN KEY (fruit_consumption_id) REFERENCES fruit_consumptions (id),
                           CONSTRAINT fruit_consumptions_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
