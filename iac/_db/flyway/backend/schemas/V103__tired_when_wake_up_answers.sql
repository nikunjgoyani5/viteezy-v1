CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `tired_when_wake_up_answers`
--

DROP TABLE IF EXISTS `tired_when_wake_up_answers`;
CREATE TABLE `tired_when_wake_up_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `tired_when_wake_up_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT tired_when_wake_up_answers_pk_2
                               UNIQUE (quiz_id, tired_when_wake_up_id),
                           CONSTRAINT tired_when_wake_up_answers_tired_when_wake_ups_id_fk
                               FOREIGN KEY (tired_when_wake_up_id) REFERENCES tired_when_wake_ups (id),
                           CONSTRAINT tired_when_wake_up_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
