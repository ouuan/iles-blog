import Plausible from 'plausible-tracker';

const host = 'ouuan.moe';
const plausibleUrl = 'https://plausible.ouuan.moe';

const {
  trackPageview: pageView,
  trackEvent: event,
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
export const trackEvent = checkHost(event);
