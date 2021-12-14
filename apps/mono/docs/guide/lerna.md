---
title: Monorepo----多项目代码管理方式
lang: en-US
---

## 介绍

lerna是一个管理工具，用于管理多个软件包的javascript项目。

基于lerna的多包管理架构的优势在于：
* 组件级别的解耦，组件可单独版本控制，每个组件有自己的版本记录，可追溯
* 组件单独发布，支持灰度，版本回滚以及平滑升降级
* 按需引用，用户安装具体某个组件包，无需配置极客实现按需加载的效果
* 关注点分离，降低大型复杂度，组件之间依赖清晰且课控
* 单一职责原则，降低多人开发时的困难，提升多人参与度

## 安装

``` bash
npm i -g lerna
```

## 使用