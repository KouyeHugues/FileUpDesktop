const {app, BrowserWindow, Menu} = require('electron');
const server = require('./app');
require('./views/error.ejs')


let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 650,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadURL('http://localhost:3000')

  mainWindow.once('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.on('closed', function () {
    mainWindow = null
  })

  let receiveWindow;
  receiveWindow = new BrowserWindow({
    width: 500,
    height: 650,
    show: false,
    webPreferences: {
      nodeIntegration: true
    }
  })

  receiveWindow.loadURL('http://localhost:3000/receive')

  receiveWindow.on('closed', function () {
    receiveWindow = null
  })

  const template = [
    {
      label: 'Recevoir',
      click: function(){
          receiveWindow.show()
      }
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);

}

app.on('ready', createWindow)

app.on('resize', function(e,x,y){
  receiveWindow.setSize(x, y);
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
