from pathlib import Path
import paramiko

import logging
logger = logging.getLogger(__name__)


class ConParamiko:
    def __init__(self, hostname: str, username: str, password: str = None, private_key: Path = None, port:int = 22):
        """
        Initialises the SSH connection
        
            Parameters:
                hostname (str): hostname of the server to connect to
                username (str): username to authenticate as at the server
                password (str): optional password. If both password and private_key are set, password will be used to try to unlock the private key, not to authenticate at the server
                private_key (pathlib.Path): optional path to private key used to authenticate
                port (int): optional port to connect to
        """
        private_key = private_key.as_posix() if private_key else None
        self.client = paramiko.SSHClient()  # Start the SSH client
        self.client.set_missing_host_key_policy(paramiko.AutoAddPolicy())   # Set policy to auto add missing host keys. Does check for changed keys to prevent man-in-the-middle attacks
        
        # Start the SSH connection
        self.client.connect(hostname=hostname, 
                            username=username, 
                            password=password, 
                            key_filename=private_key, 
                            port=port)

    def put_file(self, local_path: Path, remote_path: Path) -> None:
        """
        Copies a file from local path to remote path

            Parameters:
                remote_path (pathlib.Path): Destination path on the remote location
                local_path (pathlib.Path): Path of local file to copy

            Output:
                None
        """
        if not local_path.exists():
            raise FileNotFoundError()
        ftp_client = self.client.open_sftp()
        ftp_client.put(local_path.as_posix(), remote_path.as_posix())
        ftp_client.close()

    def get_file(self, remote_path: Path, local_path: Path) -> None:
        """
        Retrieves a file from the remote location and copies it to the local path

            Parameters:
                remote_path (pathlib.Path): Source path on the remote location
                local_path (pathlib.Path): Destination path to copy the file to

            Output:
                None
        """
        ftp_client = self.client.open_sftp()
        ftp_client.get(remote_path.as_posix(), local_path.as_posix())
        ftp_client.close()

    def delete_remote_file(self, remote_path: Path) -> None:
        """Delets a file on the remote server"""
        ftp_client = self.client.open_sftp()
        ftp_client.remove(remote_path.as_posix())
        ftp_client.close()

    def remote_file_exists(self, remote_file: Path) -> bool:
        """Check whether a remote file exists and has a non-zero file size"""
        ftp_client = self.client.open_sftp()
        try:
            info = ftp_client.stat(remote_file.as_posix())
            if info.st_size > 0:
                return True
            else:
                return False
        except IOError:
            return False

    def close(self):
        self.client.close()