CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `sport_types_answers`
--

DROP TABLE IF EXISTS `sport_types_answers`;
CREATE TABLE `sport_types_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `sport_type_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT sport_types_answers_pk_2
                               UNIQUE (quiz_id, sport_type_id),
                           CONSTRAINT sport_types_answers_sport_type_id_fk
                               FOREIGN KEY (sport_type_id) REFERENCES sport_types (id),
                           CONSTRAINT sport_types_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
