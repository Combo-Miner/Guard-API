

const Client = require("../../index.js")
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const config = require("../../config.json");
const { CategoryChannel } = require("oceanic.js");
module.exports = {
    name : "ready",
    /**
     * 
     * @param {Client} client 
     */
    run : async(client) => {
        //make this request when the bot is ready
        await sleep(1000)

        const transformedGuilds  = client.guilds.map(g=> ({
          guildID : g.id,
          
          channels : g.channels.map(c=> ({
            parent_id: c.parentID,
            parent : c instanceof CategoryChannel,
            id: c.id,
            e: console.log(c.permissionOverwrites.map(p=> ({
              id: p.id,
              allow : BigInt(p.allow).toString(),
              deny: BigInt(p.deny).toString(),
              type: p.type, 
            }))),
            name : c.name,
            type: c.type,
            user_limit: c.userLimit,
            position: c.position,
            botID : client.user.id,
            permission_overwrites: c.permissionOverwrites.map(p=> ({
              id: p.id,
              allow : BigInt(p.allow).toString(),
              deny: BigInt(p.deny).toString(),
              type: p.type, 
            })),
            topic: c.topic,
            guildID: g.id
          }),
          ),
          roles: g.roles.map(r=> ({
            id: r.id,
            position: r.position,
            name: r.name,
            manage: r.managed,
            permissions: BigInt(r.permissions.allow).toString(),
            color: r.color,
            hoist: r.hoist,
            mentionable: r.mentionable
          }))
        }))

        fetch("https://anti-raid.xyz" + "/ready",{
          method: "POST",
          headers: {
        
              "Authorization": config.token,
              "Content-Type": "application/json"
          },
          body : JSON.stringify({
              botID: client.user.id,
              guilds: transformedGuilds
          })
      }).then(async res=> console.log((await res.json())));
    }
}
       