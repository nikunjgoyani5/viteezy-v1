CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `transition_period_complaints_answers`
--

DROP TABLE IF EXISTS `transition_period_complaints_answers`;
CREATE TABLE `transition_period_complaints_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `transition_period_complaints_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT transition_period_complaints_answers_pk_2
                               UNIQUE (quiz_id, transition_period_complaints_id),
                           CONSTRAINT transition_p_complaints_answers_transition_p_complaints_id_fk
                               FOREIGN KEY (transition_period_complaints_id) REFERENCES transition_period_complaints (id),
                           CONSTRAINT transition_period_complaints_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
