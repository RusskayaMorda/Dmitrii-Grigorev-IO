/*
///////////////////////////////////////////////////////////////////////
Footer
///////////////////////////////////////////////////////////////////////
*/


const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const year = today.getFullYear();
const copywrite = document.createElement('p')
copywrite.innerHTML = `<span>RusskayaMorda</span><span>&#169</span><span>${year}</span>`;
footer.appendChild(copywrite);

/*
///////////////////////////////////////////////////////////////////////
Skills
///////////////////////////////////////////////////////////////////////
*/


const skillsList = ['JS', 'Python', 'Engineering', 'Project management'];
const skillsSection = document.getElementById('skills');
const skillsUL = skillsSection.querySelector('ul');

for (let skill of skillsList){
    let skillsItem = document.createElement('li');
    skillsItem.innerHTML = skill;
    skillsUL.appendChild(skillsItem);
}

/*
///////////////////////////////////////////////////////////////////////
Message form
///////////////////////////////////////////////////////////////////////
*/

let messageBlock = document.querySelector("[name='leaveMessage']");
let messageSection = document.getElementById("messageSection");
let messageList = messageSection.querySelector('ul');
messageSection.hidden = true;

let entryList = [];
let isEditing = false; 
let currentEntry = null;

messageBlock.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = event.target.userName.value;
    let email = event.target.userEmail.value;
    let message = event.target.userMessage.value;

    if (isEditing && currentEntry) {
        currentEntry.innerHTML = `<a href="mailto:${email}">${name}</a> <span>wrote: ${message}</span>`;
        currentEntry.appendChild(makeEditButton(currentEntry, name, email, message));
        currentEntry.appendChild(makeRemoveButton(currentEntry));

        isEditing = false;
        currentEntry = null;
    } else {
        let newMessage = document.createElement('li');
        newMessage.classList.add('message-item');
        newMessage.innerHTML = `<a href="mailto:${email}">${name}</a> <span>wrote: ${message}</span>`;

        newMessage.appendChild(makeEditButton(newMessage, name, email, message));
        newMessage.appendChild(makeRemoveButton(newMessage));

        messageList.appendChild(newMessage);
        entryList.push({ userName: name, userEmail: email, userMessage: message });

        messageSection.hidden = false;
    }

    messageBlock.reset();
});

function makeRemoveButton(entry) {
    let removeButton = document.createElement('button');
    removeButton.innerText = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-button';

    removeButton.addEventListener('click', () => {
        entry.remove();
        if (messageList.childElementCount === 0) {
            messageSection.hidden = true;
        }
    });

    return removeButton;
}

function makeEditButton(entry, name, email, message) {
    let editButton = document.createElement('button');
    editButton.innerText = 'edit';
    editButton.type = 'button';
    editButton.className = 'edit-button';

    editButton.addEventListener('click', () => {
        editButton.hidden = true;
        let removeButton = entry.querySelector('.remove-button');
        removeButton.hidden = true;

        messageBlock.userName.value = name;
        messageBlock.userEmail.value = email;
        messageBlock.userMessage.value = message;
        
        messageBlock.scrollIntoView({ behavior: 'smooth' });

        isEditing = true;
        currentEntry = entry;
    });

    return editButton;
}

const projectSection = document.getElementById('projects');
const projectList = document.createElement('ul');
projectSection.appendChild(projectList);    

fetch('https://api.github.com/users/russkayamorda/repos')
    .then((response)=>{
        if (response.ok){
            return response.json();
        } else {
            throw new Error('Failed to fetch repositories')
        }
    })
    .then ((repositories) =>{
        for (let i in repositories){
            const repo = repositories[i];
            const project = document.createElement('li');
            project.innerText = repo.name
            projectList.appendChild(project)
        };
    })
    .catch(error=>{
        console.error('Error:', error)
    })



