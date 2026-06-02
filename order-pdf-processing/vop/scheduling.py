from crontab import CronTab
import re
from datetime import datetime
from vop import helpers

def day_number(day: str) -> int:
    """
    Returns the day number of the week based on a string input.
    Day numbering ranges from 0-6 for Sunday - Saturday

        Parameters:
            day (str): Name of the day (e.g. Monday, mon, MON)
        
        Output:
            day_number (int): Day number of week.
    
    """
    mapping = {
        "SUN": 0,
        "MON": 1,
        "TUE": 2,
        "WED": 3,
        "THU": 4,
        "FRI": 5,
        "SAT": 6
        }
    return mapping[day[0:3].strip().upper()]

def text_to_cron(txt: str):
    """
    Parses an interval text to cron expression

        Parameters:
            txt (str): Human readable input text. Some examples below.
            "at 06:00" (means every day at 06:00 AM)
            "every 1 hour on thursday"
            "every 5 hours starting at 06:00 on monday-friday"
            "every 01:00 on monday-friday"
        
        Output:
            cron_expression (str): Interval in cron expression (e.g. 0 * * * * means every hour at 0 minutes past the hour)
    """

    tpl1 = r"every (.*) (.*) from (.*) on (.*)"
    tpl2 = r"every (.*) (.*) from (.*)"
    tpl3 = r"every (.*) (.*) on (.*)"
    tpl4 = r"every (.*) (.*) at (.*)"
    tpl5 = r"at (.*)"
    tpl6 = r"every (.*) (.*) at (.*) on (.*)"
    tpl7 = r"every (.*) (.*)"

    minute = "*"
    hour = "*"
    day_month = "*"
    month = "*"
    days = "*"
    time_value = "*"
    unit = None

    if "every" in txt and "from" in txt and "on" in txt:
        m = re.match(tpl1, txt)
        unit_value = int(m.group(1))
        unit = m.group(2).replace("s","")
        days = m.group(4)
        if "-" in m.group(3):
            time_value = f'{int(m.group(3).split("-")[0].split(":")[0])}-{int(m.group(3).split("-")[1].split(":")[0])}'
        else:
            time_value = f'{int(m.group(3).split(":")[0])}-23'
        if "-" in days:
            day_start = day_number(days.split('-')[0])
            day_end = day_number(days.split('-')[1])
            days = f"{day_start}-{day_end}"
        else:
            days = day_number(days)
    elif "every" in txt and "from" in txt:
        m = re.match(tpl2,txt)
        unit_value = int(m.group(1))
        unit = m.group(2).replace("s","")
        if "-" in m.group(3):
            time_value = f'{int(m.group(3).split("-")[0].split(":")[0])}-{int(m.group(3).split("-")[1].split(":")[0])}'
        else:
            time_value = f'{int(m.group(3).split(":")[0])}-23'
    elif "every" in txt and "at" in txt and "on" in txt:
        m = re.match(tpl6, txt)
        unit_value = int(m.group(1))
        unit = m.group(2).replace("s","")
        time_value = int(m.group(3).split(":")[0])
        days = m.group(4)
        if "-" in days:
            day_start = day_number(days.split('-')[0])
            day_end = day_number(days.split('-')[1])
            days = f"{day_start}-{day_end}"
        else:
            days = day_number(days)
    elif "every" in txt and "on" in txt:
        m = re.match(tpl3, txt)
        unit_value = int(m.group(1))
        unit = m.group(2).replace("s","")
        days = m.group(3)
        if "-" in days:
            day_start = day_number(days.split('-')[0])
            day_end = day_number(days.split('-')[1])
            days = f"{day_start}-{day_end}"
        else:
            days = day_number(days)
    elif "every" in txt and "at" in txt:
        m = re.match(tpl4, txt)
        unit_value = int(m.group(1))
        unit = m.group(2).replace("s","")
        time_value = int(m.group(3).split(":")[0])
    elif "every" in txt:
        m = re.match(tpl7, txt)
        unit_value = int(m.group(1))
        unit = m.group(2).replace("s","")
        unit = "daymonth" if unit == "day" else unit
    elif "at" in txt:
        m = re.match(tpl5, txt)
        time_value = int(m.group(1).split(":")[0])
    else:
        raise NotImplementedError("This format of input is not supported")
    
    if not unit:
        minute = 0
        hour = time_value
    elif unit == "minute":
        minute = f"*/{unit_value}"
    elif unit == "hour":
        minute = 0
        hour = f"{time_value}/{unit_value}" if time_value else f"*/{unit_value}"
    elif unit == "day":
        minute = 0
        hour = time_value
        days = f"*/{unit_value}"
    elif unit == "daymonth":
        minute = 0
        hour = time_value if time_value != "*" else 0
        day_month = f"*/{unit_value}"
    return f"{minute} {hour} {day_month} {month} {days}"

