const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Optimizaciones agresivas de memoria
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Configuración de minificación más agresiva
config.transformer.minifierConfig = {
  keep_fnames: false,
  mangle: {
    keep_fnames: false,
  },
  compress: {
    drop_console: true,
    drop_debugger: true,
    pure_funcs: ['console.log'],
  },
};

// Deshabilitar caché para reducir uso de memoria
config.cacheStores = [];
config.resetCache = true;

// Configuración de worker más conservadora
config.maxWorkers = 2;

// Reducir el uso de memoria durante el bundling
config.serializer = {
  ...config.serializer,
  customSerializer: undefined,
  createModuleIdFactory: undefined,
};

// Configuración de resolver más restrictiva
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.platforms = ['android', 'ios', 'native'];

// Configuración de transform más eficiente
config.transformer.enableBabelRCLookup = false;
config.transformer.enableBabelRuntime = false;

module.exports = config;
