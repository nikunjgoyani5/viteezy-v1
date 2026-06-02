CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `daily_four_alcoholic_drinks_answers`
--

DROP TABLE IF EXISTS `daily_four_alcoholic_drinks_answers`;
CREATE TABLE `daily_four_alcoholic_drinks_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `daily_four_alcoholic_drinks_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT daily_four_alcoholic_drinks_answers_pk_2
                               UNIQUE (quiz_id, daily_four_alcoholic_drinks_id),
                           CONSTRAINT daily_four_alcoholic_drinks_answers_daily_four_a_drinks_id_fk
                               FOREIGN KEY (daily_four_alcoholic_drinks_id) REFERENCES daily_four_alcoholic_drinks (id),
                           CONSTRAINT daily_four_alcoholic_drinks_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
