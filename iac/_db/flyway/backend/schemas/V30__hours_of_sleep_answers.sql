CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `hours_of_sleep_answers`
--

DROP TABLE IF EXISTS `hours_of_sleep_answers`;
CREATE TABLE `hours_of_sleep_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `hours_of_sleep_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT hours_of_sleep_answers_pk_2
                               UNIQUE (quiz_id, hours_of_sleep_id),
                           CONSTRAINT hours_of_sleep_answers_hours_of_sleeps_id_fk
                               FOREIGN KEY (hours_of_sleep_id) REFERENCES hours_of_sleeps (id),
                           CONSTRAINT hours_of_sleep_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
