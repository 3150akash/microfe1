const { override } = require("customize-cra");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");

module.exports = override((config) => {
  config.output.publicPath = "auto";
  const deps = require("../package.json").dependencies;
  config.plugins.push(
    new ModuleFederationPlugin({
      name: "microfe1",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./Header": "./src/components/shared/Header.tsx",
        "./Footer": "./src/components/shared/Footer.tsx",
        "./BodyPlaceholder": "./src/components/shared/BodyPlaceholder.tsx",
      },
      shared: {
        ...deps,
        react: {
          eager: true,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: true,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    })
  );

  return config;
});
