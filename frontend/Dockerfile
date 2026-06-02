FROM nginx
COPY nginx.conf etc/nginx/conf.d/viteezy.conf
COPY ./dist/viteezy/ /usr/share/nginx/html
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
