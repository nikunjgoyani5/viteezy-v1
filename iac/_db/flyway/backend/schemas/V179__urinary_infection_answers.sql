CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `urinary_infection_answers`
--

DROP TABLE IF EXISTS `urinary_infection_answers`;
CREATE TABLE `urinary_infection_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `urinary_infection_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT urinary_infection_answers_pk_2
                               UNIQUE (quiz_id, urinary_infection_id),
                           CONSTRAINT urinary_infection_answers_urinary_infections_id_fk
                               FOREIGN KEY (urinary_infection_id) REFERENCES urinary_infections (id),
                           CONSTRAINT urinary_infection_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
