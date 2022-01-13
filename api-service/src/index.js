import { signin, signup } from './auth';

addEventListener('fetch', (event) => event.respondWith(handleRequest(event)));

async function handleRequest(event) {
  // Get the client request.
  let req = event.request;

  let url = new URL(req.url);

  switch (url.pathname) {
    case '/signin':
      return await signin(req);
    case '/signup':
      return await signup(req);
    default:
      return new Response('The page you requested could not be found', {
        status: 404,
      });
  }
}
