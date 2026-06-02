CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `skin_type_answers`
--

DROP TABLE IF EXISTS `skin_type_answers`;
CREATE TABLE `skin_type_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `skin_type_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT skin_type_answers_pk_2
                               UNIQUE (quiz_id, skin_type_id),
                           CONSTRAINT skin_type_answers_skin_types_id_fk
                               FOREIGN KEY (skin_type_id) REFERENCES skin_types (id),
                           CONSTRAINT skin_type_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
