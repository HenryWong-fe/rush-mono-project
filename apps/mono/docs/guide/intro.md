---
title: 指南-项目介绍
lang: en-US
---


## 开发框架

* [vue](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## Ts支持

* [typescript](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 路由管理

* [vue-router](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 数据管理

* [vuex](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 数据请求

使用vue3的composition api封装的useAxios做数据请求
原因:
1. 良好的typescript支持度
2. 封装后良好的返回结构，涵盖loading,finished等状态，满足业务需求

使用yapi-to-typescript
原因：
1. 基于yapi文档生成的type类型，无需手写接口类型
2. 良好的typescript支持（因为ide的智能提示支持，方便了后续开发过程中查找接口）

* [axios](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [yapi-to-typescript](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [@vueuse/integrations/useAxios](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 开发相关配置

* [vite](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [@vitejs/plugin-vue](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [@vitejs/plugin-vue-jsx](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [vite-plugin-components](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [vite-plugin-html](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [vite-plugin-pages](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)
* [vite-plugin-vue-layouts](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 项目文档

* [vitepress](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 第三方UI库

* [ant-design-vue](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)

## 第三方功能库

* [vuex](https://v3.vuejs.org/guide/introduction.html#what-is-vue-js)


## CSS-样式

* [Tailwind-原子化css库](https://www.tailwindcss.cn/docs)
* [postcss-预处理工具](https://www.postcss.com.cn/)
* [TailwindCSSIntelliSense-Vscode插件](https://www.tailwindcss.cn/docs/intellisense)

## lint-校验

* [eslint](https://less.bootcss.com/)
* [eslint-plugin-prettier](https://less.bootcss.com/)
* [eslint-plugin-vue](https://less.bootcss.com/)
* [prettier](https://less.bootcss.com/)
* [stylelint](https://less.bootcss.com/)
* [stylelint-config-prettier](https://less.bootcss.com/)
* [stylelint-prettier](https://less.bootcss.com/)


## test

项目使用jest+cypress来进行测试：

* [jest](https://less.bootcss.com/)
* [vue-jest](https://www.tailwindcss.cn/docs)
* [ts-jest](https://www.postcss.com.cn/)
* [@vue/test-utils](https://less.bootcss.com/)
* [cypress](https://docs.cypress.io/)

### E2e
测试工具选用: cypress

**选用原因：**

* 其webdriver的功能（自动化测试）
* 其具备相对完善的测试报告
* 偏向前端的开发体验

**测试范围：**
* 公用组件
* 公用工具函数
* 公用类

### Unit-test
测试框架选用: jest

**选用原因：**
* 拥有快照功能（减轻了从dom中读取文本信息的麻烦程度）
* 内部集成了断言库
* 文档完善且大厂维护

**测试范围：**
* 复杂的业务模型
* 项目主流程（如用户登录，购买商品，查看信息等）


## 主题变换
该项目支持主题变更


## 国际化
该项目支持国际化

