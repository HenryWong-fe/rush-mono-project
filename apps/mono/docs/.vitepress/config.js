module.exports = {
  repo: "vitejs/vite",
  logo: "/login-bg.png",
  docsDir: "docs",
  title: "VITE-APP_DEMO",
  themeConfig: {
    lastUpdated: "Last Updated",
    smoothScroll: true,
    nav: [
      {
        text: "指南",
        link: "/guide/intro",
        activeMatch: "^/guide/",
      },
      {
        text: "配置",
        link: "/config/intro",
        activeMatch: "^/config/",
      },
      {
        text: "插件",
        link: "/plugins/intro",
        activeMatch: "^/plugins/",
      },
      {
        text: "组件",
        link: "/components/intro",
        activeMatch: "^/components/",
      },
      {
        text: "更多内容",
        link: "/more",
        items: [
          {
            text: "项目迭代",
            link: "/more/release/index",
          },
          {
            text: "测试",
            link: "/more/test",
          },
          {
            text: "计划更新",
            link: "/more/plan",
          },
        ],
      },
    ],
    sidebar: {
      "/guide": [
        {
          text: "指南",
          children: [
            {
              text: "项目介绍",
              link: "/guide/intro",
            },
            {
              text: "项目测试",
              link: "/guide/test",
            },
            {
              text: "路由管控",
              link: "/guide/router",
            },
            {
              text: "数据管控",
              link: "/guide/store",
            },
            {
              text: "gitflow工作流",
              link: "/guide/git-flow",
            },
            {
              text: "tailwind原子样式",
              link: "/guide/tailwind",
            },
            {
              text: "lerna多包存储库管理工具",
              link: "/guide/lerna",
            },
            {
              text: "electron预研",
              link: "/guide/electron",
            },
            {
              text: "docker开发",
              link: "/guide/docker",
            },
          ],
        },
      ],
      "/more/test": [
        {
          text: "组件测试",
          children: [
            {
              text: "vue test utils",
              link: "/more/test/vue-test-utils",
            },
            {
              text: "组件编写规范",
              link: "/more/test/design-rule",
            },
          ],
        },
      ],
      "/more/plan": [
        {
          text: "发布计划",
          children: [
            {
              text: "7月发布计划",
              link: "/more/plan/july",
            },
          ],
        },
      ],
    },
  },
};
