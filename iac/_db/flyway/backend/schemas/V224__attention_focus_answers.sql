CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `attention_focus_answers`
--

DROP TABLE IF EXISTS `attention_focus_answers`;
CREATE TABLE `attention_focus_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `attention_focus_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT attention_focus_answers_pk_2
                               UNIQUE (quiz_id, attention_focus_id),
                           CONSTRAINT attention_focus_answers_attention_focus_id_fk
                               FOREIGN KEY (attention_focus_id) REFERENCES attention_focus (id),
                           CONSTRAINT attention_focus_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
