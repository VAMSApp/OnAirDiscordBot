import { IBot } from "@/interfaces";

export function OnReadyMessage(username:string):string {
    let message:string = `Howdy 👋,\n${username} here, OnAir information services are now accessible to this server.\nAny issues or questions, encountered please reach out to \`@ndboost\``;

    return message;
}
