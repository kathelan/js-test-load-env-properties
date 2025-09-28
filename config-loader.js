class ConfigLoader {
  static async load(file = 'env.properties') {
    const response = await fetch(file);
    const text = await response.text();

    const config = {};
    text.split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;
      const [key, value] = line.split('=');
      if (key && value) {
        config[key.trim()] = value.trim();
      }
    });

    window._ISC = window._ISC || {};
    window._ISC.envConfig = config;

    return config;
  }
}

// automatyczne ładowanie configa przy starcie każdej strony
(async () => {
  await ConfigLoader.load();
  console.log("Config loaded:", window._ISC.envConfig);
})();
