import { ChatInput } from "@akki256/discord-interaction";
import { EmbedBuilder } from "discord.js";
import { ApplicationCommandOptionType, MessageFlags, SlashCommandStringOption } from "discord.js";
import Database from "better-sqlite3"
import dotenv from 'dotenv';
dotenv.config();

const list = [{name: "test", value: "test"}, {name: "test2", value: "test2"}]

const libraryDb = new Database(process.env.Library_DB ?? '');

const genreOption = libraryDb.prepare('SELECT * FROM genre_list').get();
console.log(genreOption);

const registerBook = new ChatInput(
	{
		name: 'register_book',description: '本を登録します。', options: [
			{
				name: 'book_name',
				description: '本の名前',
				required: true,
				type: ApplicationCommandOptionType.String
			},
			{
				name: 'donar',
				description: '寄贈者',
				required: true,
				type: ApplicationCommandOptionType.User
			},
			{
				name: 'genre',
				description: 'ジャンル',
				required: false,
				type: ApplicationCommandOptionType.String,
				choices: list
			}
		]
	},
	async (interaction) => {
		// サーバー外で使用された場合
		if (!interaction.inCachedGuild()) {
			await interaction.reply({ content: 'このコマンドはサーバー内でのみ使用できます', flags: MessageFlags.Ephemeral });
			return;
		}
		const embed = new EmbedBuilder()
			.setColor('#0099ff')
			.setTitle(':gift:新しい本が寄贈されました')
			.setDescription('感謝感激！！！')
			.addFields(
				{ name: '本の名前', value: interaction.options.getString('book_name') ?? "" },
				{ name: '寄贈者', value: `<@${interaction.options.getUser('donar')?.id}>` },
				{ name: 'ジャンル(カンマ区切り)', value: interaction.options.getString('genre') ?? ""},
			)
			.setFooter({ text: `${interaction.user.tag} によって登録`, iconURL: interaction.user.displayAvatarURL() })
			.setTimestamp()
		await interaction.reply({ embeds: [embed], flags: MessageFlags.Ephemeral });
		const BohPJLibrary = new Database(process.env.Library_DB ?? '');
		BohPJLibrary.prepare(`INSERT INTO book_list (title, donarId) VALUES (?, ?)`).run(interaction.options.getString('book_name') ?? "", interaction.options.getUser('donar')?.id ?? "");
		BohPJLibrary.close();
	}
)

export default [registerBook];