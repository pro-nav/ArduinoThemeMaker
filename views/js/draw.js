const electron = require('electron')
const ipc = electron.ipcRenderer
// var data = 747447;

const { app } = require('electron');
let themes = [];
let buttons = [];
let selectedTheme = 0;

ipc.send('ready');
ipc.on('geThemes', (event, args) => {
    args.forEach(element => {
        themes.push(require('./themes/' + element))
    });
    init()
})

applyBtn = document.getElementsByClassName('apply')[0];
createBtn = document.getElementsByClassName('create')[0];
closeBtn = document.getElementById('closeBtn');

hint = document.getElementById('hint');

applyBtn.addEventListener('mouseover', () => {
    hint.innerText = 'Save Theme';
})
applyBtn.addEventListener('click', () => {
    ipc.send('apply', themes[selectedTheme])
})
createBtn.addEventListener('mouseover', () => {
    hint.innerText = 'Edit(NA)';
})
applyBtn.addEventListener('mouseout', () => {
    hint.innerText = '';
})
createBtn.addEventListener('mouseout', () => {
    hint.innerText = '';
})

closeBtn.addEventListener('click', () => {
    ipc.send('close')
})

closeBtn.addEventListener('mouseover', () => {
    hint.innerText = 'Close';
})

closeBtn.addEventListener('mouseout', () => {
    hint.innerText = '';
})




function updateTheme(theme) {
    document.documentElement.style.setProperty('--status-notice-fgcolor', theme['status']['notice']['fgcolor']);
    document.documentElement.style.setProperty('--status-notice-bgcolor', theme['status']['notice']['bgcolor']);
    document.documentElement.style.setProperty('--status-error-fgcolor', theme['status']['error']['fgcolor']);
    document.documentElement.style.setProperty('--status-error-bgcolor', theme['status']['error']['bgcolor']);
    document.documentElement.style.setProperty('--status-edit-fgcolor', theme['status']['edit']['fgcolor']);
    document.documentElement.style.setProperty('--status-edit-bgcolor', theme['status']['edit']['bgcolor']);
    document.documentElement.style.setProperty('--header-bgcolor', theme['header']['bgcolor']);
    document.documentElement.style.setProperty('--header-fgcolor', theme['header']['fgcolor']);
    document.documentElement.style.setProperty('--header-text-selected-color', theme['header']['text']['selected.color']);
    document.documentElement.style.setProperty('--header-text-unselected-color', theme['header']['text']['unselected.color']);
    document.documentElement.style.setProperty('--console-color', theme['console']['color']);
    document.documentElement.style.setProperty('--console-output-color', theme['console']['output.color']);
    document.documentElement.style.setProperty('--console-error-color', theme['console']['error.color']);
    document.documentElement.style.setProperty('--buttons-bgcolor', theme['buttons']['bgcolor']);
    document.documentElement.style.setProperty('--buttons-fgcolor', theme['buttons']['fgcolor']);
    document.documentElement.style.setProperty('--buttons-status-color', theme['buttons']['status']['color']);
    document.documentElement.style.setProperty('--linestatus-color', theme['linestatus']['color']);
    document.documentElement.style.setProperty('--linestatus-bgcolor', theme['linestatus']['bgcolor']);
    document.documentElement.style.setProperty('--editor-fgcolor', theme['editor']['fgcolor']);
    document.documentElement.style.setProperty('--editor-bgcolor', theme['editor']['bgcolor']);
    document.documentElement.style.setProperty('--editor-linehighlight-color', theme['editor']['linehighlight.color']);
    document.documentElement.style.setProperty('--editor-caret-color', theme['editor']['caret.color']);
    document.documentElement.style.setProperty('--editor-selection-color', theme['editor']['selection.color']);
    document.documentElement.style.setProperty('--editor-eolmarkers-color', theme['editor']['eolmarkers.color']);
    document.documentElement.style.setProperty('--editor-brackethighlight-color', theme['editor']['brackethighlight.color']);
}

function init() {
    let themeList = document.getElementById('theme-list');
    let data = '';
    let html = ['<div class="list-item"><span>', '</span><button id="', '"><i class="fas fa-angle-right"></i></button><div class="info"><br><br><span class="desc">', '</span><span class="author">', '</span></div></div>'];

    for (i in themes) {
        data = data + html[0] + themes[i]['appInfo']['name'] + html[1] + "theme" + i + html[2] + themes[i]['appInfo']['desc'] + html[3] + themes[i]['appInfo']['author'] + html[4];
        '<div class="list-item"><span>'

    }
    themeList.innerHTML = data;

    for (i in themes) {
        buttons.push(document.getElementById('theme' + i));
    }

    for (let i in buttons) {
        buttons[i].addEventListener('click', () => {
            try {
                document.getElementsByClassName('active')[0].classList.remove('active');
            }
            finally {
                buttons[i].parentElement.classList.toggle('active')
                updateTheme(themes[i])
                selectedTheme = i;
            }
        })
    }


}


ipc.on('saved', (event, args)=>{
    alert('Folder is saved at ' + args + ' .Replace the folder with Program Files\\Arduino\\lib\\theme and Enjoy the theme.')
})