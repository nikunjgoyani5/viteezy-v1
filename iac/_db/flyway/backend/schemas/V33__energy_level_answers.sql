CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `energy_level_answers`
--

DROP TABLE IF EXISTS `energy_level_answers`;
CREATE TABLE `energy_level_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `energy_level_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT energy_level_answers_pk_2
                               UNIQUE (quiz_id, energy_level_id),
                           CONSTRAINT energy_level_answers_energy_levels_id_fk
                               FOREIGN KEY (energy_level_id) REFERENCES energy_levels (id),
                           CONSTRAINT energy_level_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
