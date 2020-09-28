# tel

A click and action stream tracker.

![Demo of tel](https://padfever.github.io/tel/showcase.jpg)

## Usage

There are two parts to get this running: deploying the **server** and adding the **client scripts**.

1. Fork this repository.

### Deploy Server

1. Create a bot in Telegram by following these (instructions)[https://core.telegram.org/bots#6-botfather].
2. Save the bot API key and add the following line to `packages/server/Dockerfile`:

```
ENV telegram__bot_api_key <bot api key>
```

3. Add this bot to the channel you'd like analytics messages to appear in.
4. Reveal the channel/chat ID by following these (instructions)[https://stackoverflow.com/questions/33858927/how-to-obtain-the-chat-id-of-a-private-telegram-channel].
5. Add the chat ID to the Dockerfile under `packages/server/Dockerfile`:

```
ENV telegram__channel_id <chat id>
```

6. Build and deploy the server via docker to your favorite server:

```
cd packages/server;
docker build --name clarity/server@latest .
docker run -d --name server clarity/server@latest
```

### Integrate Javascript Client

1. Build the Javascript client:

```
cd packages/client-web;
npm run build;
```

2. Copy the compiled Javascript to your static folder:

```
cd packages/client-web;
cp dist/js/index.js <path to static folder>
```

3. Include via script tag.

```
<script src="<prefix>/index.js" type="application/javascript" async></script>
```

4. Initialize the client:

```
init(<endpoint base url>)
```

5. Add the `aria-label` attribute to any button you want to track :).

### Remember to commit your changes!
