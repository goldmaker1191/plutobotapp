module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = "./server/server.js";
    config.watchOptions = { ignored: '/(node_modules|bower_components|static|assets)/' };
    console.log(config);
    options.exclude = [/(node_modules|bower_components|static|assets)/];
    return config;
  }
};
