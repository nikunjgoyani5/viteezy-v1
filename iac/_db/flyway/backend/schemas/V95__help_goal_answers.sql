CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `help_goal_answers`
--

DROP TABLE IF EXISTS `help_goal_answers`;
CREATE TABLE `help_goal_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `help_goal_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT help_goal_answers_pk_2
                               UNIQUE (quiz_id, help_goal_id),
                           CONSTRAINT help_goal_answers_help_goals_id_fk
                               FOREIGN KEY (help_goal_id) REFERENCES help_goals (id),
                           CONSTRAINT help_goal_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
