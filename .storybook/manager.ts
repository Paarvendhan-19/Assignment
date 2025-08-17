import { addons } from "@storybook/addons";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "Frontend Components Library",
  brandUrl: "https://your-repo-url.com",
  brandImage: "https://your-logo-url.com/logo.png",
});

addons.setConfig({
  theme,
});
