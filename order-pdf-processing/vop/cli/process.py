import typer
from typing import Optional
from datetime import datetime 

from vop import __app_name__, __version__, dirs
from vop import processing, data_feed

app = typer.Typer()

def _version_callback(value: bool) -> None:
    if value:
        typer.echo(f"{__app_name__}, v{__version__}")
        raise typer.Exit()


@app.command()
def ls():
    """Gets the number of orders that would be processed with the current config settings
    and displays this to the user"""
    _, n_orders = data_feed.orders_available()
    typer.echo(f"{n_orders} orders are eligible for processing")
    raise typer.Exit()

@app.command()
def run(
    process_all: bool = typer.Option(
        False,
        help="Will process until there are no orders to process anymore",
    ),
    demo: bool = typer.Option(
        False,
        help="Run in demo mode without DB/SFTP; generates a sample DOCX/PDF output",
        rich_help_panel="Customization and Utils",
        show_default=True,
    ),
    update_db: bool = typer.Option(
        True,
        help="Determines whether processing writes updates back to the database",
        rich_help_panel="Customization and Utils",
        show_default=True,
    ),
    transfer_files: bool = typer.Option(
        True,
        help="Transfer files through SFTP after processing",
        rich_help_panel="Customization and Utils",
        show_default=True,
    ),
) -> None:
    """
    Process orders
    """
    """
    import logging
    logging.basicConfig(
        format='%(asctime)s %(levelname)-8s %(message)s',
        filename=(dirs.data_dir / 'log' / datetime.now().isoformat().replace(":","")).with_suffix(".log"),
        level=logging.INFO,
        datefmt='%Y-%m-%d %H:%M:%S')
    """
    processing.process(process_all=process_all, update_db=update_db, transfer_files=transfer_files, demo=demo)

@app.command()
def ingredient(
    ingredient_id: int = typer.Option(..., help="Ingredient id to render as a single PDF"),
) -> None:
    """
    Generate a single PDF for a specific ingredient id.
    """
    pdf_path = processing.process_single_ingredient(ingredient_id)
    typer.echo(f"PDF created at: {pdf_path}")


@app.command()
def order(
    order_id: int = typer.Argument(..., help="Order id (orders.id) to generate insert PDF for"),
    output_dir: Optional[str] = typer.Option(
        None,
        "--output-dir",
        "-o",
        help="Directory for doc/pdf output (default: data/output/single_<order_id>)",
    ),
    update_db: bool = typer.Option(
        False,
        help="Set order status to PACKING_SLIP_READY after generating PDF",
    ),
    transfer: bool = typer.Option(
        False,
        "--transfer",
        help="Upload generated PDF to SFTP after generation",
    ),
) -> None:
    """
    Generate the insert PDF (vitamin card) for a single order.
    Works for any order status (e.g. already SHIPPED_TO_PHARMACIST).
    By default only generates the PDF locally; use --update-db and/or --transfer if needed.
    """
    from pathlib import Path
    out = Path(output_dir) if output_dir else None
    pdf_path = processing.process_single_order(
        order_id=order_id,
        output_dir=out,
        update_db=update_db,
        transfer_files=transfer,
    )
    typer.echo(f"Insert PDF created at: {pdf_path}")

@app.callback()
def main(
    version: Optional[bool] = typer.Option(
        None,
        "--version",
        "-v",
        help="Show the application's version and exit.",
        callback = _version_callback,
        is_eager = True,
    )
) -> None:
    return

