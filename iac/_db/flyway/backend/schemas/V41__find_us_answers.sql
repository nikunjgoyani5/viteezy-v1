CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `find_us_answers`
--

DROP TABLE IF EXISTS `find_us_answers`;
CREATE TABLE `find_us_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `find_us_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT find_us_answers_pk_2
                               UNIQUE (quiz_id, find_us_id),
                           CONSTRAINT find_us_answers_find_us_id_fk
                               FOREIGN KEY (find_us_id) REFERENCES find_us (id),
                           CONSTRAINT find_us_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
