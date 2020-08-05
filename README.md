# Introduction to Lab Ticketing System

A VSCode extension providing the basic structure for a UCL Computer Science lab ticketing system. Ultimately, the ticketing system will allow students to submit help requests to a queue, allowing teaching assistants to deal with issues in a more organised and timely fashion than a traditional "hands up" method. 

This project was completed in just 2 weeks as a UCL Connected Learning Internship during summer 2020, under the supervision of Dr Ghita Kouadri Mostefaoui (UCL Department of Computer Science). It represents the start of a much larger project, to be completed by a future intern or as a finalist project. The following skills were developed:

- fluency with Javascript 
- web design, including HTML, CSS formatting and JSON files
- understanding of message passing, event triggers, DOM element manipulation and data handling via forms
- ability to structure complex, multi-file coding projects logically  
- knowledge of Visual Studio Code extension development 

## Feature Demonstration 
![Demonstration of features](ticketing_demo.gif)

Current features: 
- **Welcome Screen**, which displays login options for: 
  1. Module Administrators 
  2. Teaching assistants 
  3. Students (unfinished)
- **Module Admin screen**, where super users may: 
  1. View the current list of module profiles, displaying the module name, code, administrators, assigned TAs, groups, request types and hours. 
  2. Remove modules from the database 
  3. Edit module names and codes by clicking on the relevant table cells 
  4. Add new modules to the database 
  5. Register new teaching assistant (TA) profiles  
  6. Table display is updated dynamically as additions/removals are made
- **TA screen**, where teaching assistants may:
  1. Login via modal pop-up using their username
  2. See a personalised list of the modules they are enrolled on  

## Installation

### Dependencies 
- [Node.js](https://nodejs.org/en/) 
- [Git](https://git-scm.com/)
- [Yeoman](https://yeoman.io/)
- [VSCode extension generator](https://www.npmjs.com/package/generator-code)

1. `git clone https://github.com/rafaelhuntstokes/ticketing.git` 
2. Open in VSCode 
3. Go to file *extension.js, line 24* and change `process.chdir('c:/Users/Shadowbiscuit/Desktop/ticketing');` to your current working directory. This is necessary to save module information in a file within the extension folder instead of wherever VSCode is installed 
4. Hit `F5` to launch **extension development host**
5. Open the command pallet (`control + shift + p`) and run command **Start Ticket**

## Extension Anatomy 

The extension was setup by using **Yeoman** to provide a scaffold, following [this tutorial](https://code.visualstudio.com/api/get-started/your-first-extension). 
The important files are: 

* htmlStuff.js      : which provides the HTML code for the webview
* constructors.js   : javascript file which contains an Object for each screen and associated methods 
* extension.js      : javascript file which activates extension 
* modules.txt       : file which stores the JSON database 

## Known and Predicted Issues

* Table scroll issues (possibly) when adding lots of modules. 
* HTML file is rife with inline javascript. Will refactor all this to a separate file / constructors soon.

## Upcoming Tasks 
* Adding more useful functionality to the module sessions. Implementing a calendar to select the date and times of lab session and save these in the ""database"".  



-----------------------------------------------------------------------------------------------------------
