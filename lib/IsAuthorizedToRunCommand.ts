import { GuildMember, GuildMemberRoleManager, Interaction, Role } from 'discord.js';
import { IBot } from 'interfaces';
import { SlashCommand } from 'types';

export default function IsAuthorizedToRunCommand(cmd:SlashCommand, interaction:Interaction, app:IBot):boolean {
    if (!app.config.discord.roles) return true; // if roles aren't defined in config, return true
    let isAuthorized = false;
    const member: GuildMember = interaction.member as GuildMember;
    const memberRoles = (member.roles as GuildMemberRoleManager).cache;
    const roleName:string = cmd.roleName;
    const roleId:string = app.getRoleId(roleName);
    
    // ensure the interacting user has the matching Id for the 'owner' role in config.ts
    const isVAOwner = memberRoles.some((value:Role, key:string) => key === roleId);
    if (isVAOwner) {
        isAuthorized = true;
    }
    
    return isAuthorized;
}
