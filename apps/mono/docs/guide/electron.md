---
title: Electron
---
![Electron](https://pic3.zhimg.com/v2-9a862c0e6f939c77dac7f6007e032207_1440w.jpg?source=172ae18b)

## 前言
**Electron，一个使用web开发技术开发桌面应用程序的平台。**

我们日常使用的桌面端应用，一般都是使用c,c++,java这样的语言来开发的，而现在我们可以通过electron用前端技术开发应用。

## 基础知识

Electron应用建立在**三大核心**与**两大进程**之上，他们是Electron的根基，因为它们，Electron才有了跨平台的特性。

### 三大核心

![Electron-base](./electron/electron-base.webp)

* **Chromium** 用于显示网页内容
* **Nodejs** 用于本地文件的操作及进程相关操作
* **Native Api** 用于操作系统中部分硬件的使用能力

### 两大进程

electron的核心分为两个部分，**主进程和渲染进程**。

![Electron-process](./electron/electron-process.png)


::: tip 主进程
用于操作系统和渲染进程的交互，其实页面与系统之间沟通的桥梁。
:::
主进程的一些能力：
1. 可以使用和系统对接的Electron Api
2. 支持NodeJs，可以在主进程中使用NodeJs的相关特性
3. 主进程可以创建多个渲染进程
4. 控制整个Electron应用的生命周期

::: tip 渲染进程
平时开发时所熟知的前端环境，只是宿主环境变了，不再是浏览器环境，而是electron给我们提供的一个node环境。
:::

渲染进程的一些能力：
1. 可以使用部分的Electron Api
2. 支持NodeJs
3. 渲染进程可以同时存在多个，多个渲染进程之间可以通信
4. 支持DOM Api
5. 支持Broswer Api

### Electron项目与web项目的一些区别

**1）多渲染进程间的通讯**

Electron中，渲染进程之间是不可以直接进行交互的，他们需要通过与主进程进行交互，由主进程进行消息的传递。

众所周知，Chromium是一个多进程架构的应用，其有一个主进程，同时，其也拥有多个渲染进程（每个tab），运行在独立的沙箱环境下，且多个渲染进程之间的内存资源是相互隔离的，所以我们通常会通过localStrage,window.postMessage等方式进行窗口间的数据通信。

Electron因为集成了Chromium，所以这样的通讯方式在Electron中同样适用，但Electron提供了更高效的通讯方式，`ipcMain`与`ipcRender`。

**2）操作本地文件**

Electron中因为集成了NodeJs，我们可以使用Nodejs的相关能力，可以使用NodeJs的fs,path，process等

**3）使用部分操作系统的能力**

在web项目中，我们受制于宿主环境，并没有更高一级的操作用户系统的能力，只能在浏览器赋予的能力范围内使用，而在Electron中，我们可以实现一些只有在原生应用中才可以实现的功能。


## 安装

### 初始化

1. 这里我们使用vue-cli来创建一个vue3的相关项目

``` zsh
vue create vue-electron-project
```

2. 通过vue-cli的一个插件**vue-cli-plugin-electron-builder**将electron集成到vue项目中去

``` zsh
yarn add electron-builder
```

3. 运行项目

``` zsh
npm run electron:serve
```

## 开发

### 配置主进程的入口文件
``` js
"use strict";

import { app, protocol, BrowserWindow } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS3_DEVTOOLS } from "electron-devtools-installer";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// 创建菜单
function createMenu() {
  const template = [
    {
      label: '测试 1',
      submenu: [
        {
          role: 'about',
        },
        {
          role: 'quit'
        }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

// 创建渲染进程

async function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

// 生命周期：当所有窗口被关闭
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 生命周期：当应用处于活动状态
app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// 当处于开发模式下时，当主进程收到退出指令时，关闭应用
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

```

### 配置多入口

``` vue.config.js
const path = require('path')
const platform = process.env.PLATFORM || 'main'
module.exports = { //多页面打包
  pages: {
    main: {
      entry: 'src/modules/main/main.ts',
      template: 'public/main.html',
      filename: 'main.html',
      title: 'Main Page'
    },
    remind: {
      entry: 'src/modules/sub/main.ts',
      template: 'public/sub.html',
      filename: 'sub.html',
      title: 'Sub Page'
    }
  },
  chainWebpack: config => {
    config.resolve.alias.set('@', path.join(__dirname, 'src/modules', platform))
    return config
  }
}
```


### 进程间通信

* 编写windowService 用于窗口相关的功能 window.js
``` js
import { app, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
// import path from "path";

export const DEFAULT_WINDOW_ARGS = {
  id: "", //唯一id
  title: "", //窗口标题
  width: "", //宽度
  height: "", //高度
  minWidth: "", //最小宽度
  minHeight: "", //最小高度
  route: "", // 页面路由URL '/manage?id=123'
  resizable: true, //是否支持调整窗口大小
  maximize: false, //是否最大化
  backgroundColor: "#eee", //窗口背景色
  data: null, //数据
  isMultiWindow: false, //是否支持多开窗口 (如果为false，当窗体存在，再次创建不会新建一个窗体 只focus显示即可，，如果为true，即使窗体存在，也可以新建一个)
  isMainWin: false, //是否主窗口(当为true时会替代当前主窗口)
  parentId: "", //父窗口id  创建父子窗口 -- 子窗口永远显示在父窗口顶部 【父窗口可以操作】
  modal: false, //模态窗口 -- 模态窗口是禁用父窗口的子窗口，创建模态窗口必须设置 parent 和 modal 选项 【父窗口不能操作】
};

export class WindowService {
  constructor() {
    this.main = null; // 当前窗口
    this.group = []; // 窗口组
    this.tray = null; // 托盘
  }
  // 配置窗口
  getConfig(opt) {
    return {
      width: opt.width,
      height: opt.height,
      // backgroundColor: "#f00",
      autoHideMenuBar: true,
      titleBarStyle: "hidden",
      resizable: true,
      minimizable: true,
      maximizable: true,
      frame: false,
      show: true,
      webPreferences: {
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION, //上下文隔离
        // nodeIntegration: true, //启用Node集成（是否完整的支持 node）
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        // devTools: false,
        webSecurity: true,
      },
    };
  }
  // 获取窗口
  getWindow(id) {
    return BrowserWindow.fromId(id);
  }
  // 获取全部窗口
  getAllWindows() {
    return BrowserWindow.getAllWindows();
  }
  // 判断窗口是否存在
  isExistWindow(args) {
    // 判断窗口是否存在
    for (let i in this.group) {
      let key = Number(i);
      if (
        this.getWindow(key) &&
        this.group[i].route === args.route &&
        !this.group[i].isMultiWindow
      ) {
        this.getWindow(key).focus();
        return;
      }
    }
  }
  // 创建窗口
  async create(args) {
    // 处理窗口创建相关参数
    let _args = Object.assign({}, DEFAULT_WINDOW_ARGS, args);
    let _option = this.getConfig({
      width: _args.width || 800,
      height: _args.height || 600,
    });
    // 判断当前窗口是否已存在
    let isWindowExist = this.isExistWindow(args);
    if (isWindowExist) return;
    // 根据参数创建窗口
    if (_option.parentId) {
      _option.parent = this.getWindow(_option.parentId);
    }
    let win = new BrowserWindow(_option);
    // 打开网址（加载页面）
    /**
     * 开发环境: http://localhost:8080
     * 正式环境: app://./index.html
     */
    let winURL;
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      let winUrl = args.route
        ? `${process.env.WEBPACK_DEV_SERVER_URL}${args.route}`
        : process.env.WEBPACK_DEV_SERVER_URL;
      console.log("winUrl", winUrl);

      await win.loadURL(winUrl);
      // winURL = args.route
      //   ? `http://localhost:8080${args.route}`
      //   : `http://localhost:8080`;
      // win.loadURL(winURL);
      // 打开开发者调试工具
      // if (!process.env.IS_TEST) win.webContents.openDevTools();
    } else {
      createProtocol("app");
      // Load the index.html when not in development
      // win.loadURL('app://./index.html')
      winURL = args.route
        ? `app://./index.html${args.route}`
        : `app://./index.html`;
      win.loadURL(winURL);
    }
  }
  // 开启监听
  listen() {
    // 关闭
    ipcMain.on("window-closed", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).close();
        if (this.group[Number(winId)]) delete this.group[Number(winId)];
      } else {
        this.closeAllWindow();
      }
    });

    // 隐藏
    ipcMain.on("window-hide", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).hide();
      } else {
        for (let i in this.group)
          if (this.group[i]) this.getWindow(Number(i)).hide();
      }
    });

    // 显示
    ipcMain.on("window-show", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).show();
      } else {
        for (let i in this.group)
          if (this.group[i]) this.getWindow(Number(i)).show();
      }
    });

    // 最小化
    ipcMain.on("window-mini", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).minimize();
      } else {
        for (let i in this.group)
          if (this.group[i]) this.getWindow(Number(i)).minimize();
      }
    });

    // 最大化
    ipcMain.on("window-max", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).maximize();
      } else {
        for (let i in this.group)
          if (this.group[i]) this.getWindow(Number(i)).maximize();
      }
    });

    // 最大化/最小化
    ipcMain.on("window-max-min-size", (event, winId) => {
      if (winId) {
        if (this.getWindow(winId).isMaximized()) {
          this.getWindow(winId).unmaximize();
        } else {
          this.getWindow(winId).maximize();
        }
      }
    });

    // 还原
    ipcMain.on("window-restore", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).restore();
      } else {
        for (let i in this.group)
          if (this.group[i]) this.getWindow(Number(i)).restore();
      }
    });

    // 重新加载
    ipcMain.on("window-reload", (event, winId) => {
      if (winId) {
        this.getWindow(Number(winId)).reload();
      } else {
        for (let i in this.group)
          if (this.group[i]) this.getWindow(Number(i)).reload();
      }
    });

    // 创建窗口
    ipcMain.on("window-new", (event, args) => this.create(args));
  }
  // 关闭所有窗口
  closeAllWindow() {
    for (let i in this.group) {
      if (this.group[i]) {
        if (this.getWindow(Number(i))) {
          this.getWindow(Number(i)).close();
        } else {
          console.log("----- app quit  -----");
          app.quit();
        }
      }
    }
  }
}
```

* 渲染进程中注册与进程交互的插件 ipc.js
``` js
// src/plugins/ipc.js
import { ipcRenderer } from "electron";

const ipcService = Object.create(null);

ipcService.install = (app) => {
  app.config.globalProperties.$ipc = {
    createWindow: (args) => {
      ipcRenderer.send("window-new", args);
    },
    closeWindow: (id) => {
      ipcRenderer.send("window-closed", id);
    },
  };
};

export default ipcService;
```

* 与主进程的通讯交互
``` js
this.$ipc.createWindow({
  title: "test",
  route: "modals/test",
  width: 640,
  height: 500,
  backgroundColor: "#f9f9f9",
  modal: true,
  resizable: false,
});
```

## 总结

electron项目的开发虽基于web开发技术，但提供了强大的跨平台能力，调用系统的能力，让我们的应用能够实现更多以往不能实现的功能，更多的技术细节还有待了解，如何实现多项目多入口并行执行，

