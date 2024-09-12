const footer = document.createElement('footer');
const body = document.querySelector('body');
body.appendChild(footer);

const today = new Date();
const year = today.getFullYear();
const copywrite = document.createElement('p')
copywrite.innerHTML = `<span>RusskayaMorda</span><span>&#169</span><span>${year}</span>`;
footer.appendChild(copywrite);

const skillsList = ['JS', 'python', 'engineering', 'project management'];
const skillsSection = document.getElementById('skills');
const skillsUL = skillsSection.querySelector('ul');

for (let skill of skillsList){
    let skillsItem = document.createElement('li');
    skillsItem.innerHTML = skill;
    skillsUL.appendChild(skillsItem);
}