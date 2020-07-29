function getWelcomeScreen () {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<script>
		const vscode = acquireVsCodeApi();
		</script>

		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Module Manager</title>
		
		<style> 
		body {
			background-color: rgb(60,99,201);}

		h1 {
			position: absolute; 
			top: 30%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;}
		
		

		button {
			position: absolute; 
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: rgb(51, 255, 255);
			color: rgb(51, 54, 255);
			border: border-width border-style border-color|initial|inherit;
			border-color: rgb(51, 255, 255);
		}

		</style>
	</head>
	
	<body>
		<h1>Welcome to the Lab Ticketing System</h1>

		<button onclick="moduleAdd()">Module Admin</button>
		<script>function moduleAdd() {
			vscode.postMessage({command: "alert", text: "BUTTON PRESSED!"});
			}
		</script> 
	
	</body>
	</html>`
};

function getModScreen () {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<script>
		const vscode = acquireVsCodeApi();
		</script>

		<script>
			function submit () {
				var Module = {
				aModuleName     : document.getElementById('name').value,
				bModuleCode     : document.getElementById('code').value,
				cModuleAdmins   : document.getElementById('admins').value,
				dModuleTAs      : document.getElementById('TAs').value,
				eModuleStudents : document.getElementById('stud').value,
				fModuleReqType  : document.getElementById('reqType').value,
				gModuleGroups   : document.getElementById('groups').value,
				hModuleHrs      : document.getElementById('hours').value};


				vscode.postMessage({command: "newInfo", info: Module});

				//hide the module input screen, re-display add module button and current modules added  
				document.getElementById('form1').style.display = 'none';
				document.getElementById('button1').style.display = ''; 
				document.getElementById('showData').style.display ='';
			}
		</script>

		<script>
			function dispForm () {
				document.getElementById('form1').style.display = '';
				document.getElementById('button1').style.display = 'none'; 
				// hide the module table
				document.getElementById('showData').style.display = 'none'; 
			};
		</script>

		<script>
			// create event listener for table data fetch 
			window.addEventListener('message', event => {
				var message = event.data; 
				
				switch (message.command) {
					
					case 'drawTab':
					// call drawing function and pass the JSON data  
					console.log('Message recieved: ' +  JSON.stringify(message.info)); 
					createTab(message.info, message.draw); 
				}
			});
		</script>

		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Module Manager</title>
		
		<style>
		.forms {
			/* Center the form on the page */
			
			width: 400px;
			position: absolute; 
			top: 400px;
			right: 740px;
			/* Form outline */
			padding: 0.5em;
			border: 1px solid #CCC;
			border-radius: 1em;
		}
		  
		ul {
			list-style: none;
			padding: 0;
			margin: 0;
		}
		  
		.forms li + li {
			margin-top: 1em;
		}
		  
		label {
			/* Uniform size & alignment */
			display: inline-block;
			width: 90px;
			text-align: right;
		} 
		body {
			background-color: rgb(60,99,201);}

		h1 {
			text-align: center;
			position: absolute; 
			top: 30%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;}

		#noModMsg {
			text-align: center; 
			position: absolute; 
			top: 40%; 
			left: 50%;
			transform: translate(-50%, -50%);
		}

		#button1 {
			position: absolute; 
			top: 45%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: rgb(51, 255, 255);
			color: rgb(51, 54, 255);
			border: border-width border-style border-color|initial|inherit;
			border-color: rgb(51, 255, 255);
		}
		#button2 {
			position: relative;
			left: 52%;
		}

		table {
			position: absolute; 
			top: 50%; 
			left: 31%;
			border-collapse: collapse;}
		tr { 
			border: solid;
			border-width: 1px 0;
			}
		th, td{ 
			border-left:1px solid #ccc; 
			border-right: 1px solid #ccc;
		}

		.rmBtn {
			background-color: rgb(51, 255, 255);
			color: rgb(51, 54, 255);
			border: border-width border-style border-color|initial|inherit;
			border-color: rgb(51, 255, 255);
		}
		</style>
	</head>
	
	<body>
		<h1 id="heading">Welcome to the Module Admin Screen</h1>
		
		<div class = "forms" id="form1", style="display:none">
			<ul>
				<li>
					<label for="name">Module Name:</label>
					<input type="text" id="name" name="modName">
				</li>
				<li>
					<label for="code">Module Code:</label>
					<input type="text" id="code" name="modCode">
				</li>
				<li>
					<label for="admins">Admins:</label>
					<input type="text" id="admins" name="admins">
				</li>
				<li>
					<label for="TAs">Num TAs:</label>
					<input type="text" id="TAs" name="numTa">
				</li>
				<li>
					<label for="stud">Num Students:</label>
					<input type="text" id="stud" name="numStudents">
				</li>
				<li>
					<label for="reqType">Req. Types:</label>
					<input type="text" id="reqType" name="reqTypes">
				</li>
				<li>
					<label for="groups">Groups:</label>
					<input type="text" id="groups" name="groups">
				</li>
				<li>
					<label for="hours">Lab Hrs:</label>
					<input type="text" id="hours" name="hours">
				</li>
				
				<li class="button">
				<button id="button2" type="button", onclick="submit()">Submit</button>
				</li>
			</ul>
		</div>

		<button id="button1", onclick="dispForm()">Add Module</button>
		<p id="showData"></p>
		

		<script>
		console.log('outside func call');
		function createTab (tableData, flag) {

			// create the headings of the table (fixed)
			console.log('table fun!');
			console.log('DATA sent: ' + tableData.modules);

			// check if the modules list is empty 

			if (flag == false){
				console.log('clear table');
				var tab = document.getElementById('showData');
				tab.style.display = 'none';
				var warningMessage = document.createElement('header');
				warningMessage.setAttribute('id', 'noModMsg');
				text = document.createElement('h2');
				text.textContent = 'No modules to display. Please add a new module.'; 
				warningMessage.appendChild(text);
				document.body.appendChild(warningMessage);  
				var msg = document.getElementById('noModMsg');
				msg.style.display = '';	 
			}
				
			else {
			// clear warning message 
			var msg = document.getElementById('noModMsg');
			if (msg){
				msg.parentNode.removeChild(msg);
			}

			var tabHeadings = Object.keys(tableData.modules[0]);
			tabHeadings.sort(); 
			var table = document.createElement('table'); 
			var tr = table.insertRow(-1);
			for (var i in tabHeadings) {
				var th = document.createElement('th');
				th.innerHTML = tabHeadings[i].substring(1);
				tr.appendChild(th); 
			};
			

			// for each module in the JSON data create a new row 
			// add the module data as a list element
        	for (let i in tableData.modules) {
				var trInternal = table.insertRow(-1);
				trInternal.setAttribute('id', i); 
				var rowId = document.getElementById(i); 
				console.log('set row ID');
				console.log(tableData.modules[i]);
				var keys = Object.keys(tableData.modules[i]);
 
				// populate the columns with data
				for (let j=0; j<keys.length; ++j) {
					console.log(typeof keys[j]); 
					var col = trInternal.insertCell(-1);
					col.innerHTML = tableData.modules[i][keys[j]];  
					col.setAttribute('id', j); 
					var val = keys[j];
					col.setAttribute('key', val);  
					col.setAttribute('flag', true);
					col.setAttribute('onclick', 'makeEdit(this, this.parentNode.id)');
					
				} 	
				// add remove module buttons to each row in last column
				var btnCol = trInternal.insertCell(-1); 
				var btn = document.createElement('button');
				btn.setAttribute('class', 'rmBtn'); 
				btn.setAttribute('type', 'button');
				btn.setAttribute('id', i); 
				btn.setAttribute('onclick', 'rmData(id)');  
				btn.innerHTML = 'Remove';
				btnCol.appendChild(btn); 
			
			}	

			// add extra column for the remove module button 
			var divContainer = document.getElementById('showData');
			divContainer.innerHTML = ""; 
			divContainer.appendChild(table)
			divContainer.style.display = ''; 

		}}

		function rmData (id) {
			// post message to constructors.js script to call removal function
			// of specific module object in JSON database 
			console.log(id);

			// constructors.js will remove desired entry from JSON file and then redraw the table 
			vscode.postMessage({command: "remove", info: id});

			 
		}

		function makeEdit(col, rowId){
			console.log('called function!');
			// note that js elements cannot be boolean, they're all strings ... 
			if (col.getAttribute('flag') == 'true'){
				var field = document.createElement('input'); 
				field.setAttribute("type","text");
				field.setAttribute("size","10"); 
				console.log('inside func: '+ col.innerHTML);
				field.defaultValue = col.innerHTML;

				// get rid of the table text and replace with input field 
				col.innerHTML = '';
				col.appendChild(field);

				// set a flag to stop multiple input boxes being generated 
				col.setAttribute("flag", false);

				// set event listener to wait for input to finish 
				// when user hits enter key, the new values are added 
				col.addEventListener('keypress', function(e){
					if (e.key === 'Enter'){
						console.log('enter detected!');
						// cosmetic 
						col.removeChild(field); 
						col.innerHTML = field.value;
						
						// pass the updated info to edit() function in constructors 
						vscode.postMessage({command: "edit", info: [rowId, col.getAttribute('key'), field.value]});

						// allow clickable edits again 
						col.flag = true;
					}

				
				} );

			}

			 
			
		}
		</script>
		
	</body>
	</html>`
}; 

// set up exports for module
module.exports = { getWelcomeScreen, getModScreen }
