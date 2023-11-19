module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [[
      'module-resolver',
      {
        alias: {
          assets: './assets',
          components: './src/components',
          modules: './src/modules',
          lib: './src/lib',
          constants: './src/constants',
          pages: './src/pages',
          hooks: './src/hooks',
          stacks: './src/stacks',
          features: './src/features',
          api: './src/api',
          context: './src/contexts',
          validators: './src/form-validators',
          languages: './src/languages',
          stores: './src/stores',
        },
      },
    ], "nativewind/babel", "react-native-reanimated/plugin",],
  };
};
