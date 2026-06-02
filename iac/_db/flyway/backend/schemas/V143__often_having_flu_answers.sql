CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `often_having_flu_answers`
--

DROP TABLE IF EXISTS `often_having_flu_answers`;
CREATE TABLE `often_having_flu_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `often_having_flu_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT often_having_flu_answers_pk_2
                               UNIQUE (quiz_id, often_having_flu_id),
                           CONSTRAINT often_having_flu_answers_often_having_flus_id_fk
                               FOREIGN KEY (often_having_flu_id) REFERENCES often_having_flus (id),
                           CONSTRAINT often_having_flu_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
