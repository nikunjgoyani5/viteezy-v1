CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `nutrition_consumptions_answers`
--

DROP TABLE IF EXISTS `nutrition_consumptions_answers`;
CREATE TABLE `nutrition_consumptions_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `nutrition_consumption_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT nutrition_consumptions_answers_pk_2
                               UNIQUE (quiz_id, nutrition_consumption_id),
                           CONSTRAINT nutrition_consumptions_answers_nutrition_consumptions_id_fk
                               FOREIGN KEY (nutrition_consumption_id) REFERENCES nutrition_consumptions (id),
                           CONSTRAINT nutrition_consumptions_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
