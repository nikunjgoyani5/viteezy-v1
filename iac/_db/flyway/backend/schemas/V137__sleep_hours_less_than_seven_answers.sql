CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `sleep_hours_less_than_seven_answers`
--

DROP TABLE IF EXISTS `sleep_hours_less_than_seven_answers`;
CREATE TABLE `sleep_hours_less_than_seven_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `sleep_hours_less_than_seven_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT sleep_hours_less_than_seven_answers_pk_2
                               UNIQUE (quiz_id, sleep_hours_less_than_seven_id),
                           CONSTRAINT sleep_hours_less_than_seven_answers_s_h_less_than_sevens_id_fk
                               FOREIGN KEY (sleep_hours_less_than_seven_id) REFERENCES sleep_hours_less_than_sevens (id),
                           CONSTRAINT sleep_hours_less_than_seven_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
