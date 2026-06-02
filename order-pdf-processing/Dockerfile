# syntax=docker/dockerfile:1

FROM debian:bullseye-slim
WORKDIR /app

ARG DB_HOST
ENV LANG=en_GB.utf8 \
    PYTHONUNBUFFERED=1




RUN apt update \
	# Install libreoffice
	&& apt install -y libreoffice --no-install-recommends --no-install-suggests \
		libreoffice-java-common \
	# Install other packages
	&& apt install -y \
		locales \
		fontconfig \
		python3-pip \
		libmariadb-dev \
		cron \
		nano \
		default-jre \
	# Update locale (so A4 is used instead of letter)
	&& localedef -i en_GB -c -f UTF-8 -A /usr/share/locale/locale.alias en_GB.UTF-8 \
	# Remove apt update cache
	&& rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

COPY ./data /data
RUN mkdir -p /data/output
COPY ./vop /app/vop
COPY ./pyproject.toml pyproject.toml

RUN cp -a /data/fonts/. /usr/local/share/fonts/ && fc-cache -f -v \
	&& pip3 install --no-cache-dir .

CMD ["cron", "-f"]