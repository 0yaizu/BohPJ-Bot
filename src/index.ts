import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config();

import { Client, Events, GatewayIntentBits } from 'discord.js';
import {
  DiscordInteractions,
  ErrorCodes,
  InteractionsError,
} from '@akki256/discord-interaction';
import { DiscordEvents } from './modules/events';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions
	],
});

const interactions = new DiscordInteractions(client);
interactions.loadRegistries(path.resolve(__dirname, './commands'));

const events = new DiscordEvents(client);
events.register(path.resolve(__dirname, './events'));

client.once(Events.ClientReady, (): void => {
  console.log('[INFO] BOT ready!');
  interactions.registerCommands({ guildId: process.env.GUILD_ID ?? undefined });
});

client.on(Events.InteractionCreate, (interaction): void => {
  if (!interaction.isRepliable()) return;

  interactions.run(interaction).catch((err) => {
    if (
      err instanceof InteractionsError &&
      err.code === ErrorCodes.CommandHasCoolTime
    ) {
      interaction.reply({
        content: '`⌛` コマンドはクールダウン中です',
        ephemeral: true,
      });
      return;
    }
    console.log(err);
  });
});

client.login();