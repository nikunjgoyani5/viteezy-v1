CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `skin_problem_answers`
--

DROP TABLE IF EXISTS `skin_problem_answers`;
CREATE TABLE `skin_problem_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `skin_problem_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT skin_problem_answers_pk_2
                               UNIQUE (quiz_id, skin_problem_id),
                           CONSTRAINT skin_problem_answers_skin_problems_id_fk
                               FOREIGN KEY (skin_problem_id) REFERENCES skin_problems (id),
                           CONSTRAINT skin_problem_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
