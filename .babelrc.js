module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Optimizaciones para reducir el tamaño del bundle
      ['transform-remove-console', { exclude: ['error', 'warn'] }],
    ],
  };
};
