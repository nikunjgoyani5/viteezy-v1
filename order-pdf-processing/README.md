# Viteezy Order Processing

Viteezy Order Processing is a tool to automate the processing of customer orders. 

## Features

- Highly modular and user configurable through `config.yaml`
- Command Line Interface
- Connects to existing MariaDB database to extract orders
- Generates packing list for pharma
- Generates card based on .docx template
- Generates pdf using libreoffice

## Installation

The recommended installation method is through docker. 
To build the docker image:

```
git clone https://github.com/spmvoss/viteezy-order-processing.git
cd viteezy-order-processing
docker build -t viteezyorderprocessing:latest .
```

An example compose file has been provided at `docker-compose.yml`.

The tool's configuration and resources will be mounted at `/data` in the container. 
The tool's output will be mounted at `/data/output` in the container. 

## Run

```
docker build -t viteezyorderprocessing:latest .
docker compose -f docker-compose.development.yml up vit_tool
```

## Configuration

Resources and configuration files can be found in `/data` in the docker container. It is highly recommended to map this folder to a volume to ensure persitence of data. 
- `/data/fonts`: Custom fonts that will be installed when building the container
- `/data/images/`: Folder containing supplement images
- `/data/templates/`: Folder containing .docx templates. The tool currently defaults to `template.docx`
- `/data/config.yaml` Contains the main tool's configuration
- `/data/inventory.yaml` Contains the inventory overview (i.e. the supplements and their excepients etc)

For a minimal working setup, the database connection parameters in `config.yaml` will have to be set. The config file can be manually edited.

### SFTP

When authenticating to SFTP using a private key, you will have to mount your private key to /data/ssh_key in the container. 

## Usage

The tool is a CLI tool and can be called from command line using `vop`. 
Help information is available through `vop --help`. The `scheduler` command is currently not yet functional. 

The main invocation to process all orders is 

```
vop process run --all
```

You will then find the output in `/data/output/` where a folder has been made for each split as defined in the `config.yaml`.

### Generating the insert PDF for a single order

The **insert PDF** (vitamin card / packing slip) for one order can be generated or retrieved as follows.

**1. If the PDF was already generated (order went through the normal pipeline)**  
- The file is on the **SFTP** server in the folder defined by `sftp_delivery.pdf_folder` (default `PDF`).  
- The filename is **`{order_number}.pdf`**, where `order_number` is the order’s EAN-13–style value from the `orders` table (e.g. `8712345678901`).  
- **How to get `order_number` for a customer’s latest order:**  
  - **Dashboard:** Open the customer → Orders; the order with status “Verstuurd naar apotheker” (sent to pharmacy) has that `order_number` (often shown as “Ordernummer” or in the order details).  
  - **API:** `GET /viteezy/api/dashboard/orders/customer/{customerExternalReference}` returns all orders for the customer; pick the latest (e.g. by `lastModified` or `created`) and use its `orderNumber`.  
- **Ways to get the existing PDF:**  
  - Download from SFTP: connect with your SFTP client (host/username/key from config or env) and get `PDF/{order_number}.pdf`.  
  - If you have a shared drive or backup that syncs from SFTP, look for that path and filename there.

**2. Re-generate the insert PDF locally (any order, any status)**  
- You need the **order id** (`orders.id`). From the dashboard or API, open the order and use its numeric id.  
- From the project root (or inside the order-pdf-processing container):

  ```bash
  vop process order <order_id>
  ```

  Example: `vop process order 12345`  
  This generates the PDF under `data/output/single_<order_id>/pdf/<order_number>.pdf` (or under `--output-dir` if you pass `-o`). It does **not** update the database or upload to SFTP unless you pass `--update-db` or `--transfer`.  

  Options:
  - `-o / --output-dir`: Directory for doc/pdf output (default: `data/output/single_<order_id>`).
  - `--update-db`: Set order status to PACKING_SLIP_READY after generating (use only if you intend to move the order forward again).
  - `--transfer`: Upload the generated PDF to SFTP after generation.

**Summary for your live customer**  
- Last log “Subscription reactivated”, latest order status “sent to pharmacy” → that order’s insert PDF was already generated when it moved to “Kaart gemaakt” (PACKING_SLIP_READY) and then sent to the pharmacist.  
- **To get that PDF:** (1) Find her latest order’s `order_number` (dashboard or API), then download `PDF/{order_number}.pdf` from SFTP; or (2) Find that order’s `order_id` and run `vop process order <order_id>` to re-generate the PDF locally.

### Testing
When you are testing the tool with some new settings, it may be useful to not actually write the status changes back into the database. To do this, you may run

```
vop process run --no-update-db
```

### Scheduling

The tool provides a useful interface for scheduling. Currently, the scheduling will only execute on whole hours (e.g. 01:00, 02:00 and not 01:15, 02:15).

Use `vop schedule --help` to get detailed help information.

**Loading tasks from config**

To load tasks from the configuration file use `vop schedule init`

**Viewing tasks**

To view all tasks currently in the schedule use `vop schedule ls`

**Adding a task**
```
vop schedule add-task --name \<name\> --command \<command\> --interval \<interval\>
```
example:

```
vop schedule add-task --name 'my unique name' --command 'vop process run --all' --interval 'every 5 hours starting at 06:00 on monday-friday'
```

**Removing tasks**

You may remove tasks using `vop schedule rm`. See `vop schedule rm --help` for more details.

**Stopping and starting execution**

The scheduler is running by default and adding a task will enable it by default. \
To stop the scheduler from running, without removing tasks, use `vop schedule stop`. \
To start the scheduler, use `vop schedule start`


## Roadmap

- Full code coverage with tests
- Providing commentary to code
- Configuration command in CLI
- Auto deliver .PDF files through SFTP
- Auto deliver .csv files through email
