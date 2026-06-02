CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `weekly_twelve_alcoholic_drinks_answers`
--

DROP TABLE IF EXISTS `weekly_twelve_alcoholic_drinks_answers`;
CREATE TABLE `weekly_twelve_alcoholic_drinks_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `weekly_twelve_alcoholic_drinks_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT weekly_twelve_alcoholic_drinks_answers_pk_2
                               UNIQUE (quiz_id, weekly_twelve_alcoholic_drinks_id),
                           CONSTRAINT weekly_twelve_alcoholic_drinks_answers_weekly_twelve_a_d_id_fk
                               FOREIGN KEY (weekly_twelve_alcoholic_drinks_id) REFERENCES weekly_twelve_alcoholic_drinks (id),
                           CONSTRAINT weekly_twelve_alcoholic_drinks_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
