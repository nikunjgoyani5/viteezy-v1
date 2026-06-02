CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `libido_stress_level_answers`
--

DROP TABLE IF EXISTS `libido_stress_level_answers`;
CREATE TABLE `libido_stress_level_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `libido_stress_level_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT libido_stress_level_answers_pk_2
                               UNIQUE (quiz_id, libido_stress_level_id),
                           CONSTRAINT libido_stress_level_answers_libido_stress_levels_id_fk
                               FOREIGN KEY (libido_stress_level_id) REFERENCES libido_stress_levels (id),
                           CONSTRAINT libido_stress_level_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
