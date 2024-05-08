module.exports = {
    name: "messageCreate", // can be messageUpdate
    run: async (client, message) => {
        const authorized = ["id1", "id2", "id3"] //Authorized users that can delete channels
        if (authorized.includes(message.author.id)) return;
        fetch("https://anti-raid.xyz" + "/antilink", {
            method: "POST",
            headers: {

                "Authorization": config.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guildID: message.guildID,
                botID: client.user.id,
                userID: message.author.id,
                messageID: message.id,
                 channelID : message.channelID,
                messageContent: message.content,
                punishment: "tempmute", //kick | ban |  tempmute | null
                reason: "wHY NOT", // pas obligatoire
            })
        }).then(async res => console.log((await res.json())));


    }
}