CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `allergy_answers`
--

DROP TABLE IF EXISTS `allergy_answers`;
CREATE TABLE `allergy_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `allergy_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT allergy_answers_pk_2
                               UNIQUE (quiz_id, allergy_id),
                           CONSTRAINT allergy_answers_allergies_id_fk
                               FOREIGN KEY (allergy_id) REFERENCES allergies (id),
                           CONSTRAINT allergy_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
