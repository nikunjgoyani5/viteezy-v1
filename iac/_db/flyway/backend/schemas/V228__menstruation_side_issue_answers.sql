CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `menstruation_side_issue_answers`
--

DROP TABLE IF EXISTS `menstruation_side_issue_answers`;
CREATE TABLE `menstruation_side_issue_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `menstruation_side_issue_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT menstruation_side_issue_answers_pk_2
                               UNIQUE (quiz_id, menstruation_side_issue_id),
                           CONSTRAINT menstruation_side_issue_answers_menstruation_side_issues_id_fk
                               FOREIGN KEY (menstruation_side_issue_id) REFERENCES menstruation_side_issues (id),
                           CONSTRAINT menstruation_side_issue_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
