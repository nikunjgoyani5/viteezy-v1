CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `lose_weight_challenge_answers`
--

DROP TABLE IF EXISTS `lose_weight_challenge_answers`;
CREATE TABLE `lose_weight_challenge_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `lose_weight_challenge_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT lose_weight_challenge_answers_pk_2
                               UNIQUE (quiz_id, lose_weight_challenge_id),
                           CONSTRAINT lose_weight_challenge_answers_lose_weight_challenges_id_fk
                               FOREIGN KEY (lose_weight_challenge_id) REFERENCES lose_weight_challenges (id),
                           CONSTRAINT lose_weight_challenge_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
