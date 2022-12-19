import { OnAirEvent } from "types";
import { IBot, IOnAirEvent } from "../interfaces";

const OnAirNotification:IOnAirEvent = {
    name: 'onair-notification',
    eventName: 'VANotification',
    async execute (channelName:string, {data, type, createdAt, updatedAt, deletedAt, ...d}:OnAirEvent, app:IBot) {
        const channelId = app.getChannelId('onair-notification');
        const channel = app.client.channels.cache.get(channelId);

        if (channel !== this.name) return;
        if (!data) return;
        let msg:string = '';

        try {
            switch(type) {
                case 'VAMember-Added':
                    msg += `\n`
                    msg += `-------- OnAir VA Member Added --------\n`
                    msg += `\`\`\`json\n`
                    msg += `${JSON.stringify(data, null, 2)}\n`
                    msg += `\`\`\`\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAMember-Updated':
                    msg += `\n`
                    msg += `-------- OnAir VA Member Updated --------\n`
                    msg += `\`\`\`json\n`
                    msg += `${JSON.stringify(data, null, 2)}\n`
                    msg += `\`\`\`\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAMember-Deleted':
                    msg += `\n`
                    msg += `-------- OnAir VA Member Deleted --------\n`
                    msg += `\`\`\`json\n`
                    msg += `${JSON.stringify(data, null, 2)}\n`
                    msg += `\`\`\`\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAFleet-Added':
                    msg += `\n`
                    msg += `-------- OnAir Fleet Added --------\n`
                    msg += `Identifier: ${data.Identifier}\n`
                    msg += `Type: ${data.AircraftType.AircraftClass.Name}\n`
                    msg += `Make/Model: ${data.AircraftType.DisplayName}\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAFleet-Updated':
                    msg += `\n`
                    msg += `-------- OnAir Fleet Updated --------\n`
                    msg += `Identifier: ${data.Identifier}\n`
                    msg += `Type: ${data.AircraftType.AircraftClass.Name}\n`
                    msg += `Make/Model: ${data.AircraftType.DisplayName}\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAFleet-Deleted':
                    msg += `\n`
                    msg += `-------- OnAir Fleet Deleted --------\n`
                    msg += `Identifier: ${data.Identifier}\n`
                    msg += `Type: ${data.AircraftType.AircraftClass.Name}\n`
                    msg += `Make/Model: ${data.AircraftType.DisplayName}\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAJob-Taken':
                    msg += `\n`
                    msg += `-------- OnAir Job Taken --------\n`
                    msg += `${data.Description}\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAJob-Completed':
                    msg += `\n`
                    msg += `-------- OnAir Job Completed --------\n`
                    msg += `${data.Description}\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAJob-Expired':
                    msg += `\n`
                    msg += `-------- OnAir Job Expired --------\n`
                    msg += `${data.Description}\n`
                    msg += `---------------------------------\n`
                break;
                case 'VAJob-Abandoned':
                    msg += `\n`
                    msg += `-------- OnAir Job Abandoned --------\n`
                    msg += `${data.Description}\n`
                    msg += `---------------------------------\n`
                break;
                case 'Aircraft-Crashed':
                    msg += `\n`
                    msg += `-------- OnAir Aircraft Crashed --------\n`
                    msg += `${data.Description}\n`
                    msg += `---------------------------------\n`
                break;
                case 'Aircraft-Transporting':
                    msg += `\n`
                    msg += `-------- OnAir Aircraft Transporting --------\n`
                    msg += `${data.Description}\n`
                    msg += `---------------------------------\n`
                break;
            }
        }
        catch (e) {
            app.log.error(`Error parsing VAEvents message: ${e}`);
        }
        

        const fields:any[] = []

        if (data.person) {
            fields.push({
                "name": `Employee`,
                "value": `${data.person.pseudo}`,
                "inline": true
            })
            
            if (data.person.company) {
                fields.push({
                    "name": `Company`,
                    "value": `${data.person.company.airlineCode}`,
                    "inline": true
                });
            }
        }


        if (data.Aircraft) {
            fields.push({
              "name": `Aircraft`,
              "value": `${data.Aircraft}`
            });
        } if (data.amount) {
            fields.push({
              "name": `Amount`,
              "value": `$ ${data.amount.toFixed(2)}`
            })
        }

        channel.send({
            embeds: [
                {
                    "type": "rich",
                    "title": `VA Event: ${data.description}`,
                    "description": `${data.description}`,
                    "color": 0x00FFFF,
                    "fields": fields
                }
            ]
        })
        .then((msg:any) => {
            const key = this.eventName as keyof typeof app.config.onair.events;
            
            if (app.config.onair.events[key].autoDelete === true) {
                setTimeout(() => {
                    msg.delete()
                }, app.config.onair.events[key].autoDeleteAfter || 10000)
            }
        })
        .catch((e:any) => {
            app.log.error(`Error sending VANotifications message: ${e}`)
        });
    }
}

export default OnAirNotification
