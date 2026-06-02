CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `usage_reason_answers`
--

DROP TABLE IF EXISTS `usage_reason_answers`;
CREATE TABLE `usage_reason_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `usage_reason_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT usage_reason_answers_pk_2
                               UNIQUE (quiz_id, usage_reason_id),
                           CONSTRAINT usage_reason_answers_usage_reasons_id_fk
                               FOREIGN KEY (usage_reason_id) REFERENCES usage_reasons (id),
                           CONSTRAINT usage_reason_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
