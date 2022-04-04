const projectInput = document.getElementById("projectInput")
const descriptionInput = document.getElementById("projectDescriptionInput")
const projectTypeIn = document.getElementById("projectTypeInput")
const projectOwnerInput = document.getElementById("projectOwner")
const projectCoderInput = document.getElementById("projectCoder")
const prjectPrio = document.getElementById("projectPrio")
const submitButton = document.getElementById("submit")
const getProjsButton = document.getElementById("getProjs")
const table = document.getElementById('projectTable')

let projects;

function clearTable(){
	table.innerHTML='';
}

async function submit(){
	await getProjects();
	
	if(projects.name==projectInput.value){
		projectInput.value = ""
		return;
	}
	axios.post('https://api.projects.kimane.se/add', {
		projectName: projectInput.value,
		projectDescription: descriptionInput.value,
		type: projectTypeIn.value,
		owner: projectOwnerInput.value,
		coder: projectCoderInput.value,
		prio: projectPrio.value
	})
	getProjects()
}

function keyHandler(e){
	console.log(e.code)
	if(e.code=="Enter"){
		submit()
	}
}

setInterval(getProjects, 60*1000)

function setupTable(){
	table.innerHTML='<tr><th>Id</th><th>Name</th><th>Description</th><th>Owner</th><th>Type</th><th>Coder</th><th>Prio</th><th>Files</th></tr>'
}

async function getProjects(){
	clearTable();
	setupTable();
	const res = await axios.get('https://api.projects.kimane.se/projects')
	console.log(res);
	projects = res.data;
	for(let i=0;i<res.data.length;i++){
		viewProjects(res.data[i])
	}
}
function EditButton(id,name,desc){
window.location.href = "https://projects.kimane.se/edit.html?id="+id+"&name="+name+"&desc="+desc;
}

function viewProjects(obj){
	let row = document.createElement('tr');
	let {name,desc,id,owner,type,prio,coder} = obj;
	let projectId = document.createElement('td')
	projectId.innerHTML = id
	let projectName = document.createElement('td');
	projectName.innerHTML = name
	let projectOwner = document.createElement('td');
	projectOwner.innerHTML = owner
	let projectDescription = document.createElement('td')
	projectDescription.innerHTML = desc
	let projectType = document.createElement('td')
	projectType.innerHTML = type
	let projectCoder = document.createElement('td');
	projectCoder.innerHTML = coder
	let projectPrio = document.createElement('td')
	projectPrio.innerHTML = prio
	let projectFiles = document.createElement('td')
	projectFiles.innerHTML = '<a href="https://api.projects.kimane.se/download?id='+id+'">download</a>'
	let EditBtn = document.createElement('button')
	EditBtn.innerHTML = 'Edit';
	EditBtn.addEventListener('click', ()=>EditButton(id,name,desc))
	let removeBtn = document.createElement('button')
	removeBtn.innerHTML='Remove'
	removeBtn.addEventListener('click', ()=>Remove(id))
	row.appendChild(projectId)
	row.appendChild(projectName)
	row.appendChild(projectDescription)
	row.appendChild(projectOwner)
	row.appendChild(projectType)
	row.appendChild(projectCoder)
	row.appendChild(projectPrio)
	row.appendChild(projectFiles)
	row.appendChild(EditBtn)
	row.appendChild(removeBtn)
	table.appendChild(row)
}

function Remove(id){
	axios.delete('https://api.projects.kimane.se/remove', {id:id})
}

submitButton.addEventListener('click', submit)
getProjsButton.addEventListener('click', getProjects)
document.addEventListener("keydown", keyHandler)

getProjects()
