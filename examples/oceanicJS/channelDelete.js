



const {
    CategoryChannel
} = require("oceanic.js");
const config = require('../../config.json');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const tempEvents = new Map();
module.exports = {
    //listening to the packet event
    name: "packet",
    run: async (client, packet) => {
        if (packet.t === "GUILD_AUDIT_LOG_ENTRY_CREATE") {
            if (packet.d.action_type !== 12) return;

            const inCache = tempEvents.get(`${packet.d.target_id}_${packet.d.guild_id}`);
            if (!inCache) return;

            const channelInTempCache = inCache.channel;
            if (!channelInTempCache) return;
            const authorized = ["id1", "id2", "id3"] //Authorized users that can delete channels
            //Checking if the user is authorized
            if (authorized.includes(packet.d.user_id)) return;

            //sleeping so we can return the channels after the channel is deleted
            await sleep(1200); //1200 - 1800 ms
            //Deleting the channel from the cache
            tempEvents.delete(`${packet.d.target_id}_${packet.d.guild_id}`)
            //Doing the request
            fetch("https://anti-raid.xyz" + "/channeldelete", {
                method: "POST",
                headers: {

                    "Authorization": config.token, //you discord bot token
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: packet.d.guild_id,
                    userID: packet.d.user_id,
                    punishment: "kick", // can be ban,kick tempmute or null
                    channels: client.guilds.get(packet.d.guild_id).channels.toArray().map(c => ({
                        id: c.id,
                        name: c.name,
                        guild_id: c.guildID
                    })),
                    parent_id: channelInTempCache.parentID,
                    parent: channelInTempCache instanceof CategoryChannel,
                    channelID: packet.d.target_id
                })
            }).then(async res => {
                if (!res.ok) return console.log("Erreur");
                console.log((await res.json()))
            });

        } else if (packet.t == "CHANNEL_DELETE") {
            //Getting channel before getting deleted from the cache
            const channelCache = client.guilds.get(packet.d.guild_id).channels.get(packet.d.id);
            tempEvents.set(`${packet.d.id}_${packet.d.guild_id}`, {
                channel: channelCache,
            })

        }
    }
}