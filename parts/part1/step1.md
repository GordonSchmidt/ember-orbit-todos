---
layout: step
title:  "Getting Started"
part: 1
step: 1
permalink: /part1/step1/
summary: "summary1"
---
# setup project folder
* `mkdir todos`
* `cd todos`

# setup environment
* choose between local installation or vagrant vm installation
* local installation
  * install nodejs, npm, phantomjs, bower and ember-cli
* vagrant VM installation
  * install vagrant and virtualbox
  * create Vagrantfile:
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
  * create vagrantProvision.sh:
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
  * `vagrant up`
  * `vagrant ssh`
  * `cd todos`

# create skeleton application with ember-cli
* `ember init`

# run skeleton application
* `ember server`
* goto http://localhost:4200
* press ctrl+c to stop server

[Preview]({{ site.baseurl }}/demos/part1/step1/)
[Source Code](https://github.com/GordonSchmidt/ember-orbit-todos/tree/p1s1)
