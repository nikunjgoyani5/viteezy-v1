CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `present_at_crowded_places_answers`
--

DROP TABLE IF EXISTS `present_at_crowded_places_answers`;
CREATE TABLE `present_at_crowded_places_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `present_at_crowded_places_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT present_at_crowded_places_answers_pk_2
                               UNIQUE (quiz_id, present_at_crowded_places_id),
                           CONSTRAINT present_at_crowded_places_answers_p_at_crowded_places_id_fk
                               FOREIGN KEY (present_at_crowded_places_id) REFERENCES present_at_crowded_places (id),
                           CONSTRAINT present_at_crowded_places_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
