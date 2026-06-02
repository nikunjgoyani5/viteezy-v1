CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `mental_fitness_answers`
--

DROP TABLE IF EXISTS `mental_fitness_answers`;
CREATE TABLE `mental_fitness_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `mental_fitness_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT mental_fitness_answers_pk_2
                               UNIQUE (quiz_id, mental_fitness_id),
                           CONSTRAINT mental_fitness_answers_mental_fitness_id_fk
                               FOREIGN KEY (mental_fitness_id) REFERENCES mental_fitness (id),
                           CONSTRAINT mental_fitness_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
