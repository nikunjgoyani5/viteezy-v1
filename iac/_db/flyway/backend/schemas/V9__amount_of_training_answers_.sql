CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `amount_of_training_answers`
--

DROP TABLE IF EXISTS `amount_of_training_answers`;
CREATE TABLE `amount_of_training_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `amount_of_training_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT amount_of_training_answers_pk_2
                               UNIQUE (quiz_id, amount_of_training_id),
                           CONSTRAINT amount_of_training_answers_amount_of_training_id_fk
                               FOREIGN KEY (amount_of_training_id) REFERENCES amount_of_training (id),
                           CONSTRAINT amount_of_training_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
