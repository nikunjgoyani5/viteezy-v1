CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `birth_health_answers`
--

DROP TABLE IF EXISTS `birth_health_answers`;
CREATE TABLE `birth_health_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `birth_health_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT birth_health_answers_pk_2
                               UNIQUE (quiz_id, birth_health_id),
                           CONSTRAINT birth_health_answers_birth_healths_id_fk
                               FOREIGN KEY (birth_health_id) REFERENCES birth_healths (id),
                           CONSTRAINT birth_health_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