class Schedule():
    def __init__(self, print_func=print) -> None:
        self.cron = CronTab(user=True)
        self.print = print_func

    def print_job(self, job, prefix:str=""):
        """Function will take a job object and print it"""
        self.print(f"{prefix}Command='{job.command}', interval='{job.description()}', comment='{job.comment}', enabled='{job.enabled}'")


    def schedule(self, cron_expression: str, command: str, comment: str=None) -> None:
        """
        Schedules a cron job based on a cron_expression and command. It will generate a unique comment so that
        it can easily be identified for removal later
        
            Parameters:
                cron_expression (str): Cron expression to indicate the interval (e.g. "0 1 * * *")
                command (str): Command that is to be executed everytime the cron job triggers (e.g. "vop --help")
                comment (str): Optional comment to be used when creating the job
            
            Output:
                None
        """
        if not comment:
            comment = f"vop{int(datetime.now().timestamp()*1000)}"  # Generate unique comment based on time stamp
        job = self.cron.new(command=command, comment=comment)    # Create a new job
        job.setall(cron_expression) # Set the interval of the job
        if job.is_valid():  # Ensure that the job is valid
            self.cron.write()    # Write the new cron job
            self.print_job(job, prefix="Added job: ")
        else:   # Not valid, raise error
            raise ValueError(f"New cron job with command='{job.command}' and interval='{job.description()}'")

    def list_jobs(self):
        """
        Find all jobs with command 'vop' and print them to screen
        """
        jobs = self.cron.find_command('vop')
        self.print("List of scheduled jobs:")
        for idx, job in enumerate(jobs):
            self.print_job(job=job,prefix=f"{str(idx).zfill(2)} - ")

    def rm_job(self, comment:str):
        """
        Find a job based on comment and remove it. If there are multiple jobs with the same comment, it will remove all of them

            Parameters:
                comment (str): The comment to be used to remove a job
            
            Output:
                None
        """
        jobs = self.cron.find_comment(comment)
        idx = None
        for idx, job in enumerate(jobs):
            self.print_job(job=job, prefix="Removing job: ")
            self.cron.remove(job)
        self.cron.write()
        if idx == None:
            self.print(f"No jobs found with comment '{comment}'")

    def job_exists(self, comment:str):
        """Checks if any jobs with the same comment exist
        
                Paremeters:
                    comment (str): The comment to check for
                
                Output:
                    exists (bool): True if job exists
        """
        jobs = self.cron.find_comment(comment)
        if len(list(jobs)) > 0:
            return True
        else:
            return False

    def rm_all_jobs(self):
        """Remove all jobs that have 'vop' in the command"""
        jobs = self.cron.find_command('vop')
        idx = -1
        for idx, job in enumerate(jobs):
            self.print_job(job=job, prefix="Removing: ")
            self.cron.remove(job)
        self.cron.write()
        print(f"Removed {idx+1} jobs")

    def schedule_from_config(self):
        """
        Loads the pre-defined schedule entries from the config and adds it to the cron schedule. Ensures the job does not exist already
        """
        cfg = helpers.load_config()['schedule']
        for task in cfg:
            if not self.job_exists(task['name']):
                cron_expression = text_to_cron(task['interval'])
                command = task['command'].replace("vop", "/usr/local/bin/vop")
                self.schedule(cron_expression, command=command,comment=task['name'])

    def disable_all_jobs(self):
        """Disables all jobs that have 'vop' in the command"""
        jobs = self.cron.find_command('vop')
        idx = -1
        for idx, job in enumerate(jobs):
            self.print_job(job=job, prefix="Disabling: ")
            job.enabled = False
        self.cron.write()

    def enable_all_jobs(self):
        """Enables all jobs that have 'vop" in the command"""
        jobs = self.cron.find_command('vop')
        idx = -1
        for idx, job in enumerate(jobs):
            self.print_job(job=job, prefix="Enabling: ")
            job.enabled = True
        self.cron.write()