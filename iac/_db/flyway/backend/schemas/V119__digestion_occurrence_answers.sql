CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `digestion_occurrence_answers`
--

DROP TABLE IF EXISTS `digestion_occurrence_answers`;
CREATE TABLE `digestion_occurrence_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `digestion_occurrence_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT digestion_occurrence_answers_pk_2
                               UNIQUE (quiz_id, digestion_occurrence_id),
                           CONSTRAINT digestion_occurrence_answers_digestion_occurrences_id_fk
                               FOREIGN KEY (digestion_occurrence_id) REFERENCES digestion_occurrences (id),
                           CONSTRAINT digestion_occurrence_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
