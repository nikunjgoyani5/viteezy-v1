CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `stress_level_at_end_of_day_answers`
--

DROP TABLE IF EXISTS `stress_level_at_end_of_day_answers`;
CREATE TABLE `stress_level_at_end_of_day_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `stress_level_at_end_of_day_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT stress_level_at_end_of_day_answers_pk_2
                               UNIQUE (quiz_id, stress_level_at_end_of_day_id),
                           CONSTRAINT stress_level_at_end_of_day_answers_s_level_at_end_of_days_id_fk
                               FOREIGN KEY (stress_level_at_end_of_day_id) REFERENCES stress_level_at_end_of_days (id),
                           CONSTRAINT stress_level_at_end_of_day_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
