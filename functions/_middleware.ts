/* eslint-disable import/prefer-default-export */

import isbot from 'isbot';

const domain = 'feed.ouuan.moe';
const plausibleUrl = 'https://plausible.ouuan.moe';

const trackFeeds: PagesFunction = async (context) => {
  const { request } = context;

  const sendRequest = [];

  if (/\/(feed|commits)\.(xml|atom|json)\/*$/.test(new URL(request.url).pathname)) {
    const referer = request.headers.get('Referer');
    const ua = request.headers.get('User-Agent') || 'Unknown UA';

    function trackEvent(name: string, props?: object) {
      return fetch(`${plausibleUrl}/api/event`, {
        method: 'POST',
        headers: {
          // I gave up correctly sending the client IP to Plausible
          'User-Agent': ua,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain,
          name,
          url: request.url,
          ...(referer && { referer }),
          ...(props && { props: JSON.stringify(props) }),
        }),
      });
    }

    sendRequest.push(trackEvent('pageview'));
    sendRequest.push(trackEvent('Feed', { bot: isbot.find(ua) || 'Not A Bot' }));
  }

  const response = await context.next();

  try {
    await Promise.all(sendRequest);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }

  return response;
};

export const onRequestGet = [trackFeeds];
