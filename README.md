# Industry - SSD
A React and .NET Marketing Web Application created by Athena, Tony, Albert, Crystal, Kasra. Copyright 2020.

View live demo: [https://atack-marketing.herokuapp.com/](https://atack-marketing.herokuapp.com/)

![App Demo](media/demo.gif)

## Installation
`git clone`
`cd atack-marketing`
`yarn install`

- Download Package from the Repository
- Create Appsettings.json and fill out your SQL Server Connection Information (sample in appsettings-sample.json), if you haven't created a Database in SQL now would be a good time to do so as you will need the DB name
- In Startup.cs under the section labelled "Google Authentication" fill in the "App Name" for options.Authority, ValidIssuer, and ValidAudience
- Open package console and run the command "Update-Database" to provision your SQL DB
- You may now run the API either locally or publish it to a web service like Azure, however make sure your SQL Server can be reached by your hosting provider

## Features
Admin:
- Full access privileges
- Add and manage events
- Add event organizers and vendors to events
- Manage user roles

Event Organizer:
- Add and manage vendors for events

Vendors:
- Add and manage marketing products
- View and export all subscribers for an event

Unique QR Generator:
- Created when a vendor is added to an event
- Updates automatically with changes in vendor's marketing products
  
## Technologies
- React
- .NET
- Adobe XD

## Application Prototype
[View the full prototype on Adobe XD](https://xd.adobe.com/view/8de0cde6-1fff-47b7-68f2-06945b2658b0-fbd1/)

## Web App - Admin
![picture](media/1.png)
![picture](media/2.png)
![picture](media/3.png)
![picture](media/4.png)

## Web App - Event Organizer / Vendor
![picture](media/5.png)
![picture](media/6.png)
![picture](media/7.png)

## What's Next?
- Add view filters to screens
- Edit profile details
- Downloadable export list
- Multi-selector functionality
- Upload images to events and vendors
