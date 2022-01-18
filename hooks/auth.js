import fs from "fs/promises";
import { useEffect, useState } from "react";

const saveTokens = (tokens) => {
  return fs.writeFile("./data/tokens.json", JSON.stringify(tokens));
};

export default function useAuth() {
  const [tokens, setTokens] = useState(null);
  useEffect(() => {
    fs.readFile("./data/tokens.json")
      .then((data) => setTokens(JSON.parse(data)))
      .catch((err) => console.error(err) || setTokens(false));
  }, []);

  return {
    getToken: (endpoint) => tokens && tokens[endpoint],
    getTokens: () => tokens,
    getDefaultToken: () => tokens && tokens[token.default],
    setDefaultToken: async (endpoint) => {
      if (tokens) {
        tokens.default = endpoint;
        await saveTokens(tokens);
        setTokens(tokens);
      }
    },
    login: async (token) => {
      const results = tokens || {};
      results[token.endpoint] = token;
      if (!results.default) {
        results.default = token.endpoint;
      }
      await saveTokens(results);
      setTokens(results);
    },
  };
}
