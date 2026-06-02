CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `used_supplements_answers`
--

DROP TABLE IF EXISTS `used_supplements_answers`;
CREATE TABLE `used_supplements_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `usedSupplement_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT used_supplements_answers_pk_2
                               UNIQUE (quiz_id, usedSupplement_id),
                           CONSTRAINT used_supplements_answers_used_supplements_id_fk
                               FOREIGN KEY (usedSupplement_id) REFERENCES used_supplements (id),
                           CONSTRAINT used_supplements_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
