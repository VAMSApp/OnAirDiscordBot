export function BuildVARoleName (role: string, permission: number) {
    let emoji = '👤'; // default member emoji
        
    switch(permission) {
        case 0:
            emoji = '👑'; // crown for owner
            break;
        case 100: 
            emoji = '👔'; // tie for manager
            break;
    }

    return `${emoji} ${role}`;
}