export default class TelClient {
  constructor(private readonly baseurl: string) {}

  public async send(
    subject: string,
    action: string,
    user?: string
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams();
      params.set('subject', subject);
      params.set('action', action);
      params.set('ts', new Date().toISOString());

      const url = `${this.baseurl}?${params.toString()}`;

      var xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          resolve(this.status == 200);
        }
      };
      xhttp.open('POST', url, true);
      xhttp.send();
    });
  }
}
