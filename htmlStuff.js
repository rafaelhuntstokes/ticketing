function getWelcomeScreen () {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<!-- Add icon library -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script>
		const vscode = acquireVsCodeApi();
		</script>

		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<title>Module Manager</title>
		
		<style> 
		.buttons {
			position: absolute; 
			top: 40% ;
			left: 50%;
			transform: translate(-50%, 0%);
		}
		/* Style buttons */
		.btn {
		  background-color: DodgerBlue; /* Blue background */
		  border: none; /* Remove borders */
		  color: white; /* White text */
		  padding: 12px 16px; /* Some padding */
		  font-size: 16px; /* Set a font size */
		  cursor: pointer; /* Mouse pointer on hover */
		}
		
		/* Darker background on mouse-over */
		.btn:hover {
		  background-color: RoyalBlue;
		} 
		body {
			background-color: rgb(60,99,201);}

		h1 {
			position: absolute; 
			top: 30%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: white;}
		
		.modal {
			display: none; 
			position: fixed;
			z-index: 1; 
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			overflow: auto; 
			background-color: rgb(0,0,0);
			background-color: rgba(0,0,0,0.4);
			padding-top: 60px;
		}

		.modal-content{
			background-color: #fefefe;
			margin: 5px auto; 
			border: 1px solid #888;
			width: 80%;
		}

		.close {
			position: absolute;
			right: 25px;
			top: 0;
			color: #000;
			font-size: 35px;
			font-weight: bold;
		}

		.close:hover,
		.close:focus {
			color: red;
			cursor: pointer;
		}

		.animate {
			-webkit-animation: animatezoom 0.6s;
			animation: animatezoom 0.6s
		}

		@-webkit-keyframes animatezoom {
			from {-webkit-transform: scale(0)}
			to {-webkit-transform: scale(1)}
		}

		@keyframes animatezoom {
			from {transform: scale(0)}
			to {-webkit-transform: scale(1)}
		}

		

		</style>
	</head>
	
	<body>
		<div class="buttons">
		<button class="btn" onclick="moduleAdd()"><i class="fa fa-key"></i> Admins</button>
		<button class="btn" onclick="document.getElementById('id01').style.display='block'"><i class="fa fa-user-circle"></i> TAs</button>
		<button class="btn"><i class="fa fa-graduation-cap"></i> Students</button>
		</div>

		<h1>Welcome to the Lab Ticketing System</h1>

		<script>
			function moduleAdd() {
			vscode.postMessage({command: 'modAdmin', text: "BUTTON PRESSED!"});
			};

			function taLogin() {
				var uname = document.getElementById('taUName').value;
				console.log('login value: ' + uname);
				vscode.postMessage({command: 'loginTA', userName: uname});
			};
		</script> 
		
		<div id="id01" class="modal">
			<span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Login">&times;</span>
			<form class="modal-content animate">
				<div class="container">
					<h2 style="color: rgb(60,99,201)">TA Login Portal</h2>
					<label for="uname" style="color:rgb(60,99,201)"><b>Username</b></label>
					<input type="text" placeholder="Enter Username" name="uname" id="taUName" required>
					<button class="btn" onclick="taLogin()"><i class="fa fa-bolt"></i>Login</button>
				</div>
				<div class="container" style="background-color:#f1f1f1">
					<button type="button" onclick="document.getElementById('id01').style.display='none'" class="btn"><i class="fa fa-undo"></i>Cancel</button>
				</div>
			</form>
		</div>
		
	</body>
	</html>`
};

function getModScreen () {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
		<script>
			const vscode = acquireVsCodeApi();
		
			// fetch information on the currently available modules 
			window.addEventListener('message', event => {
				var message = event.data; 
					
				switch (message.command) {
						
					case 'fillData': 
					createTAForm(message.info);
				}
			});

			function submit () {
				var Module = {
				aModuleName     : document.getElementById('name').value,
				bModuleCode     : document.getElementById('code').value,
				cModuleAdmins   : document.getElementById('admins').value,
				dModuleTAs      : [],
				eModuleStudents : document.getElementById('stud').value,
				fModuleReqType  : document.getElementById('reqType').value,
				gModuleGroups   : document.getElementById('groups').value,
				hModuleHrs      : document.getElementById('hours').value};


				vscode.postMessage({command: "newInfo", info: Module});

				//hide the module input screen, re-display add module button and current modules added  
				document.getElementById('form1').style.display = 'none';
				document.getElementById('button1').style.display = ''; 
				document.getElementById('showData').style.display ='';
				document.getElementById('back').style.display ='';
				document.getElementById('addTA').style.display = ''; 
			};

			function dispForm () {
				document.getElementById('form1').style.display = '';
				document.getElementById('button1').style.display = 'none'; 
				// hide the module table
				document.getElementById('showData').style.display = 'none'; 
				document.getElementById('back').style.display = 'none';
				document.getElementById('addTA').style.display = 'none'; 
			};

			function dispTAform (moduleData) {
				// hide other forms on the screen 
				document.getElementById('showData').style.display = 'none';
				document.getElementById('buttonBar').style.display ='none';
				document.getElementById('taForm').style.display ='';
				vscode.postMessage({command: 'fetchData'});
			};

			function hideTaForm () {
				document.getElementById('showData').style.display = '';
				document.getElementById('buttonBar').style.display ='';
				document.getElementById('taForm').style.display='none';
				var taForm = document.getElementById('taContainer');
				taForm.parentNode.removeChild(taForm);
			}
			function createTAForm(moduleData) {
				var enrollmentOptions = [];
				var form = document.getElementById('taForm');
				var container = document.createElement('div');
				container.id = 'taContainer';

				for (i in moduleData.modules){
					var modName = moduleData.modules[i].aModuleName;
					enrollmentOptions.push(modName);

					// add checkboxes for possible module enrollments
					var newLine = document.createElement('li');
					var option = document.createElement('input');
					option.setAttribute('type', 'checkbox');
					option.setAttribute('id', i+1);
					option.setAttribute('value', modName);
					option.setAttribute('name', 'modules');

					var label = document.createElement('label');
					label.setAttribute('id', i);
					label.setAttribute('for', i+1);
					label.appendChild(document.createTextNode(modName));
					newLine.appendChild(label);
					newLine.appendChild(option);
					container.appendChild(newLine);
				}

				// add a submit button
				var buttons = document.createElement('div');
				var submit = document.createElement('button');
				submit.setAttribute('id', 'submit');
				submit.setAttribute('class', 'btn fa fa-plus');
				submit.setAttribute('onclick', 'getSelected()');
				buttons.appendChild(submit);	

				// add a cancel button 
				var cancel = document.createElement('button');
				cancel.setAttribute('id', 'cancel');
				cancel.setAttribute('class', 'btn fa fa-undo');
				cancel.setAttribute('onclick', 'hideTaForm()');
				buttons.appendChild(cancel);

				container.appendChild(buttons);

				form.appendChild(container);
			};

			function getSelected () {
				var selection = document.querySelectorAll('input[name="modules"]:checked');
				var userName  = document.getElementById('taName').value; 
				var selected = [];
				selection.forEach((checkbox) => {
					selected.push(checkbox.value);
				});

				vscode.postMessage({command: "registerNew", user: userName, mods: selected});
				// handle the UI 
				hideTaForm();	
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
		.buttons {
			position: absolute; 
			top: 40% ;
			left: 50%;
			transform: translate(-50%, 0%);
		}

		/* Style buttons */
		.btn {
		  background-color: DodgerBlue; /* Blue background */
		  border: none; /* Remove borders */
		  color: white; /* White text */
		  padding: 12px 16px; /* Some padding */
		  font-size: 16px; /* Set a font size */
		  cursor: pointer; /* Mouse pointer on hover */
		}
		
		/* Darker background on mouse-over */
		.btn:hover {
		  background-color: RoyalBlue;
		} 
		body {
			background-color: rgb(60,99,201);}
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

		
		#submit {
			position: relative;
			left: 44%;
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
		
		<div class="forms" id="taForm" style="display:none">
			<ul>
				<li>
					<h3>Input new TA Username</h3>
				<li>
					<label for="name">TA Username:</label>
					<input type="text" id="taName">
				</li>
				<li>
					<h3>Select Modules for enrollment: </h3>
				</li>
			</ul>
		</div>
		
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
				<button class="btn" id="submit" onclick="submit()"><i class="fa fa-arrow-right "></i> Submit</button>
				</li>
			</ul>
		</div>

		<div id="buttonBar" class="buttons">
			<button class="btn" id="back" onclick="back()"><i class="fa fa-backward "></i> Back</button>
			<button class="btn" id="button1" onclick="dispForm()"><i class="fa fa-plus"></i> Add Module</button>
			<button class="btn" id="addTA" onclick="dispTAform()"><i class="fa fa-address-book"></i> Add TA</button> 
		</div>
		<p id="showData"></p>
		<script>
			function back(){
				vscode.postMessage({command: 'back'}); 
			} 
		</script>
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
				btn.setAttribute('class', 'btn'); 
				btn.setAttribute('type', 'button');
				btn.setAttribute('id', i); 
				btn.setAttribute('onclick', 'rmData(id)');  
				btn.innerHTML = '<i class="fa fa-minus"> Remove</i>';
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

function getTaScreen() {
	return `<!DOCTYPE html>
	<html lang="en">
		<head>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

			<style>

				/* Header/Logo Title */
				.header {
					padding: 0px;
					text-align: center;
					background: DodgerBlue;
					color: white;
					font-size: 30px;
					margin: 0px;
				}

				body {
					background-color: rgb(60,99,201);
				}
				
				table, th, td {
					border: 1px solid white;
				}

				#tableTA {
					width: 50%;
					margin: auto;
					color: white;
				}

				.button {
					background-color: DodgerBlue; /* Blue background */
		  			border: none; /* Remove borders */
		  			color: white; /* White text */
		  			padding: 12px 16px; /* Some padding */
		  			font-size: 16px; /* Set a font size */
		  			cursor: pointer; /* Mouse pointer on hover */
				} 
			</style>

			<script> 
				const vscode = acquireVsCodeApi();
				
				function makeTitle(userName) {
					// make title 
					var title = document.getElementById('titleText');
					var text = document.createTextNode("Welcome " + userName);
					
					title.appendChild(text); 

				}	
			</script>

			<div class="header" id="title">
				
				<script>
					window.addEventListener('message', event => {
						var message = event.data; 
					
						switch (message.command) {
						
							case 'title':
							// function call to generate title  
							makeTitle(message.user); 
						}
					});
				</script>

				<h1 id="titleText"></h1>
				<p>TA Management Screen</p>
	  		</div>
		
		</head>

		<body>
			<div id="enrolledContainer">
				<table id="tableTA">
					<tr>
						<th colspan="2">Enrolled Modules</th>
					</tr>
					<tr>
						<th>Module Name</th>
						<th>Request Queue</th>
					</tr>
				</table>
			</div>

			<script>
				// obtain a list of the enrolled modules and add them to the table 
				vscode.postMessage({command: 'enrollmentData'});

				// obtain response
				window.addEventListener('message', event => {
					var message = event.data; 

					// check enrollment list 
					switch (message.command) {
					case 'enroll': 
					var enrollment = message.enrollment;
					console.log('modules enrolled: ' + enrollment); 
					var number = enrollment.length; 
					if (number < 1){
						// not enrolled on anything
						var table = document.getElementById('tableTA');
						var row = table.insertRow(-1); 
						var data = document.createElement("th");
						data.setAttribute("colspan", "2");
						var text = document.createTextNode("Not enrolled on any modules.");
						data.appendChild(text);
						row.appendChild(data);
					}
					else {
						// display the modules enrolled
						for (var i in enrollment){
							var table = document.getElementById('tableTA'); 
							var row = table.insertRow(-1); 
						
							var cell = row.insertCell(-1);
							var data = document.createElement('td');
							var text = document.createTextNode(enrollment[i]);
							data.appendChild(text); 
							cell.appendChild(data); 

							// second cell 
							var queueBtn = document.createElement('button'); 
							queueBtn.innerHTML = 'Launch request queue'; 
							queueBtn.setAttribute('class','fa fa-desktop button'); 
							cell2 = row.insertCell(-1);
							cell2.appendChild(queueBtn);


						}
					}
				}

				});

				function back() {
					vscode.postMessage({command: 'back'}); 
				}
			</script>

			<div>
				<button class="button" onclick="back()"><i class="fa fa-undo"></i> Back</button>
			</div>
			
		</body>
	</html>`; 
}


// set up exports for module
module.exports = { getWelcomeScreen, getModScreen, getTaScreen };

