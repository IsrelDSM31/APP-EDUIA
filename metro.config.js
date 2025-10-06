const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Configuración mínima para reducir uso de memoria
config.maxWorkers = 1;
config.resetCache = true;

// Configuración de resolver más simple
config.resolver.platforms = ['android', 'ios'];

// Configuración de transform más básica
config.transformer.enableBabelRCLookup = false;

module.exports = config;
