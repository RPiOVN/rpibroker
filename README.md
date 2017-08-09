# RPi Broker
RPi Broker aspires to create a marketplace offering Virtal Private Servers (VPS), similar to 
[Digital Ocean](http://digitalocean.com) or [Vultr](http://vultr.com). Instead of using a data center,
the marketplace would instead use an array of psudo-anonymous Raspberry Pi or other IoT devices. Anyone
with an internet connection and a device capable of running [Docker](https://www.docker.com/) can rent
that device in the RPi Broker marketplace.


# State of Development
Update: **8/9/17**
This project is brand new and is still in the very early stages of development. The good news is that the technology
stack needed to turn the vision into reality has already been identified. It's simply a matter of connecting the pieces
and developing a user interface.

If you are an experienced JavaScript programmer, we could use your help! 
We can reimburse developers with equity in future income.
Check out the [RPi Broker Project Page](http://rpiovn.org/project/rpi-broker)
for details on how to contribute.

* A [High Level Specification Document](specifications/SPECIFICATION.md) has been created that discusses the
technology stack and flow mechanics of how the marketplace will operate. 

* [User Experience Stories](specifications/user-experience-and-view-descriptions.md) have been developed to
capture the details of the user interface. HTML mockups for the various Views described in this document
are currently being developed.

* The core technology of this project is [Reverse SSH](https://blog.devolutions.net/2017/03/what-is-reverse-ssh-port-forwarding.html). 
A [Dockerfile](server/sshd-container/Dockerfile) 
is currently being developed to act as an SSH router to connect renters to the devices.