CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `type_of_training_answers`
--

DROP TABLE IF EXISTS `type_of_training_answers`;
CREATE TABLE `type_of_training_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `type_of_training_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT type_of_training_answers_pk_2
                               UNIQUE (quiz_id, type_of_training_id),
                           CONSTRAINT type_of_training_answers_type_of_trainings_id_fk
                               FOREIGN KEY (type_of_training_id) REFERENCES type_of_trainings (id),
                           CONSTRAINT type_of_training_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
