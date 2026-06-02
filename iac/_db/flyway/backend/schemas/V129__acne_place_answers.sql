CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `acne_place_answers`
--

DROP TABLE IF EXISTS `acne_place_answers`;
CREATE TABLE `acne_place_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `acne_place_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT acne_place_answers_pk_2
                               UNIQUE (quiz_id, acne_place_id),
                           CONSTRAINT acne_place_answers_acne_places_id_fk
                               FOREIGN KEY (acne_place_id) REFERENCES acne_places (id),
                           CONSTRAINT acne_place_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
