# The base for this container is defined at
#   https://github.com/CometVisu/Docker/tree/master/CometVisuBase
# and available in the DockerHub at
#   https://hub.docker.com/r/cometvisu/cometvisuabstractbase/
ARG CONTAINER_FROM=cometvisu/cometvisuabstractbase:latest
FROM $CONTAINER_FROM

# Not required but makes the debugging work a bit more easy (might be removed in future):
COPY utils/docker/container_bashrc.sh /root/.bashrc

# Fill the labels to keep build information:
ARG TRAVIS_JOB_NUMBER
ARG TRAVIS_JOB_WEB_URL
ARG TRAVIS_BUILD_WEB_URL
ARG BUILD_DATE
ARG VCS_REF
ARG VERSION_TAG

# Own labels
LABEL org.cometvisu.travis-job-number=$TRAVIS_JOB_NUMBER
LABEL org.cometvisu.travis-job-web-url=$TRAVIS_JOB_WEB_URL
LABEL org.cometvisu.travis-build-web-url=$TRAVIS_BUILD_WEB_URL
# Labels according to http://label-schema.org/rc1/
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.vcs-ref=$VCS_REF
LABEL org.label-schema.version=$VERSION_TAG

# Fill the web root with the current build:
COPY build/ /var/www/html/

VOLUME /var/www/html/resource/config
