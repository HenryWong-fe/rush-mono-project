---
title: 原子化的样式库
lang: en-US
---
![Tailwind](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fjscoder.com%2FcoverImages%2Ftailwindcss.png&refer=http%3A%2F%2Fjscoder.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641361727&t=8f2b7e695a520b5e0e340a480891ec86)
## 前言

::: tip
相信大家在开发大型项目，如Saas-Pro，Saas-mina时，都遇到过同样的困扰，随着项目的持续更新迭代，我们的功能越来越多，页面越来越多，代码量的激增，带来的是项目包体积持续性的庞大，而CSS代码就是其中非常庞大的一块，优化CSS包体积不但能减少用户访问页面时等待的时长，也减少了我们在开发时的负担（为大量可能重复性的页面编写，而产生的大量冗余CSS代码）。
:::



原子化的CSS理念就是为了解决这样的问题而诞生的，它减少了我们编写功能类时重新写入的CSS代码，带来的是大量的单一功能类。

其实功能类在我们的开发中已经实际应用了，只是我们使用的只是很少的一部分。

styd-less-base 就是一个原子化CSS理念的工具库 （问题是，他是基于less的，从本质上来讲他有他的局限性）

而我今天要说的则是原子化CSS理念的集大成者 *Tailwind*

*Tailwind* 一个功能类优先的框架, 它就像是一个乐高积木提供商，提供了各式各样的积木类型，我们通过UI提供的设计蓝图，使用不同种类的积木来搭建出各式各样的页面模型。

## 优势

以下是我总结的一些关于Tailwind的优势点

<!-- 曾经我很不喜欢原子化的样式，因为他在编写时，会造成模板样式类过于庞大，极其影响美观性。
但是，用户是看不到这一切的，用户需要的极致的体验。 -->

#### CSS组件样式的复用与抽离

将多个原子化的css功能类组合成一个组件样式类，在多个页面中使用，降低重复的CSS代码量。


#### 对深色模式的支持

相信大家在写小程序的黑色版本时，体验到了开发深色模式的工作量。大量的样式代码是很痛苦的一件事, 如果有一种可以原生支持深色模式的CSS样式库呢？我们仅需要简简单单的加一个全局样式，所有的CSS代码都会瞬间适配深色模式，会不会感觉到来自开发者的满满暖意

#### 可定制化

可能大家会有一个疑问，我使用了tailwind的功能类，但是我们的设计标准和tailwind默认的设计标准不一致怎么办?
这一点大家就不用担心了，开发者充分的考虑了这一点，所以，所有的功能类，我们都是可以定制的,如间距，阴影, 鼠标样式等

#### IDE完美的支持

Tailwind的功能类非常非常的多，大家可能对此会有抵触情绪，因为任何东西上手都是需要学习成本的，我们需要花费大量的时间，来记忆api，才能熟练的工作中使用，这是一个脱离舒适区的东西。

为了降低学习成本，VS_CODE提供的智能提示给我们更加快速，更加无痛楚的上手的开发体验（重要的事 ，无需配置，nice）

## 开发

### 安装

``` bash
npm i tailwindcss@latest
```

由于tailwindcss不会自动添加浏览器引擎前缀到css中，所以需要依赖postcss与autoprefix来添加css前缀和支持低版本浏览器
如果你安装了postcss-preset-env,可以不需要安装autoprefixer，因为其已包含该功能

``` bash
npm i postcss@latest autoprefixer@latest -D
```

### 配置

配置主要分为几块： *theme*, *variants*, *plugins*

theme 主题：涉及到间距，颜色，媒体查询断点等

``` javascript
// tailwind.config.js
module.exports = {
  presets: [], // 预设
  purge: [], // 用于生产优化，将未使用的css剔除掉
  darkMode: false, // or 'media' or 'class'
  persets: [], // 预设：你可以创建一个多项目可以公用的基础配置,对于跨项目的设计统一化有很大的帮助（预设中包含theme,variants,plugins等的配置）
  theme: { // 这块可以自定义颜色，字体，间距，边框，断点等任何与网站样式相关的东西
    extend: {},
  },
  variants: {   // 变体：也可以称之为状态，它的作用是在样式的应用上加入状态做为前提，如 focus:bg-gray 意思是在聚焦时，背景颜色是gray，这里的foucs就是变体
    extend: {},
  },
  plugins: [], // 插件： 插件用于注册自制的样式类
  corePlugins: { // 配置核心属性
    preflight: false // 是否使用tailwind的基础样式 （类似于normalize.css会把浏览器的默认样式给处理掉）
  }
};

```

