CREATE DATABASE  IF NOT EXISTS `viteezy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `viteezy`;

--
-- Table structure for table `quiz_blend_relations`
--

DROP TABLE IF EXISTS `quiz_blend_relations`;
CREATE TABLE `quiz_blend_relations` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `quiz_id` int(11) NOT NULL,
                           `blend_id` int(11) NOT NULL ,
                           `creation_timestamp` timestamp DEFAULT NOW(),
                           `modification_timestamp` timestamp DEFAULT NOW(),
                           PRIMARY KEY (`id`),
                           CONSTRAINT quiz_blend_relation_pk_2
                               UNIQUE (quiz_id, blend_id),
                           CONSTRAINT quiz_blend_relation_blend_id_fk
                               FOREIGN KEY (blend_id) REFERENCES blends (id),
                           CONSTRAINT quiz_blend_relation_quiz_id_fk
                               FOREIGN KEY (quiz_id) REFERENCES quiz (id)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
