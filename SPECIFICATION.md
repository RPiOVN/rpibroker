# Overview
This document contains a high-level technical overview of the rpibroker suit of software. The suit consists of a
set of server and client software. 

The client software is targeted for Raspberry Pi's minicomputers, but can be operated on
any device that is capable of running Docker. The focus of the client software is to:
* Create a basic Linux environment.
* Establish a reverse SSH connection with the server, to provide a command line interface.

The server software is targeted for cloud VPS servers like Digital Ocean, AWS, etc. The focus of
the server software is to:
* Register incomming connections from client devices.
* Connect device *renters* with device *rentees*.
* Handle payment processing.
* Establish connection with other servers.

# Client Overview
The purpose of the client side software is to create a virtual private server (**VPS**) environment similar to those hosted
by cloud companies such as Digital Ocean or AWS. This is achieved on an IoT device by running a Linux command line inside
a contained Docker environment. Small, indexpensive, distributed hardware like Raspberry Pi minicomputers now posses the
computational power to host such an environment.

This setup has the following advantages:

* By running the environment in a virtual system like Docker, the device can be easily reset to a known state
when the *renter* is done using it.

* By using reverse SSH to a central server, the *rentees* can be provided with a command line interface to the device while
by-passing network firewalls. This creates network risks that *renters* need to be aware of.

* Renting out the computing power of the hardware allows hardware owners to profit from their hardware and internet connection.

* Creating distributed, semi-anonymouse VPS micro-servers has interesting legal ramifications and moves the internet towards
a more reliable, censorless architecture.


# Server Overview
The primary purpose of the server software is to orchastrate the network of devices and facilitate financial transations. 
Its secondary purpose is to connect with other servers, in order to establish a peer-to-peer (P2P) marketplace, 
with no central point of failure.

## Network Orchestration
A client device registers with a server by making an API call and passing a server-generated key. Upon recieving a valid
registration call, the server opens a new port and returns this information to the client. The client then makes a
reverse SSH connection to the new port, tunneling through any firewalls, and creating a command line interface accessible to
the renter.

At the same time, a minimal Linux shell with an SSH server is created on the server. This shell allows connection to the
command line interface via SSH (port 22), and also opens port 80 (http) and port 443 (https). A subdomain is created
on the server allowing access to these three ports. This allows clients to connect to the command line on the device and also
serve web pages and web apps.

## Financial Transactions
The first payment method for transacting device rentals will be the Paypal Contracts API. As soon as possible, 
transactions with Bitcoin, Etherium, and other cryptocurrencies will me instituted as well. Cryptocurrencies have the
advantage of allowing server owners to create semi-anonymous markets.

Renters will fill out a form to register their device, be given a key, and
then install the software on the client hardware along with the key. Rental of devices will be billed by the hour.
When a device is registered its hardware (memory, CPU, hard-drive space) will be verified. It will then be added
to the marketplace and labeled as available for rent. The renters can set the hourly rate they are willing to rent the
device for.

When a renter agrees to the rental contract, the device is taken off the market. A random username and password will
be generated and sent to the renter, and the device will be dedicated for their use. As long as the device is connected
to the internet, the renter will be billed at the hourly rate, until the stop the rental contract. At that point the device
is wiped and re-registered into the marketplace.

## Federaded Servers
Server software will be able to establish connections with other servers at the desire of the server administrator. 
This connection will allow a server to add devices to its marketplace that are managed by these third-party servers.
By creating a federation of marketplaces, the overall network has no single point of failure. 


![Alt text](images/testimage.jpg?raw=true "Title")