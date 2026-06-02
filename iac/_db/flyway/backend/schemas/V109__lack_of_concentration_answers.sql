CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `lack_of_concentration_answers`
--

DROP TABLE IF EXISTS `lack_of_concentration_answers`;
CREATE TABLE `lack_of_concentration_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `lack_of_concentration_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT lack_of_concentration_answers_pk_2
                               UNIQUE (quiz_id, lack_of_concentration_id),
                           CONSTRAINT lack_of_concentration_answers_lack_of_concentrations_id_fk
                               FOREIGN KEY (lack_of_concentration_id) REFERENCES lack_of_concentrations (id),
                           CONSTRAINT lack_of_concentration_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
