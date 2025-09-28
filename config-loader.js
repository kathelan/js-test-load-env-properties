class ConfigLoader {
  static async load(file = 'env.properties') {
    console.log("Fetching config from:", file);

    const response = await fetch(file);
    const text = await response.text();

    console.log("Raw config file:", text);

    const config = {};
    text.split('\n').forEach(line => {
      line = line.trim();
      if (!line || line.startsWith('#')) return;
      const index = line.indexOf('=');
      if (index > 0) {
        const key = line.substring(0, index).trim();
        const value = line.substring(index + 1).trim();
        config[key] = value;
      }
    });

    window._ISC = window._ISC || {};
    window._ISC.envConfig = config;

    console.log("Parsed config:", config);
    return config;
  }
}
