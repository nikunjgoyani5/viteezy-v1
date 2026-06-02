CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `eastern_medicine_opinion_answers`
--

DROP TABLE IF EXISTS `eastern_medicine_opinion_answers`;
CREATE TABLE `eastern_medicine_opinion_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `eastern_medicine_opinion_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT eastern_medicine_opinion_answers_pk_2
                               UNIQUE (quiz_id, eastern_medicine_opinion_id),
                           CONSTRAINT eastern_medicine_opinion_answers_eastern_medicine_opinions_id_fk
                               FOREIGN KEY (eastern_medicine_opinion_id) REFERENCES eastern_medicine_opinions (id),
                           CONSTRAINT eastern_medicine_opinion_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
