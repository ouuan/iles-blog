/* eslint-disable import/prefer-default-export */

import Plausible from 'plausible-tracker';

const host = 'ouuan.moe';
const plausibleUrl = 'https://plausible.ouuan.moe';

const {
  trackPageview: pageView,
} = Plausible({
  domain: host,
  apiHost: plausibleUrl,
});

function checkHost<T extends(...args: never[]) => void>(fn: T) {
  return (...args: Parameters<T>) => {
    if (window.location.host === host) {
      fn(...args);
    } else {
      // eslint-disable-next-line no-console
      console.log(fn.name, args);
    }
  };
}

export const trackPageview = checkHost(pageView);
