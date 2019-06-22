
var addButton=document.getElementsByTagName("button")[0];//first button i.e ADD
var showButton=document.getElementById("btn-sh");//show/hide button
var incompShowToDo = document.getElementById('incompShowToDoList');
var compShowToDo = document.getElementById('compShowToDoList');

addButton.addEventListener("click",addToDo);

function addToDo(){
	var d = new Date();
	var getId =  d.getTime();
	var getInput = document.getElementById("in-txt").value;
	var incompletedTodo = {id: getId, todo: getInput}
	var incomptoDoList = JSON.parse(localStorage.getItem('key1'));
	incomptoDoList.push(incompletedTodo);//Array for Incomplete Todo
    localStorage.setItem('key1', JSON.stringify(incomptoDoList));
    document.getElementById("in-txt").value="";
    getToDo();
}

function getToDo(){
	if(JSON.parse(localStorage.getItem('key1'))==null){
    var incomptoDoList=[];
    localStorage.setItem('key1', JSON.stringify(incomptoDoList));} else
	var incomptoDoList = JSON.parse(localStorage.getItem('key1'));//Array for Incomplete Todo
	console.log(incomptoDoList);
	incompShowToDoList.innerHTML = ''; 
	for(var i = 0; i < incomptoDoList.length; i++){
		var id = incomptoDoList[i].id;
		var toDoText = incomptoDoList[i].todo;
		incompShowToDoList.innerHTML +=  
		/*'<li><input type="checkbox" onclick="checkevent(\''+id+'\',\''+"key1"+'\')"><label>'+toDoText+'</label>'+
				'<button class="delete" onclick="deleteToDo(\''+id+'\',\''+"key1"+'\')">Delete</button>'+
			'</li>'*/
			'<li class="list-group-item"><input type="checkbox" onclick="checkevent(\''+id+'\',\''+"key1"+'\')"><label>'+toDoText+
			'</label><button class="btn btn-outline-secondary btn-sm" type="button" id="button-addon2"onclick="deleteToDo(\''+id+'\',\''+"key1"+'\')">'
			+'Delete</button></li>'
	}
	if(JSON.parse(localStorage.getItem('key2'))==null){
		var comptoDoList=[];
		localStorage.setItem('key2', JSON.stringify(comptoDoList));
	}else
	var comptoDoList = JSON.parse(localStorage.getItem('key2'));//Array for Incomplete Todo
	console.log(comptoDoList);
	compShowToDoList.innerHTML = ''; 
	for(var i = 0; i < comptoDoList.length; i++){
		var id = comptoDoList[i].id;
		var toDoText = comptoDoList[i].todo;
		compShowToDoList.innerHTML +=  
		'<li class="list-group-item"><input type="checkbox"checked onclick="checkevent(\''+id+'\',\''+"key2"+'\')"><label>'+toDoText+
			'</label><button class="btn btn-outline-secondary btn-sm" type="button" id="button-addon2"onclick="deleteToDo(\''+id+'\',\''+"key2"+'\')">'
			+'Delete</button></li>'
	}
	showButton.addEventListener("click",showTask);
}

function deleteToDo(id,key){
		console.log(key);
		var toDoList = JSON.parse(localStorage.getItem(key));
		for(var i=0; i < toDoList.length; i++){
			if(toDoList[i].id == id){
				toDoList.splice(i,1);
			}
		}
		localStorage.setItem(key, JSON.stringify(toDoList));
		getToDo();
	}

function checkevent(id,key){
      var incomp = JSON.parse(localStorage.getItem("key1"));
      var comp= JSON.parse(localStorage.getItem("key2"));
      console.log(id);
      if(key==="key1"){
         for(var i=0; i < incomp.length; i++){
			if(incomp[i].id == id){
				comp.push(incomp[i]);
				incomp.splice(i,1);}			
			}
      }else{
      	for(var i=0; i < comp.length; i++){
			if(comp[i].id == id){
				incomp.push(comp[i]);
				comp.splice(i,1);	}			
		}     
      }
      localStorage.setItem("key1", JSON.stringify(incomp));
		localStorage.setItem("key2", JSON.stringify(comp));
		getToDo();
	}

var showTask=function(){
	if (compShowToDo.style.display === "none") {
		showButton.innerText="Hide";
    compShowToDo.style.display = "block";
  } else {
  	showButton.innerText="Show";
    compShowToDo.style.display = "none";
  }
}