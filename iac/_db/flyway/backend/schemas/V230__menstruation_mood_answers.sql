CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `menstruation_mood_answers`
--

DROP TABLE IF EXISTS `menstruation_mood_answers`;
CREATE TABLE `menstruation_mood_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `menstruation_mood_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT menstruation_mood_answers_pk_2
                               UNIQUE (quiz_id, menstruation_mood_id),
                           CONSTRAINT menstruation_mood_answers_menstruation_moods_id_fk
                               FOREIGN KEY (menstruation_mood_id) REFERENCES menstruation_moods (id),
                           CONSTRAINT menstruation_mood_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
