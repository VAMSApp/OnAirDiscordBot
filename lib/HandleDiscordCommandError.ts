import { IBot } from '../interfaces';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function HandleDiscordCommandError(err:any, app:IBot):string {
    let msg = 'Hmmm, there seems to have been an error while running this command.';

    if (err?.code === 50035) {
        msg += ' The response was too long to send, please try again with a smaller page size';
    } else if (err?.code === 50006) {
        msg += ' I do not have permission to send messages in that channel';
    } else if (err?.code === 50007) {
        msg += ' I do not have permission to send messages in your DMs';
    } else if (err?.code === 50013) {
        msg += ' I do not have permission to send messages in that channel';
    } else {
        msg = ' Please try again later or contact an administrator if the issue persists';

        if (err && err?.message) {
            msg += ` and provide them with the following error message:\n${err.message}`;
        }
    }

    
    app.log.error(msg);

    return msg;
}

export default HandleDiscordCommandError;