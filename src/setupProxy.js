const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api", {
      target: "https://kr.api.riotgames.com/lol/",
      changeOrigin: true,
    })
  );
};
