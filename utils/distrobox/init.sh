#!/usr/bin/env bash
set -e

if [ ! -f /root/.first_run_complete ]; then
    echo "First run setup in progress..."
    # Install grunt globally
    sudo npm install -g grunt grunt-cli
    curl -sS https://starship.rs/install.sh | sh -s -- --yes
    
    # # clean up old files to avoid permission issues
    sudo rm /var/log/apache2/* || true
    sudo rm /var/run/apache2/* || true
    
    # # apply customizations for cometvisu
    NO_ENTRYPOINT_APACHE=true NO_ENTRYPOINT_KNXD=true sudo -E /usr/local/bin/cometvisu-entrypoint > /root/init.log 2>&1
    # override healthcheck to always succeed
    echo "#!/bin/sh" > /usr/local/bin/healthcheck
    
    # change apache to listen on 8080 instead of 80 to avoid conflicts with host system
    sudo sed -i "s/^Listen 80$/Listen 8080/" /etc/apache2/ports.conf
    sudo sed -i "s/^<VirtualHost \*:80>$/<VirtualHost *:8080>/" /etc/apache2/sites-enabled/000-default.conf   
    
    sudo cp /home/cv/utils/distrobox/knxd.socket /usr/lib/systemd/system/knxd.socket

    sudo systemctl enable apache2
    sudo systemctl enable knxd    

    ln -sf /usr/bin/distrobox-host-exec /usr/local/bin/docker
    # install python dependencies
    sudo pip install -r /home/cv/utils/requirements.txt --break-system-packages
    cd /home/cv && npm run selenium
    touch /root/.first_run_complete
    echo "First run setup completed."
else
    echo "First run setup already completed. Skipping..."
fi