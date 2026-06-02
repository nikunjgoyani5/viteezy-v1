from unoserver import converter, server
import time
import logging
logger = logging.getLogger(__name__)

def batch_convert(sources, destinations):
    srv = server.UnoServer()
    process = srv.start()
    logger.info("Starting Conversion Server. Waiting 8 seconds to start")
    time.sleep(8)
    cnvrt = converter.UnoConverter()
    logger.info("Starting Conversion")
    for source, destination in zip(sources, destinations):
        cnvrt.convert(inpath=source, outpath=destination,convert_to="pdf")
    logger.info("Conversion Completed")
    
    process.kill()
