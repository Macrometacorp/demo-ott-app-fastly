const jsC8 = require('jsc8');
const crypto = require('crypto');
const { v4: uuid } = require('uuid');

const jsc8Client = new jsC8({
  url: fastly.env.get('GDN_URL'),
  apiKey: fastly.env.get('API_KEY'),
  agent: fetch,
});

export const signup = async (request) => {
  const headers = new Headers();

  try {
    const reader = request.body.getReader();
    const { done, value } = await reader.read();
    const bodyData = JSON.parse(String.fromCharCode.apply(null, value));

    const { email, password, displayName: name } = bodyData;

    const passwordHash = await crypto
      .createHash('sha256')
      .update(password, 'utf-8')
      .digest('hex');

    const customerId = uuid();

    const restQlResponse = await jsc8Client.executeRestql('signUp', {
      email,
      passwordHash,
      customerId,
      name,
    });

    headers.set('Content-Type', 'application/json');

    return new Response(JSON.stringify(restQlResponse.result), {
      status: 200,
      headers,
      url: request.url,
    });
  } catch (error) {
    headers.set('Content-Type', 'text/plain');
    return new Response('User already exists', {
      status: 400,
      headers,
      url: request.url,
    });
  }
};
