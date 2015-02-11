---
layout: step
title:  "Getting Started"
part: 1
step: 1
permalink: /part1/step1/
summary: "Before even thinking about the content of the application you have to set up the environment and initialize a ember.js skeleton application.
At the end of this step you can use ember-cli and will have a ember.js skeleton application up and running."
---
## Setup project folder
First you have to create a folder for the application and go to that folder.
{% highlight bash %}
{% raw %}
mkdir todos
cd todos
{% endraw %}
{% endhighlight %}

## Setup environment
Now you need to install the following software packages that are required for working with this tutorial.

* nodejs
* npm
* phantomjs
* bower
* ember-cli

You can decide whether you like to install all these requirements directly onto your computer or work within a virtual maschine.
If you are working on other projects as well with the same toolchain, than you might be better off installing everything directly.
To keep your computer clean and tidy i would recomment using a virtual maschine.

### Vagrant environment
You can use vagrant to setup a virtualbox maschine. Then you only have to install the following packages on your computer.

* vagrant
* virtualbox

Then you create a file named *Vagrantfile* directly in you project folder that looks like this:
{% highlight ruby %}
# -*- mode: ruby -*-
# vi: set ft=ruby :

# global configuration
VAGRANTFILE_API_VERSION = "2"
VAGRANT_BOX = "ubuntu/trusty64"
VAGRANT_BOX_MEMORY = 512
VIRTUAL_BOX_NAME = "todos"

# only change these lines if you know what you do
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

    config.vm.box = VAGRANT_BOX
    config.vm.hostname = VIRTUAL_BOX_NAME + ".dev"

    # forward ssh requests for public keys
    config.ssh.forward_agent = true

    # network
    config.vm.network :forwarded_port, guest: 4200, host: 4200
    config.vm.network :forwarded_port, guest: 35729, host: 35729
    config.vm.synced_folder ".", "/home/vagrant/todos"

    # ensure box name
    config.vm.define VIRTUAL_BOX_NAME do |t|
    end

    # configure virtual box
    config.vm.provider :virtualbox do |vb|
        vb.name = VIRTUAL_BOX_NAME
        #vb.gui = true
        vb.customize ["modifyvm", :id, "--memory", VAGRANT_BOX_MEMORY]
    end

    # script for needed packages
    config.vm.provision :shell, :path => "vagrantProvision.sh"
end
{% endhighlight %}
This file describes the virtual maschine, its name and RAM size, port forwards you need and a basic image for the operating system. It also calls a provisioning shell script named *vagrantProvision.sh* for installing the software requirements of the tutorial.
You need to create this shell script with the following content:
{% highlight bash %}
#!/bin/bash
export DEBIAN_FRONTEND=noninteractive

# No changes required after this line
echo "Running apt-get update"
apt-get update --fix-missing >/dev/null
echo "Finished running apt-get update"

echo "Installing git"
apt-get -q -y install git-core >/dev/null
echo "Finished installing git"

echo "Installing nodejs"
apt-get -q -y install nodejs >/dev/null
ln -s /usr/bin/nodejs /usr/bin/node
echo "Finished installing nodejs"

echo "Installing npm"
apt-get -q -y install npm >/dev/null
echo "Finished installing npm"

echo "Installing ember-cli"
npm install -g ember-cli
echo "Finished installing ember-cli"

echo "Installing bower"
npm install -g bower
echo "Finished installing bower"

echo "Installing phantomjs"
npm install -g phantomjs
echo "Finished installing phantomjs"

echo "Installing libfontconfig - secret dependency of phantomjs"
apt-get -q -y install libfontconfig >/dev/null
echo "Finished installing libfontconfig"
{% endhighlight %}
You can bootup your virtual maschine now and connect to it. Your project folder will be linked into the virtual maschine at _/home/vagrant/todos_. To do so execute the following commands:
{% highlight bash %}
{% raw %}
vagrant up
vagrant ssh
cd todos
{% endraw %}
{% endhighlight %}

## Create skeleton application with ember-cli
Now that you have all the required tools at your disposal, you can user ember-cli to create an skeleton ember.js application by typing:
{% highlight bash %}
{% raw %}
ember init
{% endraw %}
{% endhighlight %}
This will create the file structure for the application (ember new) and resolve dependencies from npm and bower (ember install).

## Run skeleton application
Now you might want to know, how your application looks like. The easiest way to do so is the webserver integrated within ember-cli. You can start this server be calling:
{% highlight bash %}
{% raw %}
ember server
{% endraw %}
{% endhighlight %}
The application will be available on [http://localhost:4200](http://localhost:4200). This will also work if you're using the vagrant vm. This port will be forwarded to your host system.
You can stop the webserver by presing `ctrl+c`.

