CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `iron_prescribed_answers`
--

DROP TABLE IF EXISTS `iron_prescribed_answers`;
CREATE TABLE `iron_prescribed_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `iron_prescribed_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT iron_prescribed_answers_pk_2
                               UNIQUE (quiz_id, iron_prescribed_id),
                           CONSTRAINT iron_prescribed_answers_iron_prescribeds_id_fk
                               FOREIGN KEY (iron_prescribed_id) REFERENCES iron_prescribeds (id),
                           CONSTRAINT iron_prescribed_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
