

const config = require("../../config.json");
module.exports = {
    name : "guildAuditLogEntryCreate",
    run : async(client,guild,entry) => {
        //action 22 is ban action
      if(entry.action !== 22) return;
      fetch("https://anti-raid.xyz" + "/antiban",{
        method: "POST",
        headers: {
      
            "Authorization": config.token,
            "Content-Type": "application/json"
        },
        body : JSON.stringify({
          guildID : guild.id,
          botID : client.user.id,
          punishment : null,
          reason : null,
          executorID: entry.executorId,
          targetID: entry.targetId,
          time : 600000, //in ms
          max : 10,
        })
    }).then(async res=> console.log((await res.json())));

    }
}
