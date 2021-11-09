import { useCallback, useEffect, useRef, useState } from 'react';


export const useIsMounted = () => {
  const isMounted = useRef(false);

  useEffect(() => {
      isMounted.current = true;
      return () => isMounted.current = false;
  }, []);

  return isMounted;
}


export const useOnKeyPress = (targetKey, onKeyDown, onKeyUp, isDebugging=false) => {
  const [isKeyDown, setIsKeyDown] = useState(false);

  const onKeyDownLocal = useCallback(e => {
    if (isDebugging) console.log("key down", e.key, e.key !== targetKey ? "- isn't triggered" : "- is triggered");
    if (e.key !== targetKey) return;
    setIsKeyDown(true);
    if (typeof onKeyDown != "function") return;
    onKeyDown(e);
  }, [onKeyDown, onKeyUp])

  const onKeyUpLocal = useCallback(e => {
    if (isDebugging) console.log("key up", e.key, e.key !== targetKey ? "- isn't triggered" : "- is triggered");
    if (e.key !== targetKey) return;
    setIsKeyDown(false);
    if (typeof onKeyUp !== "function") return;
    onKeyUp(e);
  }, [onKeyDown, onKeyUp])

  useEffect(() => {
    window.addEventListener('keydown', onKeyDownLocal);
    window.addEventListener('keyup', onKeyUpLocal);
    return () => {
      window.removeEventListener('keydown', onKeyDownLocal);
      window.removeEventListener('keyup', onKeyUpLocal);
    }
  }, [onKeyDown, onKeyUp])

  return isKeyDown;
}
