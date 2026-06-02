import typer

from vop.cli import process, schedule
from vop import __app_name__, __version__

app = typer.Typer()
app.add_typer(process.app, name="process", help="Used to manually trigger processing")
app.add_typer(schedule.app, name="schedule",help="Used to interact with the scheduler")

@app.command()
def version():
    """Get the current version"""
    print(f"{__app_name__} v{__version__}")