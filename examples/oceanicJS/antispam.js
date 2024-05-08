const config = require("../../config.json")

module.exports = {
    name: "messageCreate",
    run: async (client, message) => {
        const authorized = ["id1", "id2", "id3"] //Authorized users that can delete channels
        if (authorized.includes(message.author.id)) return;

        let req = await fetch("http://anti-raid.xyz" + "/antispam", {
            method: "POST",
            headers: {
                "Authorization": config.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guildID: message.guildID,
                botID: client.user.id,
                userID: message.author.id,
                channelID: message.channelID,
                punishment: null, //kick | ban |  tempmute | null | unrank
                reason: "wHY NOT", // pas obligatoire
                message: {
                    id: message.id,
                    channelID: message.channelID
                }
            })
        });

        console.log(await req.json());
    }
}