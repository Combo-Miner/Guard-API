const Discord = require('discord.js');
const Snoway = require('../../structures/client/index.js');
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

            const authorized = [];
            //Checking if the user is authorized
            if (authorized.includes(packet.d.user_id)) return;

            //sleeping so we can return the channels after the channel is deleted
            await sleep(1200); //1200 - 1800 ms
	    const channelData = [...client.guilds.cache.get(packet.d.guild_id).channels.cache.values()];
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
                    channels: channelData.length === 0 ?  [{id: "",name: "",guild_id: packet.d.guild_id}] : channelData.map(c => ({
                        id: c.id,
                        name: c.name,
                        guild_id: packet.d.guild_id
                    })),
                    parent_id: null,
                    parent: packet.d.changes.find(o=> o.key === "type").old_value === 4,
                    channelID: packet.d.target_id
                })
            }).then(async res => {
                if (!res.ok) return console.log("Error");
                console.log((await res.json()))
		 if(res.data.message === "Channels recreated") {
                    //raid finished do something
                }
            });


        } 
    }
}