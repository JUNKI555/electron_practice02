const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    transparentMode: async (data) => await ipcRenderer.invoke('transparentMode', data),
    opacityMode: async (data) => await ipcRenderer.invoke('opacityMode', data),
  }
)
