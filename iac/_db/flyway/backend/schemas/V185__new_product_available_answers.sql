CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `new_product_available_answers`
--

DROP TABLE IF EXISTS `new_product_available_answers`;
CREATE TABLE `new_product_available_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `new_product_available_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT new_product_available_answers_pk_2
                               UNIQUE (quiz_id, new_product_available_id),
                           CONSTRAINT new_product_available_answers_new_product_availables_id_fk
                               FOREIGN KEY (new_product_available_id) REFERENCES new_product_availables (id),
                           CONSTRAINT new_product_available_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
