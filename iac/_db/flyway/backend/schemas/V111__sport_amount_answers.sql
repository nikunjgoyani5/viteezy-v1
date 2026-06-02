CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `sport_amount_answers`
--

DROP TABLE IF EXISTS `sport_amount_answers`;
CREATE TABLE `sport_amount_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `sport_amount_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT sport_amount_answers_pk_2
                               UNIQUE (quiz_id, sport_amount_id),
                           CONSTRAINT sport_amount_answers_sport_amounts_id_fk
                               FOREIGN KEY (sport_amount_id) REFERENCES sport_amounts (id),
                           CONSTRAINT sport_amount_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
