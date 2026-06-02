CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `healthy_lifestyle_answers`
--

DROP TABLE IF EXISTS `healthy_lifestyle_answers`;
CREATE TABLE `healthy_lifestyle_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `healthy_lifestyle_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT healthy_lifestyle_answers_pk_2
                               UNIQUE (quiz_id, healthy_lifestyle_id),
                           CONSTRAINT healthy_lifestyle_answers_healthy_lifestyles_id_fk
                               FOREIGN KEY (healthy_lifestyle_id) REFERENCES healthy_lifestyles (id),
                           CONSTRAINT healthy_lifestyle_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
