CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `medication_answers`
--

DROP TABLE IF EXISTS `medication_answers`;
CREATE TABLE `medication_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `medication_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT medication_answers_pk_2
                               UNIQUE (quiz_id, medication_id),
                           CONSTRAINT medication_answers_medications_id_fk
                               FOREIGN KEY (medication_id) REFERENCES medications (id),
                           CONSTRAINT medication_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
