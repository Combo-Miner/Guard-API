

module.exports = {
    name: 'messageCreate', // can be messageUpdate
    run: async (client, message) => {
        if (!message.guild || message.author.bot) return;
        const authorized = ["id1", "id2", "id3"] //Authorized users that can delete channels
        if (authorized.includes(message.author.id)) return;

        fetch("https://anti-raid.xyz" + "/antilink",{
        method: "POST",
        headers: {
            "Authorization":  client.token,
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
            guildID: message.guildId,
            botID : client.user.id,
            userID : message.author.id,
            messageID : message.id,
            channelID : message.channel.id,
            messageContent : message.content,
            punishment : "tempmute", //kick | ban |  tempmute | null
            reason : "wHY NOT", // pas obligatoire
        })
    }).then(async res => console.log((await res.json())));
    }
}