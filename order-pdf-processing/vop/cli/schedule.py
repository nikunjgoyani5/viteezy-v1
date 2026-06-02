from cgitb import text
import typer
from rich import print as rich_print

from vop import helpers
from vop.scheduling import Schedule, text_to_cron

app = typer.Typer()
skd = Schedule(print_func=rich_print)

@app.command()
def init() -> None:
    """Load the schedule entries from config.yaml into the active schedule"""
    skd.schedule_from_config()

@app.command()
def start(load_config: bool = typer.Option(
    False, 
    '--load-cfg',
    '-lc', 
    help="Also load all entries from config.yaml"
)) -> None:
    """Loads all schedule entries from config.yaml and enables all disabled schedule activities"""
    if load_config:
        skd.schedule_from_config()
    skd.enable_all_jobs()
    return

@app.command()
def stop():
    """Stops execution of the schedule by disabling all entries in the schedule"""
    skd.disable_all_jobs()

@app.command()
def ls():
    """List the tasks currently in the schedule as well as their enabled status"""
    skd.list_jobs()

@app.command()
def add_task(
    interval: str = typer.Option(
        None, 
        help="Interval for task execution (e.g. 'at 07:00')"
    ),
    command: str = typer.Option(
        None, 
        help="Command to be executed (e.g. 'vop process --all')"
    ),
    name: str = typer.Option(
        None, 
        help='Unique identifier name for this schedule entry'
    ),
    persistent: bool = typer.Option(
        False, 
        help="If true, entry will also be saved to config.yaml"
    )
    ):
    """Add a new task to the active schedule"""
    if not (interval and command and name):
        rich_print("[bold red]Error:[/bold] You have to provide all --interval, --command, and --name!")
        raise typer.Abort()
    command = command.replace("vop","/usr/local/bin/vop")
    expression = text_to_cron(interval)
    skd.schedule(expression, command, name)
    if persistent and skd.job_exists(name):
        cfg = helpers.load_config()
        cfg['schedule'].append({'command': command, 'interval': interval, 'name': name})


@app.command()
def rm(
    name: str = typer.Option(
        None, 
        help="Name of the task to remove from the schedule"
    ),
    all_tasks: bool = typer.Option(
        None, 
        '--all',
        '-a',
        help="Remove all task from schedule"
    )
    ):
    """Remove a task from the schedule, does not affect config"""
    if not all_tasks and not name:
        rich_print("[red]Error:[/red] You must provide --name when not using the -all option!")
        raise typer.Abort()
    elif not all_tasks:
        skd.rm_job(name)
    else:
        skd.rm_all_jobs()

if __name__ == "__main__":
    app()