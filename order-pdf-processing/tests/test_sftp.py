from vop import sftp
from pathlib import Path
import os

class TestFileTransfer:
    connection = sftp.ConParamiko("sftp_server", "foo",private_key=Path("/data/ssh_key"),port=22)
    def test_transfer_file(self):
        self.connection.put_file(Path("/data/templates/template.docx"), Path("PDF/template.docx"))
        self.connection.get_file(Path("PDF/template.docx"), Path("/data/template.docx"))
        assert self.connection.remote_file_exists(Path("PDF/template.docx"))
        assert Path("/data/template.docx").exists()
        os.remove(Path("/data/template.docx"))

    def test_delete_remote_file(self):
        self.connection.delete_remote_file(Path("PDF/template.docx"))
        assert self.connection.remote_file_exists(Path("PDF/template.docx")) == False
