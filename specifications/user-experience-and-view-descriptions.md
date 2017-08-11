# User Experience - Renter

High level overview:
* Renter creates and account.
* They log in and go to the Marketplace View
* The select the device they want to rent
* They make a payment
* The are taken to a client dashboard with all connection information

# User Experience - Device Owner
* Device owner creates an account and logs in.
* Clicks an 'Add Device' button to add a device to their account. This takes them through a series of prompts.
They give the device a name, describe the device stats, and recieve a registration hash.
* They are directed to instructions for flashing the SD card with an image and running the client software.
* The client software prompts for the hash then registers with the server. The client runs its own assesments of memory,
drive space, processor, and internet speed and uploads this data to the server.
* A username and pasword for the client is Docker container is generated at this time.
* The device then appears in the marketplace dashboard. Rental fees are deposited into the renters account, minus administration fees.

# View Specifications
Below are specifications and links to wire frames for each of the views.

* [Left Menu Wire Frame](https://wireframe.cc/tBL9uB)

## Dashboard View
* Shows basic account info
* Shows account balance
* Gateway to Payment View

## Marketplace View
* Lists devices available for rent.
* Lists device stats and prices. Stats like memory, processor, drive space, and internet speed.

## Payment View
* Handles paypal or bitcoin transactions
* Shows account balance

## Client Dashboard View
* shows all connection information
* Shows time-to-live with payment link for extending the lifetime of the client.

## Registered Devices View
* Allows device owner to add or remove device from the marketplace.
* Allows device owners to register new devices.