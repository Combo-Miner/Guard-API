const {
    CategoryChannel
} = require("oceanic.js");
const config = require('../../config.json');

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
    //listening to the packet event
    name: "packet",
    run: async (client, packet) => {
        if (packet.t === "GUILD_AUDIT_LOG_ENTRY_CREATE") {
            if (packet.d.action_type !== 12) return;

            await sleep(1200); //1200 - 1800 ms
            //Doing the request
            fetch("http://localhost" + "/channeldelete", {
                method: "POST",
                headers: {

                    "Authorization": config.token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    botID: client.user.id,
                    guildID: packet.d.guild_id,
                    userID: packet.d.user_id,
                    punishment: null, // can be ban,kick tempmute or null
                    channels: client.guilds.get(packet.d.guild_id).channels.toArray().length === 0 ? [{id: "",name: "",guild_id: packet.d.guild_id}] : 
                    client.guilds.get(packet.d.guild_id).channels.toArray().map(c => ({
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
                res = await res.json();
                if(res.data.message === "Channels recreated") {
		//send logs or do something raid finished
                }
            });


        } 
    }
}