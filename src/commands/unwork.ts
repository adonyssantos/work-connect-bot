import { Command } from '../interfaces';
import { stopAddingHours, hasRole } from '../helpers';
import { discord } from '../config';

const command: Command = {
  name: 'unwork',
  description: 'Stop working and stop counting working hours.',
  aliases: [],
  permissions: [],
  usage: '!unwork',
  run: async (client, msg, args) => {
    const { WORKING_ROLE_ID } = discord;

    // const isWorking: Role | undefined = msg.member?.roles.cache.find(
    //   (role) => role.id === WORKING_ROLE_ID
    // );

    const isWorking = await hasRole(msg.member, WORKING_ROLE_ID).catch(
      (error) => console.error(error.message)
    );

    if (!isWorking) {
      await msg.reply("you aren't working. Use `!work` to start working.");
    } else {
      await stopAddingHours(msg.member)
        .then(() => msg.reply('you stopped working.'))
        .catch((error) => console.error(error.message));
    }
  },
};

export default command;
