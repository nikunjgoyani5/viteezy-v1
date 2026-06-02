CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `trouble_falling_asleep_answers`
--

DROP TABLE IF EXISTS `trouble_falling_asleep_answers`;
CREATE TABLE `trouble_falling_asleep_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `trouble_falling_asleep_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT trouble_falling_asleep_answers_pk_2
                               UNIQUE (quiz_id, trouble_falling_asleep_id),
                           CONSTRAINT trouble_falling_asleep_answers_trouble_falling_asleeps_id_fk
                               FOREIGN KEY (trouble_falling_asleep_id) REFERENCES trouble_falling_asleeps (id),
                           CONSTRAINT trouble_falling_asleep_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
