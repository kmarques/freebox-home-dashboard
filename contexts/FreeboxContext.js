import { createContext, useEffect, useState } from "react";
import * as fbxActions from "./actions/freebox";
import { useRouter } from "next/router";

export const FreeboxContext = createContext();

export default function FreeboxProvider({ children }) {
  const router = useRouter();
  const [configuration, setConfiguration] = useState(null);
  const [freebox, setFreebox] = useState(null);
  const actions = {
    discover: fbxActions.discover,
    connect: fbxActions.connect,
    select: (freebox) => setFreebox(freebox),
  };
  const selectors = {
    getFreeboxs: () => Object.values(configuration.freeboxs ?? {}),
  };

  useEffect(() => {
    fbxActions.loadConfiguration().then((data) => {
      setConfiguration(data);
      setFreebox(data?.freeboxs?.[data.default]);
      if (
        !data?.freeboxs?.[data.default] &&
        !["/freebox/new", "/_error"].includes(router.pathname)
      ) {
        router.push(`/freebox/new`);
      }
    });
  }, []);

  return (
    <FreeboxContext.Provider value={{ freebox, actions, selectors }}>
      {configuration === null && <div>Loading...</div>}
      {configuration && children}
    </FreeboxContext.Provider>
  );
}
