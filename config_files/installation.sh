#!/bin/sh
#==============================================
# INSTALLATION.SH
# Installs needed software for npm and NodeJS
#==============================================
#
#----------------------------------------------
# NPM INSTALLATION
#----------------------------------------------
sudo apt install npm
#
#----------------------------------------------
# NODEJS 14.X INSTALLATION
#----------------------------------------------
sudo apt-get install software-properties-common
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install nodejs
#
#----------------------------------------------
# VERIFY INSTALLATIONS
#----------------------------------------------
node --version
npm --version
#
# END INSTALLATION.SH
