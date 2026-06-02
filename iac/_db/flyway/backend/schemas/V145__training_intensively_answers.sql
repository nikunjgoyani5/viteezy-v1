CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `training_intensively_answers`
--

DROP TABLE IF EXISTS `training_intensively_answers`;
CREATE TABLE `training_intensively_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `training_intensively_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT training_intensively_answers_pk_2
                               UNIQUE (quiz_id, training_intensively_id),
                           CONSTRAINT training_intensively_answers_training_intensivelys_id_fk
                               FOREIGN KEY (training_intensively_id) REFERENCES training_intensivelys (id),
                           CONSTRAINT training_intensively_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
