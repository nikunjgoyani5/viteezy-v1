CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `dry_skin_answers`
--

DROP TABLE IF EXISTS `dry_skin_answers`;
CREATE TABLE `dry_skin_answers` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `dry_skin_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT dry_skin_answers_pk_2
                               UNIQUE (quiz_id, dry_skin_id),
                           CONSTRAINT dry_skin_answers_dry_skins_id_fk
                               FOREIGN KEY (dry_skin_id) REFERENCES dry_skins (id),
                           CONSTRAINT dry_skin_answers_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
