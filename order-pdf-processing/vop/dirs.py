from pathlib import Path
import os


src_dir = Path(__file__).parent.resolve()

# Optional override for data directory
_override = os.environ.get("VOP_DATA_DIR")
if _override:
    data_dir = Path(_override)
else:
    data_dir = Path("/data") if Path("/data").exists() else src_dir.parent / "data"

img_dir = data_dir / "images"
out_dir = data_dir / "output"
template_dir = data_dir / "templates"