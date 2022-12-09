import { IBot } from "interfaces";

export type Schedule = {
    name: string;
    description: string;
    execute: (args: IBot) => Promise<void>;
}
