CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `sport_reason_answers`
--

DROP TABLE IF EXISTS `sport_reason_answers`;
CREATE TABLE `sport_reason_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `sport_reason_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT sport_reason_answers_pk_2
                               UNIQUE (quiz_id, sport_reason_id),
                           CONSTRAINT sport_reason_answers_sport_reasons_id_fk
                               FOREIGN KEY (sport_reason_id) REFERENCES sport_reasons (id),
                           CONSTRAINT sport_reason_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
