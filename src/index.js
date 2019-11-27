import "react-app-polyfill/ie9";
import React from "react";
import { Client } from "@lib/client";
import "./index.less";
import App from "@src/.nsp/router";

new Client((<App />)).render();
