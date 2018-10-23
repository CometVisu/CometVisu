FROM php:7.2-apache as builder

##################
# Compile knxd 0.0.5.1
RUN apt-get -qq update \
 && apt-get install -y python python-dev python-pip python-virtualenv \
 && apt-get install -y build-essential gcc git rsync cmake make g++ binutils automake flex bison patch wget libtool \
 && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*

ENV KNXDIR /usr
ENV INSTALLDIR $KNXDIR/local
ENV SOURCEDIR  $KNXDIR/src
ENV LD_LIBRARY_PATH $INSTALLDIR/lib

WORKDIR $SOURCEDIR

# build pthsem
ENV PTHSEM_DOWNLOAD_SHA256 4024cafdd5d4bce2b1778a6be5491222c3f6e7ef1e43971264c451c0012c5c01
RUN wget -O pthsem_2.0.8.tar.gz "https://osdn.net/frs/g_redir.php?m=kent&f=bcusdk%2Fpthsem%2Fpthsem_2.0.8.tar.gz" \
 && echo "$PTHSEM_DOWNLOAD_SHA256 pthsem_2.0.8.tar.gz" | sha256sum -c - \
 && tar -xzf pthsem_2.0.8.tar.gz \
 && cd pthsem-2.0.8 && ./configure --prefix=$INSTALLDIR/ && make && make test && make install

# build knxd
ENV KNXD_DOWNLOAD_SHA256 f47a02efd8618dc1ec5837e08017dabbaa2712a9b9c36af7784426cc9429455e
RUN wget -O knxd_0.0.5.1.tar.gz "https://github.com/knxd/knxd/archive/0.0.5.1.tar.gz" \
 && echo "$KNXD_DOWNLOAD_SHA256 knxd_0.0.5.1.tar.gz" | sha256sum -c - \
 && tar -xzf knxd_0.0.5.1.tar.gz \
 && cd knxd-0.0.5.1 && ./bootstrap.sh \
 && ./configure --enable-onlyeibd --enable-eibnetip --enable-eibnetiptunnel --disable-eibnetipserver \
    --disable-ft12 --disable-pei16 --disable-tpuart --disable-pei16s  --disable-tpuarts --disable-usb --disable-ncn5120 \
    --enable-groupcache --disable-java \
    --disable-shared --enable-static \
    --prefix=$INSTALLDIR/ --with-pth=$INSTALLDIR/ \
 && make && make install

##############
# Run environment
FROM php:7.2-apache

# Own labels
LABEL maintainer="http://www.cometvisu.org/"
LABEL org.cometvisu.version="0.11.0"
LABEL org.cometvisu.knxd.version="0.0.5.1"
# Labels according to http://label-schema.org/rc1/
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build-date=$BUILD_DATE
LABEL org.label-schema.name="CometVisu"
LABEL org.label-schema.description="The CometVisu visualistion"
LABEL org.label-schema.usage="README.md"
LABEL org.label-schema.url="http://www.cometvisu.org"
LABEL org.label-schema.vcs-url="https://github.com/CometVisu/CometVisu"
LABEL org.label-schema.vcs-ref="<...>"
LABEL org.label-schema.vendor="The CometVisu project"
LABEL org.label-schema.version="0.11.0"

# just for testing automated variables
ARG SOURCE_BRANCH
ARG SOURCE_COMMIT
ARG COMMIT_MSG
ARG DOCKER_REPO
ARG DOCKERFILE_PATH
ARG CACHE_TAG
ARG IMAGE_NAME
ARG MYTEST
LABEL test.SOURCE_BRANCH=$SOURCE_BRANCH
LABEL test.SOURCE_COMMIT=$SOURCE_COMMIT
LABEL test.COMMIT_MSG=$COMMIT_MSG
LABEL test.DOCKER_REPO=$DOCKER_REPO
LABEL test.DOCKERFILE_PATH=$DOCKERFILE_PATH
LABEL test.CACHE_TAG=$CACHE_TAG
LABEL test.IMAGE_NAME=$IMAGE_NAME
RUN MYTEST=`date`
LABEL test.test=$MYTEST

