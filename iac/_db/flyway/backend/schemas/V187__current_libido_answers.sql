CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `current_libido_answers`
--

DROP TABLE IF EXISTS `current_libido_answers`;
CREATE TABLE `current_libido_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `current_libido_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT current_libido_answers_pk_2
                               UNIQUE (quiz_id, current_libido_id),
                           CONSTRAINT current_libido_answers_current_libidos_id_fk
                               FOREIGN KEY (current_libido_id) REFERENCES current_libidos (id),
                           CONSTRAINT current_libido_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
