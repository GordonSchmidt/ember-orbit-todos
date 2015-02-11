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

