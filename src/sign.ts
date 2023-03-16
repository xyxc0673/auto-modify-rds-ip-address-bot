import crypto from 'crypto';

function encode(str: string): string {
  var result = encodeURIComponent(str);

  return result
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A');
}

function canonicalize(params: Record<string, string>): string {
  return Object.keys(params)
    .sort()
    .map((key) => `${encode(key)}=${encode(params[key])}`)
    .join('&');
}

function sign(
  method: string,
  path: string,
  params: Record<string, string>,
  secret: string
): string {
  const message = `${method.toUpperCase()}&${encode(path)}&${encode(
    canonicalize(params)
  )}`;
  const key = secret + '&';

  const hmac = crypto.createHmac('sha1', key).update(message).digest('base64');

  return hmac;
}

export { sign };
