const jsC8 = require('jsc8');
const crypto = require('crypto');

const jsc8Client = new jsC8({
  url: fastly.env.get('GDN_URL'),
  apiKey: fastly.env.get('API_KEY'),
  agent: fetch,
});

export const signin = async (request) => {
  const headers = new Headers();
  try {
    const reader = request.body.getReader();
    const { done, value } = await reader.read();
    const bodyData = JSON.parse(String.fromCharCode.apply(null, value));

    const { email, password } = bodyData;

    const passwordHash = await crypto
      .createHash('sha256')
      .update(password, 'utf-8')
      .digest('hex');

    const restQlResponse = await jsc8Client.executeRestql('signIn', {
      email,
      passwordHash,
    });

    if (restQlResponse && !restQlResponse.result.length) {
      throw new Error();
    }

    headers.set('Content-Type', 'application/json');
    return new Response(restQlResponse.result, {
      status: 200,
      headers,
      url: request.url,
    });
  } catch (error) {
    headers.set('Content-Type', 'text/plain');
    return new Response('User does not exist', {
      status: 404,
      headers,
      url: request.url,
    });
  }
};
