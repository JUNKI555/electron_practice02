const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
    transparentMode: async (data) => await ipcRenderer.invoke('transparentMode', data),
    opacityMode: async (data) => await ipcRenderer.invoke('opacityMode', data),
    closeWindow: async (data) => await ipcRenderer.invoke('closeWindow', data),
    ignoreMouseEvents: async (data) => await ipcRenderer.invoke('ignoreMouseEvents', data),
    handleMouseEvents: async (data) => await ipcRenderer.invoke('handleMouseEvents', data),
  }
)
