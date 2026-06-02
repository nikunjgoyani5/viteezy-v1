CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `digestion_amount_answers`
--

DROP TABLE IF EXISTS `digestion_amount_answers`;
CREATE TABLE `digestion_amount_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `digestion_amount_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT digestion_amount_answers_pk_2
                               UNIQUE (quiz_id, digestion_amount_id),
                           CONSTRAINT digestion_amount_answers_digestion_amounts_id_fk
                               FOREIGN KEY (digestion_amount_id) REFERENCES digestion_amounts (id),
                           CONSTRAINT digestion_amount_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
