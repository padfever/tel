import nconf from 'nconf';
import * as path from 'path';

const DEFAULTS = {
  app: { scheme: 'http:', hostname: 'localhost', port: 8000 },
  telegram: {
    bot_api_key: null,
    channel_id: null,
  },
};

nconf
  .env({ separator: '__' })
  .file(process.env.CONFIG_FILE || path.join(__dirname, '..', 'config.json'))
  .defaults(DEFAULTS);

export const config = nconf;
