# ticketing README

A microsoft visual studio code extension providing a lab help-request ticketing system. Created as part of a UCL Connected Learning Internship 2020.

## Features

Currently features a 'module admin' screen, allowing the addition, removal and editing of lab courses. Data is saved in a JSON object format. Check the module_admin_screen.png for an image. 

* Users may click on any cell in the table to make edits easily. Press 'enter' when finished to save your changes. 
* 'Add Module' button brings up a form to add module info, e.g. name, code, admins, num students ... etc. and saves 
* Table displaying module info dynamically reloads to display new/edited/removed content 

The important files are: 

* htmlStuff.js      -- which provides the HTML code for the webview
* constructors.js   -- javascript file with the methods to add, remove and edit modules & perform first time setup of JSON """database"""
* extension.js      -- javascript file which activates extension 
* modules.txt       -- file which stores the JSON module data

## Requirements

## Extension Settings

* command Start Ticket from cmd pallet activates the extension. 

## Known and Predicted Issues

* Table scroll issues (possibly) when adding lots of modules. 
* HTML file is rife with inline javascript. Will refactor all this to a separate file / constructors soon.

## Upcoming Tasks 
* Adding more useful functionality to the module sessions. Implementing a calendar to select the date and times of lab session and save these in the ""database"".  


-----------------------------------------------------------------------------------------------------------
