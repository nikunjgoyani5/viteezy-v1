import sched
import pytest
from vop import scheduling

class TestDayOfWeek:
    def test_monday(self):
        assert scheduling.day_number("monday") == 1
        assert scheduling.day_number("Monday") == 1
        assert scheduling.day_number("mon") == 1
        assert scheduling.day_number("MON") == 1
    
    def test_tuesday(self):
        assert scheduling.day_number("tuesday") == 2
        assert scheduling.day_number("Tuesday") == 2
        assert scheduling.day_number("tue") == 2

    def test_wednesday(self):
        assert scheduling.day_number("wednesday") == 3

    def test_thursday(self):
        assert scheduling.day_number("thursday") == 4
    
    def test_friday(self):
        assert scheduling.day_number("friday") == 5

    def test_saturday(self):
        assert scheduling.day_number("saturday") == 6
    
    def test_sunday(self):
        assert scheduling.day_number("sunday") == 0

class TestTextToCron:

    def test_tpl_5(self):
        cron_txt = scheduling.text_to_cron("at 06:00")
        assert cron_txt == '0 6 * * *'

        cron_txt = scheduling.text_to_cron("at 15:00")
        assert cron_txt == "0 15 * * *"
    
    def test_tpl_4(self):
        cron_txt = scheduling.text_to_cron("every 2 days at 02:00")
        assert cron_txt == "0 2 * * */2"

        cron_txt = scheduling.text_to_cron("every 1 day at 07:00")
        assert cron_txt == "0 7 * * */1"

    def test_tpl_3(self):
        cron_txt = scheduling.text_to_cron("every 2 hours on monday")
        assert cron_txt == "0 */2 * * 1"

        cron_txt = scheduling.text_to_cron("every 1 hour on monday-friday")
        assert cron_txt == "0 */1 * * 1-5"

    def test_tpl_2(self):
        cron_txt = scheduling.text_to_cron("every 1 hour from 01:00")
        assert cron_txt == "0 1-23/1 * * *"

        cron_txt = scheduling.text_to_cron("every 1 hour from 01:00-08:00")
        assert cron_txt == "0 1-8/1 * * *"
    
    def test_tpl_1(self):
        cron_txt = scheduling.text_to_cron("every 5 hours from 07:00 on tuesday")
        assert cron_txt == "0 7-23/5 * * 2"

        cron_txt = scheduling.text_to_cron("every 1 hour from 01:00-08:00 on monday-friday")
        assert cron_txt == "0 1-8/1 * * 1-5"
    
    def test_tpl_7(self):
        cron_txt = scheduling.text_to_cron("every 1 hour")
        assert cron_txt == "0 */1 * * *"

        cron_txt = scheduling.text_to_cron("every 2 days")
        assert cron_txt == "0 0 */2 * *"

class TestScheduleConfigInterface:
    skd = scheduling.Schedule(print_func=print)
    skd.rm_all_jobs()

    def test_schedule_from_config(self, capfd):
        self.skd.schedule_from_config()
        assert self.skd.job_exists('dflt_sched_1') == True

        self.skd.rm_all_jobs()
        assert self.skd.job_exists('dflt_sched_1') == False
    
    def test_list_jobs(self, capfd):
        self.skd.schedule_from_config()
        _ = capfd.readouterr()
        self.skd.list_jobs()
        out, err = capfd.readouterr()
        assert out == "List of scheduled jobs:\n00 - Command='/usr/local/bin/vop process --all', interval='At 07:00 AM', comment='dflt_sched_1', enabled='True'\n"
        self.skd.rm_all_jobs()

    def test_schedule_and_rm_job(self):
        name = "schedule test"
        self.skd.schedule(scheduling.text_to_cron("every 5 hours"),command="vop --version", comment=name)
        assert self.skd.job_exists(name) == True

        self.skd.rm_job("schedule test")
        assert self.skd.job_exists(name) == False

    def test_disable_enable(self, capfd):
        name="enable/disable"
        self.skd.schedule(scheduling.text_to_cron("every 2 hours"), command="vop --help", comment=name)
        _ = capfd.readouterr()
        self.skd.list_jobs()
        out, err = capfd.readouterr()
        assert out == "List of scheduled jobs:\n00 - Command='vop --help', interval='Every 2 hours', comment='enable/disable', enabled='True'\n"

        self.skd.disable_all_jobs()
        out, err = capfd.readouterr()
        assert out == "Disabling: Command='vop --help', interval='Every 2 hours', comment='enable/disable', enabled='True'\n"

        self.skd.list_jobs()
        out, err = capfd.readouterr()
        assert out == "List of scheduled jobs:\n00 - Command='vop --help', interval='Every 2 hours', comment='enable/disable', enabled='False'\n"
        
        self.skd.enable_all_jobs()
        out,err = capfd.readouterr()
        assert out == "Enabling: Command='vop --help', interval='Every 2 hours', comment='enable/disable', enabled='False'\n"
        
        self.skd.list_jobs()
        out, err = capfd.readouterr()
        assert out == "List of scheduled jobs:\n00 - Command='vop --help', interval='Every 2 hours', comment='enable/disable', enabled='True'\n"

        self.skd.rm_all_jobs()
    
