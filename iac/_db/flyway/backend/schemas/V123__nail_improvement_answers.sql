CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `nail_improvement_answers`
--

DROP TABLE IF EXISTS `nail_improvement_answers`;
CREATE TABLE `nail_improvement_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `nail_improvement_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT nail_improvement_answers_pk_2
                               UNIQUE (quiz_id, nail_improvement_id),
                           CONSTRAINT nail_improvement_answers_nail_improvements_id_fk
                               FOREIGN KEY (nail_improvement_id) REFERENCES nail_improvements (id),
                           CONSTRAINT nail_improvement_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
