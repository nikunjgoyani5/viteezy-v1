CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `gender_answers`
--

DROP TABLE IF EXISTS `gender_answers`;
CREATE TABLE `gender_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `gender_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT gender_answers_pk_2
                               UNIQUE (quiz_id, gender_id),
                           CONSTRAINT gender_answers_genders_id_fk
                               FOREIGN KEY (gender_id) REFERENCES genders (id),
                           CONSTRAINT gender_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
