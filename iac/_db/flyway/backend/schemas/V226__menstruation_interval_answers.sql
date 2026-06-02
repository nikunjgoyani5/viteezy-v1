CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `menstruation_interval_answers`
--

DROP TABLE IF EXISTS `menstruation_interval_answers`;
CREATE TABLE `menstruation_interval_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `menstruation_interval_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT menstruation_interval_answers_pk_2
                               UNIQUE (quiz_id, menstruation_interval_id),
                           CONSTRAINT menstruation_interval_answers_menstruation_interval_id_fk
                               FOREIGN KEY (menstruation_interval_id) REFERENCES menstruation_interval (id),
                           CONSTRAINT menstruation_interval_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
