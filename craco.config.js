const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  devServer: (devServerConfig) => {
    devServerConfig.port = 3001;
    devServerConfig.headers = {
      "Access-Control-Allow-Origin": "*",
    };
    return devServerConfig;
  },
  webpack: {
    configure: (config) => {
      config.output.publicPath = "auto";
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "frontend_exercises",
          filename: "remoteEntry.js",
          exposes: {
            "./ExercisesApp": "./src/App",
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: "^19.1.0" },
            "react-dom": { singleton: true, eager: true, requiredVersion: "^19.1.0" },
          },
        })
      );
      return config;
    },
  },
};
