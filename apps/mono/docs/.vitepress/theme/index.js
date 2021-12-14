import DefaultTheme from "vitepress/theme";

export default {
  ...DefaultTheme,
  // override the Layout with a wrapper component that injects the slots,
  enhanceApp({ app }) {
    // register global components
    // app.component("MyGlobalComponent" /* ... */);
  },
};
