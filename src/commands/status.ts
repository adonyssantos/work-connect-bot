import { discord } from '../config';
import { hasRole } from '../helpers';
import { Command } from '../interfaces';

const command: Command = {
  name: 'status',
  description: 'Shows current status. `Working / Not working`.',
  aliases: [],
  permissions: [],
  usage: '!status [@user_mention]',
  run: async (client, msg, args) => {
    const { WORKING_ROLE_ID } = discord;

    if (!args[0]) {
      const isWorking = await hasRole(msg.member, WORKING_ROLE_ID);

      if (isWorking) {
        await msg
          .reply("you're working.")
          .catch((error) => console.error(error.message));
      } else {
        await msg
          .reply("you aren't working.")
          .catch((error) => console.error(error.message));
      }
    } else {
      // it means that the user added an argument
      const memberMention: string = args[0];

      if (memberMention.startsWith('<@&')) return;
      if (memberMention.startsWith('<@!')) {
        const isWorking = await hasRole(
          msg.mentions.members?.first(),
          WORKING_ROLE_ID
        );

        if (isWorking) {
          await msg.channel
            .send(`${memberMention} is working.`)
            .catch((error) => console.error(error.message));
        } else {
          await msg.channel
            .send(`${memberMention} isn't working.`)
            .catch((error) => console.error(error.message));
        }
      }
    }
  },
};

export default command;
