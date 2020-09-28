import TelClient from './client';

function init(baseurl: string = 'http://localhost:8000') {
  const client = new TelClient(baseurl);

  window.tel = (subject: string, action: string, user?: string) =>
    client.send(subject, action, user);
  window.addEventListener('click', (e) => {
    if (e.target.ariaLabel) {
      client.send(
        e.target.ariaLabel,
        e.target.nodeName.toLowerCase() + '_click'
      );
    }
  });
  client.send(window.location.href, 'page_view');
}
