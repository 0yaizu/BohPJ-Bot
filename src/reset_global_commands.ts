import { REST } from "discord.js";
import { Routes } from "discord-api-types/v10";
import dotenv from "dotenv";
dotenv.config();

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN!);

// for guild-based commands
rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID ?? "0", process.env.GUILD_ID ?? "0"), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// for global commands
rest.put(Routes.applicationCommands(process.env.CLIENT_ID ?? "0"), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);