# electron_practice02
electron practice 02

## info
run dev

```
$ yarn install
$ yarn start
```

## memo
- fullscreen は最大化ボタン押した時のようにディスプレイを占有状態にする（Macだと個別の仮装デスクトップ扱い）
- 既存のディスプレイに最大表示するには maximize を使う
- `resizable: false` じゃないと windows では透過にならないが、 `resizable: false` だと maximize() が動かないので現在ディスプレイのサイズで BrowserWindow のサイズを指定したやる必要がある

## Reference sources
- currentWindow.maximize() doesn't truly maximize the window #19934 | Electron | GitHub
  - https://github.com/electron/electron/issues/19934#issuecomment-743248180
- How to create a non-resizable and 100% screen (not full screen) BrowserWindow | stack overflow
  - https://stackoverflow.com/a/50233775/14453038
- [Electron] contextBridge経由でIPC通信を行う | 猫の足跡R
  - https://blog.katsubemakito.net/nodejs/electron/ipc-for-contextbridge
- ElectronのContextBridge | bluepost125 | zenn
  - https://zenn.dev/bluepost/articles/80f35d0f7e8dc7
- BrowserWindow | Electron
  - https://www.electronjs.org/ja/docs/latest/api/browser-window
- screen | Electron
  - https://www.electronjs.org/ja/docs/latest/api/screen
- フレームレスウインドウ | Electron
  - https://www.electronjs.org/ja/docs/latest/api/frameless-window
