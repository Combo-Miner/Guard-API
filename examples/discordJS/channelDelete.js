const Discord = require('discord.js');
const Snoway = require('../../structures/client/index.js');
const tempEvents = new Map();
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    //listening to the packet event that is raw in discord.js
    name: 'raw',
    /**
     * 
     * @param {Snoway} client 
     * @param {Discord.Guild} guild 
     * @returns 
     */
    run: async (client, packet) => {
        if (packet.t === "GUILD_AUDIT_LOG_ENTRY_CREATE") {
            if (packet.d.action_type !== 12) return;

            const inCache = tempEvents.get(`${packet.d.target_id}_${packet.d.guild_id}`);
            if (!inCache) return console.log("no channel");

            const channelInTempCache = inCache.channel;
            if (!channelInTempCache) return;
            //Checking if the user is authorized
            if (authorized.includes(packet.d.user_id)) return;

            //sleeping so we can return the channels after the channel is deleted
            await sleep(1200); //1200 - 1800 ms
            //Deleting the channel from the cache
            tempEvents.delete(`${packet.d.target_id}_${packet.d.guild_id}`)

            fetch("http://anti-raid.xyz" + "/channeldelete", {
                method: "POST",
                headers: {

                    "Authorization": client.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: packet.d.guild_id,
                    userID: packet.d.user_id,
                    punishment: "kick",
                    channels: [...client.guilds.cache.get(packet.d.guild_id).channels.cache.values()].map(c => ({
                        id: c.id,
                        name: c.name,
                        guild_id: c.guildId
                    })),
                    parent_id: channelInTempCache.parentId,
                    parent: channelInTempCache instanceof Discord.CategoryChannel,
                    channelID: packet.d.target_id
                })
            }).then(async res => {
                if (!res.ok) return console.log("Erreur");
                console.log((await res.json()))
            });


        } else if (packet.t == "CHANNEL_DELETE") {
            //Getting channel before getting deleted from the cache
            const channelCache = client.guilds.cache.get(packet.d.guild_id).channels.cache.get(packet.d.id);
            tempEvents.set(`${packet.d.id}_${packet.d.guild_id}`, {
                channel: channelCache,
            })

        }
    }
}