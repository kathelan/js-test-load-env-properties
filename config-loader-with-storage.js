class ConfigLoader {
  static async load(file = 'env.properties') {
    // spróbuj z cache
    const cached = sessionStorage.getItem("envConfig");
    if (cached) {
      window._ISC = window._ISC || {};
      window._ISC.envConfig = JSON.parse(cached);
      return window._ISC.envConfig;
    }

    // jeśli brak cache, pobierz z serwera
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
    sessionStorage.setItem("envConfig", JSON.stringify(config));

    return config;
  }
}

// auto-init
(async () => {
  await ConfigLoader.load();
  console.log("Config loaded:", window._ISC.envConfig);
})();
