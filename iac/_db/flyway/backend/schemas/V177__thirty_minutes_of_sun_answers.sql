CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `thirty_minutes_of_sun_answers`
--

DROP TABLE IF EXISTS `thirty_minutes_of_sun_answers`;
CREATE TABLE `thirty_minutes_of_sun_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `thirty_minutes_of_sun_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT thirty_minutes_of_sun_answers_pk_2
                               UNIQUE (quiz_id, thirty_minutes_of_sun_id),
                           CONSTRAINT thirty_minutes_of_sun_answers_thirty_minutes_of_suns_id_fk
                               FOREIGN KEY (thirty_minutes_of_sun_id) REFERENCES thirty_minutes_of_suns (id),
                           CONSTRAINT thirty_minutes_of_sun_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
