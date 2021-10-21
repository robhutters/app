import { useEffect } from "react";
/* eslint-disable  */
export function useEffectOnlyOnce(fun) {
  return useEffect(fun, []);
}
