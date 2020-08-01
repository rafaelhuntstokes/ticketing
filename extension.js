const vscode = require('vscode'); 
const constructors = require('./constructors.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ticketing" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// my attempt at adding a fresh new custom command to the extension! Seems to be working...
	let newCommand = vscode.commands.registerCommand('ticketing.start', function () {
		vscode.window.showInformationMessage("Activating ticketing system!");
		
		// change the random working directory location to be this extension 
		process.chdir('c:/Users/Shadowbiscuit/Desktop/ticketing'); 
		//process.chdir('./Desktop/ticketing'); 
		console.log("Current working dir: " + process.cwd())

		// create instance of webview welcome screen OBJECT
		var screen = new constructors.Welcome(context);
	
	});
	context.subscriptions.push(newCommand);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
