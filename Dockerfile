# This image is used for testing OpenShift Console dynamic plugin capabilities.
#
# See dynamic-demo-plugin/README.md for details.

# Stage 0: build the demo plugin
FROM quay.io/coreos/tectonic-console-builder:v23 AS build

RUN mkdir -p /src/console
COPY . /src/console

WORKDIR /src/console/dynamic-demo-plugin
RUN yarn install && \
    yarn build

# Stage 1: build the target image
FROM node:10

COPY --from=build /src/console/dynamic-demo-plugin/dist /opt/console-demo-plugin/static
COPY --from=build /src/console/dynamic-demo-plugin/node_modules /opt/console-demo-plugin/node_modules
COPY --from=build /src/console/dynamic-demo-plugin/http-server.sh /opt/console-demo-plugin/http-server.sh

USER node

WORKDIR /opt/console-demo-plugin
ENTRYPOINT [ "./http-server.sh", "./static" ]
