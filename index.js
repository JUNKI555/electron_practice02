const { app, BrowserWindow, ipcMain, screen } = require('electron')
const path = require('path')

let mainWindow = null
let transparentWindow = null
let opacityWindow = null

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 300,
    backgroundColor: '#FFF',
    webPreferences: {
      preload: path.join(__dirname, 'bridge.js')
    }
  })

  mainWindow.loadFile('index.html')

  // デベロッパーツール
  // mainWindow.webContents.openDevTools()
}

// このメソッドは、Electron の初期化が完了し、
// ブラウザウインドウの作成準備ができたときに呼ばれます。
// 一部のAPIはこのイベントが発生した後にのみ利用できます。
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // macOS では、Dock アイコンのクリック時に他に開いているウインドウがない
    // 場合、アプリのウインドウを再作成するのが一般的です。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// macOS を除き、全ウインドウが閉じられたときに終了します。 ユーザーが
// Cmd + Q で明示的に終了するまで、アプリケーションとそのメニューバーを
// アクティブにするのが一般的です。
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

//----------------------------------------
// IPC通信
//----------------------------------------
ipcMain.handle('transparentMode', (event, data) => {
  const targetDisplay = screen.getDisplayNearestPoint(screen.getCursorScreenPoint())

  transparentWindow = new BrowserWindow({
    x: targetDisplay.workArea.x,
    y: targetDisplay.workArea.y,
    width: targetDisplay.workArea.width,
    height: targetDisplay.workArea.height,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'bridge.js')
    }
  })

  transparentWindow.loadFile('sub_page.html')
})

ipcMain.handle('opacityMode', (event, data) => {
  const currentCursorScreenPoint = screen.getCursorScreenPoint()
  opacityWindow = new BrowserWindow({
    x: currentCursorScreenPoint.x,
    y: currentCursorScreenPoint.y,
    width: 800,
    height: 600,
    opacity: 0.3,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'bridge.js')
    }
  })

  opacityWindow.loadFile('sub_page.html')
  opacityWindow.maximize()
})

ipcMain.handle('closeWindow', (event, data) => {
  if (transparentWindow !== null) {
    transparentWindow.close()
    transparentWindow = null
  }

  if (opacityWindow !== null) {
    opacityWindow.close()
    opacityWindow = null
  }
})

ipcMain.handle('ignoreMouseEvents', (event, data) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(true, { forward: true })
})

ipcMain.handle('handleMouseEvents', (event, data) => {
  BrowserWindow.fromWebContents(event.sender).setIgnoreMouseEvents(false)
})
