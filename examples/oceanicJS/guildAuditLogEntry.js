const oceanic = require("oceanic.js");
const config = require("../../config.json");
module.exports = {
    name: 'guildAuditLogEntryCreate',

    run: async (client, guild, entry) => {
        if (entry.actionType === oceanic.AuditLogActionTypes.ROLE_DELETE) {
            const authorized = ["id1", "id2", "id3"];
            if (authorized.includes(entry.userID)) return;
            //make this request only if the user is not authorized so the bot will recreate the role
            fetch("https://anti-raid.xyz" + "/roledelete", {
                method: "POST",
                headers: {

                    "Authorization": client.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: guild.id,
                    roleID: entry.targetID,
                    userID: entry.userID,
                    punshiment: false,
                })
            }).then(async res => console.log((await res.json())));
            return;
        }
        //unauthorized channelUpdates
        if ([oceanic.AuditLogActionTypes.CHANNEL_UPDATE, oceanic.AuditLogActionTypes.CHANNEL_OVERWRITE_CREATE,
                oceanic.AuditLogActionTypes.CHANNEL_OVERWRITE_DELETE, oceanic.AuditLogActionTypes.CHANNEL_OVERWRITE_UPDATE
            ].includes(entry.actionType)) {
            const authorized = ["id1", "id2", "id3"];
            if (authorized.includes(entry.userID)) return;
            //make this request only if the user is not authorized so the bot will update the channel
            fetch("https://anti-raid.xyz" + "/channelupdate", {
                method: "POST",
                headers: {

                    "Authorization": config.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: guild.id,
                    channelID: entry.targetID,
                    userID: entry.userID,
                    punshiment: false,
                })
            }).then(async res => console.log((await res.json())));
            return;
        }
        //unauthorized roleUpdates
        if (oceanic.AuditLogActionTypes.ROLE_UPDATE === entry.actionType) {
            const authorized = ["id1", "id2", "id3"];
            if (authorized.includes(entry.userID)) return;
            //make this request only if the user is not authorized so the bot will update the role
            fetch("https://anti-raid.xyz" + "/roleupdate", {
                method: "POST",
                headers: {

                    "Authorization": config.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: guild.id,
                    roleID: entry.targetID,
                    userID: entry.userID,
                    punshiment: false,
                })
            }).then(async res => console.log((await res.json())));
            return;
        }

        //authorized channelUpdates and roleUpdates
        if ([
                oceanic.AuditLogActionTypes.ROLE_CREATE,
                oceanic.AuditLogActionTypes.ROLE_DELETE,
                oceanic.AuditLogActionTypes.ROLE_UPDATE,
                oceanic.AuditLogActionTypes.CHANNEL_CREATE,
                oceanic.AuditLogActionTypes.CHANNEL_DELETE,
                oceanic.AuditLogActionTypes.CHANNEL_UPDATE,
                oceanic.AuditLogActionTypes.CHANNEL_OVERWRITE_CREATE,
                oceanic.AuditLogActionTypes.CHANNEL_OVERWRITE_DELETE,
                oceanic.AuditLogActionTypes.CHANNEL_OVERWRITE_UPDATE
            ].includes(entry.action)) {

            const authorized = ["id1", "id2", "id3"];
            if (!authorized.includes(entry.userID)) return;
            //make this request only if the user is authorized so it can send the data to the server
            const transformedGuilds = client.guilds.map(g => ({
                guildID: g.id,
                channels: g.channels.map(c => ({
                    parent_id: c.parentId,
                    parent: c instanceof oceanic.CategoryChannel,
                    id: c.id,
                    name: c.name,
                    type: c.type,
                    user_limit: c.userLimit,
                    permission_overwrites: [...c.permissionOverwrites.values()].map(p => ({
                        id: p.id,
                        allow: BigInt(p.allow.bitfield).toString(),
                        deny: BigInt(p.deny.bitfield).toString(),
                        type: p.type,
                    })),
                    position: c instanceof oceanic.CategoryChannel ? c.position : c.rawPosition,
                    botID: client.user.id,
                    topic: c.topic,
                    guildID: g.id
                }), ),
                roles: g.roles.map(r => ({
                    id: r.id,
                    position: r.position,
                    name: r.name,
                    manage: r.managed,
                    permissions: BigInt(r.permissions.bitfield).toString(),
                    color: r.color,
                    hoist: r.hoist,
                    mentionable: r.mentionable
                }))
            }))
            //make this request only if the user is authorized so it can send the data to the server

            fetch("http://anti-raid.xyz" + "/ready", {
                method: "POST",
                headers: {

                    "Authorization": client.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guilds: transformedGuilds
                })
            }).then(async res => console.log((await res.json())));

        }
    }
}