CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `body_type_target_answers`
--

DROP TABLE IF EXISTS `body_type_target_answers`;
CREATE TABLE `body_type_target_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `body_type_target_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT body_type_target_answers_pk_2
                               UNIQUE (quiz_id, body_type_target_id),
                           CONSTRAINT body_type_target_answers_body_type_targets_id_fk
                               FOREIGN KEY (body_type_target_id) REFERENCES body_type_targets (id),
                           CONSTRAINT body_type_target_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
