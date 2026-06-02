CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `vitamin_opinion_answers`
--

DROP TABLE IF EXISTS `vitamin_opinion_answers`;
CREATE TABLE `vitamin_opinion_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `vitamin_opinion_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT vitamin_opinion_answers_pk_2
                               UNIQUE (quiz_id, vitamin_opinion_id),
                           CONSTRAINT vitamin_opinion_answers_vitamin_opinions_id_fk
                               FOREIGN KEY (vitamin_opinion_id) REFERENCES vitamin_opinions (id),
                           CONSTRAINT vitamin_opinion_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
