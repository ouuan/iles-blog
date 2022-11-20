/* eslint-disable import/prefer-default-export */

import isbot from 'isbot';

const domain = 'feed.ouuan.moe';
const plausibleUrl = 'https://plausible.ouuan.moe';

// https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string
async function sha1(message: string) {
  const msgUint8 = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const trackFeeds: PagesFunction = async (context) => {
  const { request } = context;

  const sendRequest = [];

  if (/\/(feed|commits)\.(xml|atom|json)\/*$/.test(new URL(request.url).pathname)) {
    const referer = request.headers.get('Referer');
    const ua = request.headers.get('User-Agent') || 'Unknown UA';
    const ip = request.headers.get('CF-Connecting-IP') || 'Unknown IP';
    const hash = await sha1(`${ua}-${ip}`);

    async function trackEvent(name: string, props?: object) {
      return fetch(`${plausibleUrl}/api/event`, {
        method: 'POST',
        headers: {
          // Plausible requires a normal UA
          'User-Agent': `${isbot(ua) ? 'Mozilla/5.0 (X11; Linux x86_64; rv:107.0) Gecko/20100101 Firefox/107.0' : ua} (${hash})`,
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
