import uno
from pathlib import Path
from com.sun.star.beans import PropertyValue

DOC_DIR = Path("O070326008/doc")
PDF_DIR = Path("O070326008/pdf")

PDF_DIR.mkdir(exist_ok=True, parents=True)


def connect_uno():
    local_context = uno.getComponentContext()
    resolver = local_context.ServiceManager.createInstanceWithContext(
        "com.sun.star.bridge.UnoUrlResolver", local_context
    )

    context = resolver.resolve(
        "uno:socket,host=127.0.0.1,port=2002;urp;StarOffice.ComponentContext"
    )

    smgr = context.ServiceManager
    desktop = smgr.createInstanceWithContext("com.sun.star.frame.Desktop", context)

    return desktop


def convert_file(desktop, input_path, output_path):
    input_url = uno.systemPathToFileUrl(str(input_path.resolve()))
    output_url = uno.systemPathToFileUrl(str(output_path.resolve()))

    properties = (PropertyValue("Hidden", 0, True, 0),)

    document = desktop.loadComponentFromURL(input_url, "_blank", 0, properties)

    pdf_props = (
        PropertyValue("FilterName", 0, "writer_pdf_Export", 0),
    )

    document.storeToURL(output_url, pdf_props)
    document.close(True)


def main():
    desktop = connect_uno()

    files = list(DOC_DIR.glob("*.docx"))

    print(f"Found {len(files)} DOCX files")

    for file in files:
        output = PDF_DIR / file.with_suffix(".pdf").name
        print(f"Converting {file.name} -> {output.name}")
        convert_file(desktop, file, output)

    print("Conversion completed")


if __name__ == "__main__":
    main()