import importlib.metadata

__app_name__ = "Viteezy Order Processing"
try:
    __version__ = importlib.metadata.version("viteezy_order_processing")
except importlib.metadata.PackageNotFoundError:
    __version__ = "debug"