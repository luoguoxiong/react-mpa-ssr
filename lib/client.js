import React from "react";
import Loadable from "nsploadable";
import { hydrate, render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Inject } from "./inject";

export class Client {
  constructor(component = null) {
    this.component = (
      <Inject initModel={{ initModel: window.__initModel__ }}>
        <BrowserRouter>{component}</BrowserRouter>
      </Inject>
    );
  }

  render() {
    window.onload = () => {
      if (module.hot) {
        let hmrKey;
        const hotClient = require("webpack-hot-middleware/client");
        hotClient.setOptionsAndConnect({ timeout: 1000, quiet: true });
        hotClient.subscribe(e => {
          if (e.action === "bundled") {
            if (hmrKey && hmrKey !== e.hmrKey) {
              window.location.reload();
            } else {
              hmrKey = e.hmrKey;
            }
          }
        });
      } else {
        Loadable.preloadReady().then(() => {
          if (module.hot) {
            hydrate(this.component, document.getElementById("app"));
          } else {
            render(this.component, document.getElementById("app"));
          }
        });
      }
    };
  }
}
