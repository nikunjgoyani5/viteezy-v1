CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `pregnancy_state_answers`
--

DROP TABLE IF EXISTS `pregnancy_state_answers`;
CREATE TABLE `pregnancy_state_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `pregnancy_state_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT pregnancy_state_answers_pk_2
                               UNIQUE (quiz_id, pregnancy_state_id),
                           CONSTRAINT pregnancy_state_answers_pregnancy_states_id_fk
                               FOREIGN KEY (pregnancy_state_id) REFERENCES pregnancy_states (id),
                           CONSTRAINT pregnancy_state_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
