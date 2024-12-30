module.exports = {
  stories: ["../../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  core: {
    builder: "@storybook/builder-vite",
  },
  addons: ["@storybook/addon-essentials", "@storybook/addon-links"],
};
