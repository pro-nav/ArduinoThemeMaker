const electron = require("electron");
const url = require('url');
const path = require('path');
const fs = require('fs');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

const { app, BrowserWindow } = electron;

let mainWindow;
let themes;

const directoryPath = path.join(__dirname, 'views', 'js', 'themes');
fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    themes = files;
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({ minWidth: 1024, minHeight: 720, frame: false, titleBarStyle: 'hidden', webPreferences: { nodeIntegration: true } });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views', 'editor.html'),
        protocol: 'file:',
        slashes: true
    }));
    // mainWindow.webContents.openDevTools();
});

app.on('closed', () => {
    app = null;
});

ipc.on('sendata', function (event, args) {
    console.log(args);
})
ipc.on('close', function () {
    app.quit();
})
ipc.on('ready', function (event) {
    event.sender.send('geThemes', themes);
})
ipc.on('apply', function (event, args) {
    var savePath = dialog.showOpenDialogSync({ properties: ['openDirectory'], title: 'Choose Arduino IDE location'})
    //   console.log(savePath)
    if (savePath !== undefined) {
        applyTheme(args, savePath[0]);
    }
    event.sender.send('saved', savePath[0])
})


function saveTxt(json) {
    const txtPath = path.join(__dirname, 'views', 'svg', 'tempfix.txt');
    var p = fs.readFileSync(txtPath, 'utf8') + '\n'

    for (x in json) {
        for (y in json[x]) {
            if (typeof (json[x][y]) !== "object") {
                p = p + (x + "." + y + " = " + json[x][y]) + "\n"
            }
            else {
                for (z in json[x][y]) {
                    p = p + (x + "." + y + "." + z + " = " + json[x][y][z]) + "\n"
                    if (typeof (json[x][y]) !== "object")
                        break;
                }
            }
        }
    }

    return p;
}

function applyTheme(selectedTheme, saveDir) {
    saveDir = saveDir + '\\theme\\'
    const svgPath = path.join(__dirname, 'views', 'svg', 'icons.psudo');
    const xmlPath = path.join(__dirname, 'views', 'svg', 'deafult.xml');
    const filenames = ['buttons.svg', 'tab-sel-left.svg', 'tab-sel-mid.svg', 'tab-sel-right.svg', 'tab-sel-menu.svg', 'tab-unsel-left.svg', 'tab-unsel-mid.svg', 'tab-unsel-right.svg', 'tab-unsel-menu.svg']

    var svg = fs.readFileSync(svgPath, 'utf8')

    var _btnFG = selectedTheme['buttons']['bgcolor']
    var _btnBG = selectedTheme['buttons']['fgcolor']
    var _btnNotBG = selectedTheme['buttons']['fgcolor']
    var _btnNotFG = selectedTheme['editor']['bgcolor']
    var _btnHovBG = selectedTheme['status']['notice']['bgcolor']
    var _editorBG = selectedTheme['editor']['bgcolor']
    var _headerFG = selectedTheme['header']['fgcolor']

    // console.log(_btnNotBG)
    // console.log(_btnNotFG)
    // console.log(_btnHovBG)

    svg = svg.replace(/_btnFG/g, _btnFG);
    svg = svg.replace(/_btnBG/g, _btnBG);
    svg = svg.replace(/_btnNotBG/g, _btnNotBG);
    svg = svg.replace(/_btnNotFG/g, _btnNotFG);
    svg = svg.replace(/_btnHovBG/g, _btnHovBG);
    svg = svg.replace(/_editorBG/g, _editorBG);
    svg = svg.replace(/_headerFG/g, _headerFG);


    var a = svg.split('|');

    fs.mkdirSync(saveDir, { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });
    fs.mkdirSync(saveDir + 'syntax\\', { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    })
    fs.writeFile(saveDir + 'syntax\\' + 'default.xml', fs.readFileSync(xmlPath, 'utf8'), (err) => {
        if (err) throw err;
    })

    fs.writeFile(saveDir + 'theme.txt', saveTxt(selectedTheme), (err) => {
        if (err) throw err;
    })

    for (let i = 0; i < 10; i++) {
        fs.writeFile(saveDir + filenames[i], a[i], (err) => {
            if (err) throw err;
        })
    }
    console.log('done');
}