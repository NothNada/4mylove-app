const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// O parâmetro 'input' deve apontar para o seu arquivo CSS global
module.exports = withNativeWind(config, { input: "./src/global.css" });
