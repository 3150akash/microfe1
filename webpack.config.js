const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");
const ModuleFederationPlugin =
  require("webpack").container.ModuleFederationPlugin;
const path = require("path");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "testmicrofe1",
    projectName: "abcmicrofe",
    webpackConfigEnv,
    argv,
  });

  // Extract dependencies from package.json
  const deps = require("./package.json").dependencies;

  return merge(defaultConfig, {
    output: {
      publicPath: "auto", // Recommended for Module Federation
    },
    externals: {}, // Remove externals for Module Federation
    plugins: [
      new ModuleFederationPlugin({
        name: "microfe1", // Unique name for this microfrontend
        filename: "remoteEntry.js",
        remotes: {}, // No remotes needed as it's not consuming other microfrontends
        exposes: {
          "./Header": "./src/components/shared/Header.tsx",
          "./Footer": "./src/components/shared/Footer.tsx",
          "./BodyPlaceholder": "./src/components/shared/BodyPlaceholder.tsx",
        },
        shared: {
          ...deps,
          react: {
            eager: true,
            singleton: true, // Ensure single instance of React across microfrontends
            requiredVersion: deps.react,
            strictVersion: true, // Enforce exact React version match
            
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: deps["react-dom"],
            strictVersion: true,
          },
          "single-spa-react": {
            eager: true,
            singleton: true,
            requiredVersion: deps["single-spa-react"],
          },
        },
      }),
    ],
  });
};
