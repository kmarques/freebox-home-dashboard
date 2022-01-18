import { useContext } from "react";
import { FreeboxContext } from "../contexts/FreeboxContext";

export default function useFreebox() {
  const { freebox, selectors, actions } = useContext(FreeboxContext);

  return {
    freebox: freebox,
    discover: () => actions.discover(),
    connect: (f) => actions.connect(f),
  };
}
