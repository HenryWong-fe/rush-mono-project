---
title: 前端测试
lang: en-US
---

## 故事背景
由于维护系统集成度较高，测试资源匮乏，如果想保证较高的上线成功率，需要引入一些自动化测试流程来降低上线事故率。

## 前端测试的种类

前端测试主要有以下这两种

* 单元测试 （Unit Test）
* 端到端测试 （e2e）

### 单测-Unit Test

存在的目的就是为了检测我们编写的工具函数，常用方法是否可靠稳定

常用的测试框架有，jest,mocha,jasmine等

### 端对端-E2e

端对端测试，是利用工具库模拟终端用户在UI界面上进行操作后，产生的交互性反馈等

常用的工具库有，Nightwatch, puppeteer等

## 项目是否适合做集成测试

思考这个问题之前，我们先思考以下几个事情：

1. 项目中是否存在公用util类，被其他类调用
2. 是否存在公共组件，被一个项目中的多个页面或多个项目使用
3. 项目已经庞大臃肿，面临重构的可能

## 测试框架选择

jest(单元测试框架)

* api较为简单，开箱即用，配置少
* 内置断言
* 有快照功能
* 完善的测试覆盖率报告
* 较为完善的官方文档

cypress(端对端测试工具)

* 文档全面
* 对操作系统有要求（须安装node环境）
* 整合了各类测试功能，适合对项目做全方位的测试


项目中较为复杂的业务模型可以使用cypress进行覆盖，确保流程的正确性
项目中较为基础的公用函数与组件可以使用jest进行测试（单元测试运行速度快）


## 安装

Jest及测试vue需要安装的依赖
``` bash
npm i jest vue-jest babel-jest @vue/test-utils -D
// 如需支持typescript
npm i ts-jest -D
```

Jest相关配置
``` javascript
// jest.config.js
module.exports = {
  rootDir: path.resolve(__dirname),
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.vue$": "vue-jest",
    "^.+\\js$": "babel-jest",
    "^.+\\.(t|j)sx?$": "ts-jest",
  },
  moduleFileExtensions: ["vue", "js", "json", "jsx", "ts", "tsx", "node"],
  moduleNameMapper: {},
  testMatch: [
    "**/tests/*.spec.ts",
    "**/__tests__/*.spec.ts",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/__tests__/**",
    "!**/node_modules/**",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["html", "text-summary"],
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
};

```



cypress
``` bash
npm i cypress -D
```



cypress相关配置
``` json
// cypress.josn
{
    "baseUrl": "http://localhost:3000",
    "fixturesFolder": "tests/e2e/fixtures",
    "integrationFolder": "tests/e2e/integration",
    "pluginsFile": "tests/e2e/plugins/index.ts",
    "screenshotsFolder": "tests/e2e/screenshots",
    "supportFile": "tests/e2e/support/index.ts",
    "videosFolder": "tests/e2e/videos"
}
```
## 注意事项
