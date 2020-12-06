#!/bin/sh
#==============================================
# INSTALLATION.SH
# Installs needed software for npm and NodeJS
#==============================================
#
#----------------------------------------------
# NPM INSTALLATION
#---------------------------------------------
# npm - node package manager for NodeJS. Puts modules
# where NodeJS can find them
sudo apt install npm
#
#----------------------------------------------
# NODEJS 14.X INSTALLATION
#----------------------------------------------
# software-properties-common - scripts for easy managing of PPAs
# nodejs - open source server environment
sudo apt-get install software-properties-common
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - # gets pakage of version 14.x of nodejs from website
sudo apt-get install nodejs
#
#----------------------------------------------
# VERIFY INSTALLATIONS
#----------------------------------------------
node --version
npm --version
#
#----------------------------------------------
# INSTALL SOFTWARE DEPENDENCIES
#----------------------------------------------
# express - web framework
# socket.io - web socket framework
# moment.js - date/time formatter
npm install express socket.io moment
# nodemon - automatically restarts the server when changes are made
npm install -D nodemon
#
# END INSTALLATION.SH
