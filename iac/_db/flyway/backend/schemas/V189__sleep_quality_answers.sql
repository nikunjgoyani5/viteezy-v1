CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `sleep_quality_answers`
--

DROP TABLE IF EXISTS `sleep_quality_answers`;
CREATE TABLE `sleep_quality_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `sleep_quality_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT sleep_quality_answers_pk_2
                               UNIQUE (quiz_id, sleep_quality_id),
                           CONSTRAINT sleep_quality_answers_sleep_qualitys_id_fk
                               FOREIGN KEY (sleep_quality_id) REFERENCES sleep_qualitys (id),
                           CONSTRAINT sleep_quality_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
