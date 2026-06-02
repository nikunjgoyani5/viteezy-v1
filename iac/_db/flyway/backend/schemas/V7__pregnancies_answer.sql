CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `pregnancy_answers`
--

DROP TABLE IF EXISTS `pregnancy_answers`;
CREATE TABLE `pregnancy_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `pregnancy_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT pregnancy_answers_pk_2
                               UNIQUE (quiz_id, pregnancy_id),
                           CONSTRAINT pregnancy_answers_pregnancies_id_fk
                               FOREIGN KEY (pregnancy_id) REFERENCES pregnancies (id),
                           CONSTRAINT pregnancy_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
