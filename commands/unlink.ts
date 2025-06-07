import { IBot } from "@/interfaces";
import IsAuthorizedToRunCommand from "@/lib/IsAuthorizedToRunCommand";
import { SlashCommand } from "@/types";
import { DiscordUserWithCompany } from "@/types/DiscordUser";
import { SlashCommandBuilder, Interaction } from "discord.js";

const UnlinkCompanyCommand:SlashCommand = {
    name: 'unlink',
    description: 'Unlink your discord user from an OnAir company.',
    roleName: 'member',
    help:  {
        name: 'unlink',
        description: 'Usage: `/unlink `\n\nExample: `/unlink`',
        params: [

        ]
    },
    data: new SlashCommandBuilder()
        .setName('unlink')
        .setDescription('Unlink your discord user from an OnAir company.'),
    async execute(interaction:Interaction, app:IBot):Promise<void> {
        if (!interaction.isChatInputCommand()) return;

        if (!IsAuthorizedToRunCommand(this, interaction, app)) {
            await interaction.reply({ content: 'You are not authorized to run this command', ephemeral: true });
            return;
        }

        // first check if the discord user exists
        let discordUser: DiscordUserWithCompany|null = await app.DB.DiscordUserRepo.findOneByDiscordId(interaction.user.id);

        // if the discord user exists and has a company id, then they have already linked their company. Abort the command.
        if (!discordUser) {
            await interaction.reply({ content: `Discord user not found. Please contact an administrator.` });
            return;
        } else if (!discordUser.CompanyId) {
            await interaction.reply({ content: `You have not linked your company.` });
            return;
        }

        // delete the discord user
        await app.DB.DiscordUserRepo.deleteByDiscordId(interaction.user.id);

        // remove the company from the discord user
        await app.DB.CompanyRepo.update({
            where: { Id: discordUser.CompanyId },
            data: {
                OwnerId: null
            }
        });

        await interaction.reply({ content: `You have successfully unlinked your company.` });        
    }
}

export default UnlinkCompanyCommand;