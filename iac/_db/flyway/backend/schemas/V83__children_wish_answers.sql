CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `children_wish_answers`
--

DROP TABLE IF EXISTS `children_wish_answers`;
CREATE TABLE `children_wish_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `children_wish_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT children_wish_answers_pk_2
                               UNIQUE (quiz_id, children_wish_id),
                           CONSTRAINT children_wish_answers_children_wishs_id_fk
                               FOREIGN KEY (children_wish_id) REFERENCES children_wishs (id),
                           CONSTRAINT children_wish_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
