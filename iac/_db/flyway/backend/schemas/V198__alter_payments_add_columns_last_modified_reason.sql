ALTER TABLE `payments`
  add column IF NOT EXISTS `sequence_type` varchar(200);
