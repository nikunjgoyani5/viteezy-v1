CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `amount_of_vegetable_consumption_answers`
--

DROP TABLE IF EXISTS `amount_of_vegetable_consumption_answers`;
CREATE TABLE `amount_of_vegetable_consumption_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `amount_of_vegetable_consumption_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT amount_of_vegetable_consumption_answers_pk_2
                               UNIQUE (quiz_id, amount_of_vegetable_consumption_id),
                           CONSTRAINT amount_of_vegetable_consumption_answers_a_o_v_consumptions_id_fk
                               FOREIGN KEY (amount_of_vegetable_consumption_id) REFERENCES amount_of_vegetable_consumptions (id),
                           CONSTRAINT amount_of_vegetable_consumption_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
