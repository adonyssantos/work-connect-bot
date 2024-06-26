import { Command } from '../interfaces';

const ping: Command = {
  name: 'ping',
  description: 'Show the client and API latency.',
  aliases: [],
  permissions: ['ADMINISTRATOR'],
  usage: '!ping',
  run: async (client, msg, args) => {
    const pingMessage = await msg.channel.send('Loading...');
    pingMessage
      .edit(
        `🚀 Latency is ${
          pingMessage.createdTimestamp - msg.createdTimestamp
        }ms. API Latency is ${Math.round(client.ws.ping)}ms`
      )
      .catch((error) => console.error(error));
  },
};

export default ping;
