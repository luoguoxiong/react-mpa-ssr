import "react-app-polyfill/ie9";

import React from "react";

import { Client } from "@lib/client";

import Router from "@src/.nsp/router";

const app = new Client((<Router />));

app.render();
