import FreeboxManager from "../helpers/FreeboxManager";
import appData from "../package.json";
import https from "https";
import fs from "fs";
import os from "os";
import { createHmac } from "crypto";

const request = async ({ endpoint, method = "GET", body }) => {
  const response = await fetch(endpoint, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
    agent: new https.Agent({
      ca: fs.readFileSync(process.env.NODE_EXTRA_CA_CERTS),
    }),
  });
  if (response.status < 400) return await response.json();
  else throw await response.json();
};

export async function discover(req, res) {
  return request({ endpoint: req.body.host + "/api_version" })
    .then((data) => console.log(data) || res.status(200).json(data))
    .catch((err) => console.error(err) || res.status(500).json(err));
}

export async function login(freebox) {
  const loginData = await request({
    endpoint: freebox.endpoint + "/login",
  });
  freebox.challenge = loginData.result.challenge;
  const sessionData = await request({
    endpoint: freebox.endpoint + "/login/session/",
    method: "POST",
    body: {
      app_id: appData.name,
      password: createHmac("sha1", freebox.app_token)
        .update(freebox.challenge)
        .digest("hex"),
    },
  });
  freebox.session_token = sessionData.result.session_token;
}

export async function create(req, res) {
  const freebox = req.body;

  const authorizeData = await request({
    endpoint: freebox.endpoint + "/login/authorize/",
    method: "POST",
    body: {
      app_id: appData.name,
      app_name: appData.description,
      app_version: appData.version,
      device_name: os.hostname(),
    },
  });

  console.log(authorizeData);

  const checkAuthorizationStatus = async () => {
    const interval = setTimeout(async () => {
      const trackData = await request({
        endpoint:
          freebox.endpoint +
          "/login/authorize/" +
          authorizeData.result.track_id,
      });
      switch (trackData.result.status) {
        case "pending":
          return checkAuthorizationStatus();
        case "granted":
          const freeboxEntity = {
            ...freebox,
            app_token: authorizeData.result.app_token,
          };
          FreeboxManager.add(freeboxEntity);
          res.status(201).json(freebox);
          break;
        case "denied":
        case "timeout":
          res.status(400).json({
            code: "ECONNECT",
            status: trackData.result.status,
          });
          break;
      }
      clearTimeout(interval);
    }, 1000);
  };

  checkAuthorizationStatus();
}
