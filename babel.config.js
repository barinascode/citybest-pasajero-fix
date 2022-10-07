module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          alias: {
            "@modules": "./src/modules",
            "@shared": "./src/modules/_shared",
            "@navigation": "./src/navigation",
            "@main-components": "./src/main-components",
            "@utils": "./src/modules/shared/domain/utils",
            "@assets": "./src/assets",
            "@api": "./src/api",
            "@core": "./src/core",
            "@config": ["./config.ts"],
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
