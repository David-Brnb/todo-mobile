const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// Cargamos la configuración base de Expo
const config = getDefaultConfig(__dirname);

// Agregamos soporte para archivos de Storybook (especialmente si usas .ondevice)
config.transformer.unstable_allowRequireContext = true;

// Aplicamos NativeWind primero
const finalConfig = withNativeWind(config, { input: "./global.css" });

// En lugar de usar withStorybook (que está fallando), vamos a exportar
// la config de NativeWind y configurar Storybook manualmente si sigue fallando
try {
  const withStorybook = require("@storybook/react-native/metro/withStorybook");
  // Intentamos ejecutarlo. Si no es función, lanzará error y entrará al catch
  module.exports = withStorybook(finalConfig);
} catch (e) {
  console.log(
    "⚠️ Falló withStorybook, usando configuración manual de respaldo...",
  );

  // Respaldo manual: Storybook básicamente necesita que Metro sepa dónde están las historias
  finalConfig.resolver.resolverMainFields.unshift("sbmodern");
  module.exports = finalConfig;
}
