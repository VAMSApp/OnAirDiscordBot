import { IBot } from "../interfaces";

export type Command = {
    data: {
        name: string;
        description: string;
        options?: {
            [key: string]: any;
        }
    },
    execute: (interaction: any, app:IBot) => Promise<void>;
}
