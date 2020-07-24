# ticketing README

A microsoft visual studio code extension providing a lab help-request ticketing system. Created as part of a UCL Connected Learning Internship 2020.

## Features

Currently features a 'module admin' screen, allowing the addition, removal and editing of lab courses. Data is saved in a JSON object format. Check the module_admin_screen.png for an image. 


The important files are: 

* htmlStuff.js      -- which provides the HTML code for the webview
* constructors.js   -- javascript file with the methods to add, remove and edit modules & perform first time setup of JSON """database"""
* extension.js      -- javascript file which activates extension 
* modules.txt       -- file which stores the JSON module data

## Requirements

## Extension Settings

* command Start Ticket from cmd pallet activates the extension. 

## Known Issues

Editable table cells are bugged.

## Release Notes


-----------------------------------------------------------------------------------------------------------
