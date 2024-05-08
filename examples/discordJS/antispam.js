

module.exports = {
    name: 'messageCreate',
 
    run: async (client, message) => {
        if (!message.guild || message.author.bot) return;
        const authorized = ["id1", "id2", "id3"] //Authorized users that can delete channels
        if (authorized.includes(message.author.id)) return;
        
        let req = await fetch("https://anti-raid.xyz" + "/antispam", {
            method: "POST",
            headers: {
                "Authorization": client.token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                guildID: message.guildId,
                botID: client.user.id,
                userID: message.author.id,
                channelID: message.channel.id,
                punishment: "tempmute",
                reason: "wHY NOT", 
                message: {
                    id: message.id,
                    channelID: message.channelId
                }
            })
        });

        console.log(await req.json());
    }
}