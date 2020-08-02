const htmlStuff = require('./htmlStuff.js');
const vscode = require('vscode');
const fs = require('fs');

function Welcome (context) {
    
    // create the welcome window 
    const screen = vscode.window.createWebviewPanel('welcome', "Lab Ticketing System",
    vscode.ViewColumn.One, {enableScripts: true}, );
        
    // read in the html for the welcome window
    screen.webview.html = htmlStuff.getWelcomeScreen();

    // handle recieving messages from the webview, which creates new screen objects depending on the button press 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'modAdmin': var admin = new ModuleAdmin(); 
    return;}}, undefined, context.subscriptions); 

    // display TA login form when TA button clicked 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'ta': screen.webview.html = htmlStuff.getTaLogin(); 
    return;}}, undefined, context.subscriptions); 

// module admin object 
function ModuleAdmin () {

    // update html to display mod admin window
    screen.webview.html = htmlStuff.getModScreen();

    // module screen attributes 
    this.moduleLists = undefined; 

    //listen for new module info 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'newInfo': this.add(message.info); 
    return;}}, undefined, context.subscriptions);

    // listen for remove module call 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'remove': this.remove(message.info); 
    return;}}, undefined, context.subscriptions);

    // listen for edit module call 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'edit': this.edit(message.info); 
    return;}}, undefined, context.subscriptions); 

    // listen for go back navigation click 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'back': screen.webview.html = htmlStuff.getWelcomeScreen(); 
    return;}}, undefined, context.subscriptions); 

    // listen for request for possible modules to enrol TA to 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'fetchData': screen.webview.postMessage({command: 'fillData', info: this.modulesList}); ; 
    return;}}, undefined, context.subscriptions); 

    // listen for call to enroll new TA 
    screen.webview.onDidReceiveMessage(message => {switch(message.command){case 'registerNew': this.register(message.user, message.mods); 
    return;}}, undefined, context.subscriptions); 

    // module screen methods to add, remove, load, save and display modules on the screen
    this.load = function loadModules () { 
        
        // check if text file with saved module list exists
        vscode.window.showInformationMessage('Loading modules . . .');

        // check if modules JSON object exists and if yes load it up
        try {
            console.log('Attempting to load modules. . .');
            var fileContent = fs.readFileSync('./modules.txt').toString();
            console.log('parsing JSON file to JS object. . .');
            var fileObj = JSON.parse(fileContent);
            console.log('Success! Modules are: ' + JSON.stringify(fileObj.modules));

            return fileObj; 
        }
        catch (e) {
            // failed to load as JSON object, so obj does not exist (first start-up)
            // create the required JSON struct required for later use 
            console.log('Failed! Creating JSON format -- first time startup --');
            var fileContent = '{"modules":[], "TAs": []}'; 
            fs.appendFileSync('modules.txt', fileContent); 
            console.log('Ready to add new modules!');

            // convert string to object in JSON format 
            fileContent = JSON.parse(fileContent); 
        } 

        return fileContent; 
    }; 
    
    this.add = function addModule (info) {

        console.log('Adding new module!'); 
        
        // push the parsed new content to the required position in JSON modules list 
        this.modulesList['modules'].push(info); 
        console.log('writing new file ...'); 

        // write updated modules list to file 
        fs.writeFileSync('./modules.txt', JSON.stringify(this.modulesList, null, ' ')); 

        // send message to webview to update the displayed table with new information 
        
        screen.webview.postMessage({command: 'drawTab', info: this.modulesList}); 

        console.log(this.modulesList);
    };

    this.edit = function editModule (info) {

        console.log('IDX of updates: ' + info[0] + info[1]); 
        // info is an array [rowId, key, updated value]
        // use index to select desired value to update 
        this.modulesList.modules[info[0]][info[1]] = info[2]; 
        
        // save updates 
        fs.writeFileSync('./modules.txt', JSON.stringify(this.modulesList, null, ' ')); 

        // redraw table 
        screen.webview.postMessage({command: 'drawTab', info: this.modulesList}); 
    }; 

    this.remove = function removeModule (info) {
        
        console.log('remove index: ' + info); 

        // remove desired module from the JSON file list
        this.modulesList.modules.splice(info, 1);

        // find which TAs are assigned and remove module from their 'enrolled' attribute
        var TAEnrolled = this.modulesList.modules[info].dModuleTAs 
        console.log('TA index to remove is: ' + TAEnrolled);
        for (var i in TAEnrolled) {
            // loop through all TAs found and remove module from their entries
            // I hate nested loops but it's the simplest method ... 
            for (var j in this.modulesList.TAs){
                if (TAEnrolled[i] == this.modulesList.TAs[j].userName){
                    // remove module from TA listing 
                    var rmvIDx = this.modulesList.TAs[j].enrolled.indexOf(this.modulesList.modules[info].aModuleName);
                    this.modulesList.TAs[j].enrolled.splice(rmvIDx,1);
                }
            } 
        } 
        console.log('length: ' + this.modulesList.modules.length);
        // update the JSON file and redraw table 
        // write updated modules list to file 
        fs.writeFileSync('./modules.txt', JSON.stringify(this.modulesList, null, ' ')); 

        // send message to webview to update the displayed table with new information 
        if (this.modulesList.modules.length < 1){
            // don't draw the table
            console.log("don't draw!");
            screen.webview.postMessage({command: 'drawTab', info: this.modulesList, draw: false});
        }
        else {
            screen.webview.postMessage({command: 'drawTab', info: this.modulesList, draw:true}); 
        }
        
        
    }; 

    this.register = function register (userName, modToAdd) {
        // check if username already exists 
        // loop through all the TAs
        var exists = 'false'; 
        console.log('Input username: ' +  userName + '\n Existing names: ' + Object.values(this.modulesList.TAs));
        for (var i in this.modulesList.TAs) {
            if (this.modulesList.TAs[i].userName == userName){
                //if yes, append module name to list 
                console.log('TA already exists!');

                // modToAdd is a list, so need to extract the values from it 
                // and push these values to the 'enrolled' key list
                for (var j in modToAdd){
                    var add = modToAdd[j]; 
                    this.modulesList.TAs[i].enrolled.push(add); 
                }
                
                exists = 'true'; 
                console.log('flag value is: ' + exists);
                break;
            }
        };
        console.log('flag value is: ' + exists);
        if (exists == 'false') {
            // create new TA profile 
            console.log('TA does not exist!');
            console.log(modToAdd);
            var newTA = {
                "userName" : userName,
                "enrolled" : modToAdd
            }; 
            console.log(this.modulesList.TAs);
            this.modulesList['TAs'].push(newTA);
            
            console.log(this.modulesList.TAs);
        }; 

        // add TA username to module object tracker as well 
        for (i in this.modulesList.modules){
            if (this.modulesList.modules[i].aModuleName == modToAdd){
                this.modulesList.modules[i].dModuleTAs.push(userName); 
            } 
        }

        // write updates to the file 
        fs.writeFileSync('./modules.txt', JSON.stringify(this.modulesList, null, ' ')); 

        // redraw the table and all that jazz 
        screen.webview.postMessage({command: 'drawTab', info: this.modulesList, draw:true}); 
    }

    // load current modules list and add contents of module file to class attributes 
    // this allows moduleList to be accessed and read from all methods 
    this.modulesList = this.load();

    // send message to webview to update the displayed table with new information 
    if (this.modulesList.modules.length < 1){
        // don't draw the table
        console.log("don't draw!");
        screen.webview.postMessage({command: 'drawTab', info: this.modulesList, draw: false});
    }
    else {
        screen.webview.postMessage({command: 'drawTab', info: this.modulesList, draw:true}); 
    }
}}

// set up exports for module 
module.exports = { Welcome }


