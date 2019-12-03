import "react-app-polyfill/ie9";
import React from "react";
import { Client } from "@lib/client";
import App from "@src/.nsp/router";
import "@src/styles/index.less";
new Client((<App />)).render();
