import "react-app-polyfill/ie9";

import React from "react";

import App from "@lib/app";

import Router from "@src/.nsp/router";

const app = new App(<Router />);

if (module.hot) {
  let hmrKey;
  const hotClient = require("webpack-hot-middleware/client");
  hotClient.setOptionsAndConnect({ timeout: 1000 })
  hotClient.subscribe(e => {
    if (e.action === "bundled") {
      if (hmrKey && hmrKey !== e.hmrKey) {
        window.location.reload();
      } else {
        hmrKey = e.hmrKey;
      }
    }
  });
  app.render("app");
} else {
  app.render("app");
}
