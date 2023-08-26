import { useEffect, useState } from 'react';

const { electron } = window;

// eslint-disable-next-line import/prefer-default-export
export const useIPC = <T, C>(
  requestChannel: string,
  subscribeChannel: string,
  data: T,
  callback?: (C: C) => any
) => {
  const [result, setResult] = useState<C>();

  useEffect(() => {
    electron.ipcRenderer.sendMessage(requestChannel as any, data);

    electron.ipcRenderer.on(subscribeChannel as any, (response) => {
      callback && callback(response as C);
      setResult(response as C);
    });
  }, [callback, data, requestChannel, subscribeChannel]);

  return result;
};