COPY --from=builder /usr/local/bin/knxd /usr/bin/knxd
COPY --from=builder /usr/local/lib/libpthsem.so.20 /usr/lib/
COPY --from=builder /usr/src/knxd-0.0.5.1/src/examples/busmonitor1 /usr/src/knxd-0.0.5.1/src/examples/vbusmonitor1 /usr/src/knxd-0.0.5.1/src/examples/vbusmonitor1time /usr/src/knxd-0.0.5.1/src/examples/vbusmonitor2 /usr/src/knxd-0.0.5.1/src/examples/groupswrite /usr/src/knxd-0.0.5.1/src/examples/groupwrite /usr/src/knxd-0.0.5.1/src/examples/groupread /usr/src/knxd-0.0.5.1/src/examples/groupreadresponse /usr/src/knxd-0.0.5.1/src/examples/groupcacheread /usr/src/knxd-0.0.5.1/src/examples/groupsocketread /usr/local/bin/
COPY --from=builder /usr/src/knxd-0.0.5.1/src/examples/eibread-cgi /usr/lib/cgi-bin/r
COPY --from=builder /usr/src/knxd-0.0.5.1/src/examples/eibwrite-cgi /usr/lib/cgi-bin/w

## The knxd port:
#EXPOSE 6720
##################

# Overwrite package default - allow index
RUN { \
    echo '<FilesMatch \.php$>'; \
    echo '\tSetHandler application/x-httpd-php'; \
    echo '</FilesMatch>'; \
    echo; \
    echo 'DirectoryIndex enabled'; \
    echo 'DirectoryIndex index.php index.html'; \
    echo; \
    echo '<Directory /var/www/>'; \
    echo '\tOptions +Indexes'; \
    echo '\tAllowOverride All'; \
    echo '</Directory>'; \
    } | tee "$APACHE_CONFDIR/conf-available/cm-docker-php.conf" \
 && a2disconf docker-php \
 && a2enconf cm-docker-php \
 && { \
    echo "#!/bin/sh"; \
    echo "echo Content-Type: text/plain"; \
    echo "echo"; \
    echo 'echo "{ \"v\":\"0.0.1\", \"s\":\"SESSION\" }"'; \
    } | tee "/usr/lib/cgi-bin/l" \
 && chmod +x /usr/lib/cgi-bin/l \
 && a2enmod cgi \
 && a2enmod headers

COPY build/ /var/www/html/

# Options - especially for development.
# DO NOT USE for running a real server!
#RUN pecl install xdebug-2.6.0 \
# && docker-php-ext-enable xdebug \
# && { \
#    echo 'xdebug.remote_enable=1'; \
#    echo 'xdebug.remote_connect_back=1'; \
#    echo 'xdebug.remote_port=9000'; \
#    echo 'display_errors=Off'; \
#    echo 'log_errors=On'; \
#    echo 'error_log=/dev/stderr'; \
#    echo 'file_uploads=On'; \
#    } | tee "/usr/local/etc/php/php.ini"
RUN { \
    echo "export LS_OPTIONS='--color=auto'"; \
    echo "eval \"`dircolors`\""; \
    echo "alias ls='ls \$LS_OPTIONS'"; \
    echo "alias ll='ls \$LS_OPTIONS -l'"; \
    echo "alias l='ls \$LS_OPTIONS -lA'"; \
    } | tee -a "/root/.bashrc"

COPY utils/docker/entrypoint /usr/local/bin/entrypoint
ENTRYPOINT ["entrypoint"]

VOLUME /var/www/html/resource/config

ENV KNX_INTERFACE iptn:172.17.0.1:3700
ENV KNX_PA 1.1.238
ENV KNXD_PARAMETERS -u -d/var/log/eibd.log -c

ENV CGI_URL_PATH /cgi-bin/
ENV BACKEND_PROXY_SOURCE ""
ENV BACKEND_PROXY_TARGET ""

# TODO:
# HEALTHCHECK

CMD ["apache2-foreground"]