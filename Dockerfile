# The base for this container is defined at
#   https://github.com/CometVisu/Docker/tree/master/CometVisuBase
# and available in the DockerHub at
#   https://hub.docker.com/r/cometvisu/cometvisuabstractbase/
ARG CONTAINER_FROM=cometvisu/cometvisuabstractbase:latest
FROM $CONTAINER_FROM

# Not required but makes the debugging work a bit more easy (might be removed in future):
COPY utils/docker/container_bashrc.sh /root/.bashrc

# Fill the labels to keep build information:
ARG GITHUB_RUN_ID
ARG GITHUB_RUN_NUMBER
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION_TAG

# Own labels
LABEL org.cometvisu.github-run-id=$GITHUB_RUN_ID
LABEL org.cometvisu.github-run-number=$GITHUB_RUN_NUMBER
# Labels according to http://label-schema.org/rc1/
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.version=$VERSION_TAG

# Fill the web root with the current build:
COPY build/ /var/www/html/

VOLUME /var/www/html/resource/config