### 创建属于项目的自定义预设

自定义预设可以让我们创建出独属于这个项目的tailwind配置，我们可以在预设文件中设置颜色，插件，主题等大量客制化的内容
具体内容请参考：[Tailwind Presets]('https://www.tailwindcss.cn/docs/presets')
``` js
// tailwind.config.js
module.exports = {
  presets: [
    require('./config/tailwind-base.js')
  ],
  // ...
}
```

### 生产优化

我们在使用tailwind时，会将tailwind的所有基础功能类都导入到项目中，这样未使用的功能类都会被全量打包到生产环境，这违背了我们使用其的初衷，所以我们需要通过一些配置来去除未使用的功能类。

生产优化从几个方面来帮我们剔除不需要的样式。
#### 文件及内容

``` js
// tailwind.config.js
module.exports = {
  ...,
  purge: {
    preserveHtmlElements: true, // 设置为false将会让tailwind默认清除包含html, body, p, h1等标签的样式，不建议关闭
    layers: ['base'，'components'，'utilities'], // 清理特定的tailwind功能区块，默认会清除 base，components，utilities
    content: [ // 清除哪些文件的样式类
      './core/**/*.vue',
      './core/**/*.vue',
      './packages/**/*.vue',
      './packages/**/*.tsx',
    ]
  }
};

```

#### 核心插件

如果我们仅仅需要非常少量的功能类时，我们可以通过设置*corePlugins*来保留需要保留的功能插件

``` js
// tailwind.config.js
// 这样就将禁用除 margin 和 padding 以外的所有功能类
module.exports = {
  corePlugins: [
    'margin',
    'padding'
  ]
};

```

#### 变体
如果我们不需要响应式的版本, 通过设置variants（变体属性），这样就会减少响应式相关的类

``` js
// tailwind.config.js
module.exports = {
  variants: {
    appearance: []
  }
};

```

## 使用

为了获得最佳的开发体验，建议仅使用postcss来开发
这会带来几个好处：
- 因为css不需要被多个工具解析和处理，带来了更快的构建速度
- 因为tailwind添加了一些非标准关键字到css中，如果你使用其他的css预处理器，需要处理这些非标准关键字来达到你想要表现的样式

::: danger
如果需要在项目中使用saas, less, stylus等预处理工具，会遇到一些使用方面的问题，请阅读[说明文档](https://www.tailwindcss.cn/docs/using-with-preprocessors#sass-less-stylus)。
:::

### 使用Postcss

以下是几个在单纯使用postcss时，经常会使用的到的一些插件：
* postcsss-import 用于在css文件中导入其他css文件
* postcss-nested 嵌套式写法，有点类似于saas的写法
* postcss-nesting 嵌套式写法，遵循css nesting规范
* postcss-preset-env 添加一些还未成为标准的css特性支持,默认支持stage-2的所有css特性

其他可用到的postcss插件，请详见[Postcss repository](https://github.com/postcss/postcss/blob/main/docs/plugins.md)


#### 安装插件
``` bash
npm i postcss-import postcss-nested postcss-preset-env -D
```

#### 配置postcss
``` javascript
// postcss.config.js
module.exports = {
  plugins: {
    require('postcss-import'),
    require('tailwindcss'),
    require('postcss-nested'), // or require('postcss-nesting')
    require('autoprefixer'), // or require('postcss-preset-env')
  }
}
```

## 总结

这是一个已经相当成熟的CSS样式解决方案，提供了相当程度的可定制化能力，能够帮助我们解决项目样式文件日益庞大的问题，也能帮助我们更快速的适应深色模式，自定义主题，响应式布局等各种开发中可能会需要面对的需求，并且提供了编辑器智能提示来帮助我们解决可能存在的学习曲线陡峭的问题，是以后开发中可以尝试接入的选择项。
