# Change Log

All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [0.2.0] - 2022-8-24

This release focuses on enableing SFTP delivery

### Added
- Process now has a flag to enable delivering PDFs through SFTP
- config.yaml updated to include relevant sftp config
- ssh key authentication by mounting private key to /data/ssh_key

## [0.1.0] - 2022-08-19

This release mainly sees the inclusion of a functional scheduling mechanism through the cli which utilises the cron scheduler as well as adding logging.

### Added
- Scheduling module (vop/scheduling.py) and scheduling cli module (vop/cli/schedule.py)
  - Added default schedule entry to config.yaml to execute process --all at 07:00 mon-fri
- Added \_\_main\_\_.py so it can be run as a module (not default use-case)
- Added logging capabilities. Everytime 'vop process run' is called it will generate a log file in /data/log

### Fixed
- Fixed bug in __init__.py __version__ when app was not installed
- 

### Changed
- Changed vop/dirs.py to fall back to package folder's data folder if /data does not exist
- Updated dependencies (removed rocketry and schedule, added python-crontab and cron-descriptor)

## [0.0.1] - 2022-08-12

Initial release