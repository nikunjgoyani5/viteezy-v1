CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `vitamin_intake_answers`
--

DROP TABLE IF EXISTS `vitamin_intake_answers`;
CREATE TABLE `vitamin_intake_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `vitamin_intake_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT vitamin_intake_answers_pk_2
                               UNIQUE (quiz_id, vitamin_intake_id),
                           CONSTRAINT vitamin_intake_answers_vitamin_intakes_id_fk
                               FOREIGN KEY (vitamin_intake_id) REFERENCES vitamin_intakes (id),
                           CONSTRAINT vitamin_intake_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
