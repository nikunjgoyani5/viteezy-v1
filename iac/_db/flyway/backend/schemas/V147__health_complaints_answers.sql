CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `health_complaints_answers`
--

DROP TABLE IF EXISTS `health_complaints_answers`;
CREATE TABLE `health_complaints_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `health_complaints_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT health_complaints_answers_pk_2
                               UNIQUE (quiz_id, health_complaints_id),
                           CONSTRAINT health_complaints_answers_health_complaints_id_fk
                               FOREIGN KEY (health_complaints_id) REFERENCES health_complaints (id),
                           CONSTRAINT health_complaints_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
