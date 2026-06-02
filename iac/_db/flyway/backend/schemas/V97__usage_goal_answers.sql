CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `usage_goal_answers`
--

DROP TABLE IF EXISTS `usage_goal_answers`;
CREATE TABLE `usage_goal_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `usage_goal_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT usage_goal_answers_pk_2
                               UNIQUE (quiz_id, usage_goal_id),
                           CONSTRAINT usage_goal_answers_usage_goals_id_fk
                               FOREIGN KEY (usage_goal_id) REFERENCES usage_goals (id),
                           CONSTRAINT usage_goal_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;

