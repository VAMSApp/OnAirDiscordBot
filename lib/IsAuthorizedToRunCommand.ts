import { Collection, GuildMember, GuildMemberRoleManager, Interaction, Role } from 'discord.js';
import { IBot } from 'interfaces';
import { SlashCommand } from 'types';

export default function IsAuthorizedToRunCommand(cmd:SlashCommand, interaction:Interaction, app:IBot):boolean {
    let isAuthorized = false;
    const member: GuildMember = interaction.member as GuildMember;
    const memberRoles:Collection<string, Role> = (member.roles as GuildMemberRoleManager).cache;
    const roleName:string = cmd.roleName;
    const roleId:string = app.getRoleId(roleName);
    
    // ensure the interacting user has the matching Id for the 'owner' role in config.ts
    const isVAOwner = memberRoles.some((value:Role, key:string) => key === roleId);
    if (isVAOwner) {
        isAuthorized = true;
    }
    
    return isAuthorized;
}
