CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `binge_eatings_answers`
--

DROP TABLE IF EXISTS `binge_eatings_answers`;
CREATE TABLE `binge_eatings_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `binge_eating_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT binge_eatings_answers_pk_2
                               UNIQUE (quiz_id, binge_eating_id),
                           CONSTRAINT binge_eatings_answers_binge_eatings_id_fk
                               FOREIGN KEY (binge_eating_id) REFERENCES binge_eatings (id),
                           CONSTRAINT binge_eatings_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
