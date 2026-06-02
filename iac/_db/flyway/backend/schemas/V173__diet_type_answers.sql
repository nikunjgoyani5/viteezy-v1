CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `diet_type_answers`
--

DROP TABLE IF EXISTS `diet_type_answers`;
CREATE TABLE `diet_type_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `diet_type_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT diet_type_answers_pk_2
                               UNIQUE (quiz_id, diet_type_id),
                           CONSTRAINT diet_type_answers_diet_types_id_fk
                               FOREIGN KEY (diet_type_id) REFERENCES diet_types (id),
                           CONSTRAINT diet_type_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
