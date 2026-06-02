CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `average_sleeping_hours_answers`
--

DROP TABLE IF EXISTS `average_sleeping_hours_answers`;
CREATE TABLE `average_sleeping_hours_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `average_sleeping_hours_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT average_sleeping_hours_answers_pk_2
                               UNIQUE (quiz_id, average_sleeping_hours_id),
                           CONSTRAINT average_sleeping_hours_answers_average_sleeping_hours_id_fk
                               FOREIGN KEY (average_sleeping_hours_id) REFERENCES average_sleeping_hours (id),
                           CONSTRAINT average_sleeping_hours_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
