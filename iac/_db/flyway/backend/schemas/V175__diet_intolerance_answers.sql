CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `diet_intolerance_answers`
--

DROP TABLE IF EXISTS `diet_intolerance_answers`;
CREATE TABLE `diet_intolerance_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `diet_intolerance_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT diet_intolerance_answers_pk_2
                               UNIQUE (quiz_id, diet_intolerance_id),
                           CONSTRAINT diet_intolerance_answers_diet_intolerances_id_fk
                               FOREIGN KEY (diet_intolerance_id) REFERENCES diet_intolerances (id),
                           CONSTRAINT diet_intolerance_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
