# Overview
This document contains a high-level technical overview of the rpibroker suit of software. The suit consists of a
set of server and client software. 

The client software is targeted for Raspberry Pi's minicomputers, but can be operated on
any device that is capable of running Docker. The focus of the client software is to:
* Create a basic Linux environment.
* Establish a reverse SSH connection with the server.

The server software is targeted for cloud VPS servers like Digital Ocean, AWS, etc. The focus of
the server software is to:
* Register incomming connections from client devices.
* Connect device *renters* with device *rentees*.
* Handle payment processing.
* Establish connection with other servers.

# Client Overview
The purpose of the client side software is to create a VPS environment similar to those hosted
by cloud companies such as Digital Ocean or AWS, but running in a contained Docker environment, and
on a small, inexpensive, distributed piece of hardware like a Raspberry Pi.

# Server Overview



![Alt text](images/testimage.jpg?raw=true "Title")