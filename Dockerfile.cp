FROM node:10

COPY dist /opt/console-demo-plugin/static
COPY node_modules /opt/console-demo-plugin/node_modules
COPY http-server.sh /opt/console-demo-plugin/http-server.sh

USER node

WORKDIR /opt/console-demo-plugin
ENTRYPOINT [ "./http-server.sh", "./static" ]
