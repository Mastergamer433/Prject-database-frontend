const projectInput = document.getElementById("projectName")
const descriptionInput = document.getElementById("projectDescription")
const projectOwner = document.getElementById("projectOwner")
const projectType = document.getElementById("projectTypeInput")
const projectCoder = document.getElementById("projectCoder")
const projectFiles = document.getElementById("projectFiles")

const submitButton = document.getElementById("submit")

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

projectInput.value = urlParams.get('name');
descriptionInput.value = urlParams.get('desc')

async function submit(){
				     try {
await	axios.post('https://api.projects.kimane.se/edit', {
		id: parseInt(urlParams.get('id')),
		name: projectInput.value,
		desc: descriptionInput.value,
		type: projectType.value,
		owner: projectOwner.value,
		coder: projectCoder.value,
		file:projectFiles.value
	})
window.location.href='https://projects.kimane.se/'
						 } catch (error) {
										         console.log(error)
										      }
}

function keyHandler(e){
	console.log(e.code)
	if(e.code=="Enter"){
		submit()
	}
}

submitButton.addEventListener('click', submit)
document.addEventListener("keydown", keyHandler)
