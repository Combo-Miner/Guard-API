# Discord Server Security API

Protect your Discord server with ease using this API. This API provides endpoints to secure your server by implementing various security measures such as anti-spam, anti-link, anti-ban, and more.

## Documentation

For detailed documentation and usage examples, please visit [https://anti-raid.xyz](https://anti-raid.xyz).

## Authorization

To access the endpoints, you need to provide a valid Discord bot token as in the Authorization header.

## Routes

- `POST /channeldelete`: Make this request when an unauthorized user deletes a channel.
  - Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/channelDelete.js)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/channelDelete.js)
  - Video Example: [Guard Delete Channel](https://cdn.discordapp.com/attachments/1197279966056939581/1197657996780634192/GUARDDELETECHANNEL.mp4?ex=663c9b2d&is=663b49ad&hm=4b17b3be4ddcfb41b56147aa2d018d9ffc5245b13c370585167965693540f546&)

- `POST /channelupdate`: Make this request when an unauthorized user updates a channel.
  - Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/guildAuditLogEntry.js)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/guildAuditLogEntry.js)

- `POST /roledelete`: Make this request when an unauthorized user deletes a role.
- Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/guildAuditLogEntry.js)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/guildAuditLogEntry.js)

- `POST /roleupdate`: Make this request when an unauthorized user updates a role.
    - Example:
        - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/guildAuditLogEntry.js)
        - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/guildAuditLogEntry.js)

- `POST /antispam`: Check if a message contains spam.
    - Example:
        - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/antispam.js)
        - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/antispam.js)
    - Video Example: [Guard Anti-Spam](https://cdn.discordapp.com/attachments/1087902420757131306/1112780513523007549/remade_antispam.mp4?ex=663cfa9c&is=663ba91c&hm=9a8f3fa6cfdc9e0abb7ba4df44f3910b2ff01ef3bb7393f1a99c0864b2a79043&)

- `POST /antilink`: Check if a message contains a link.
    - Example:
        - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/antilink.js)
        - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/antilink.js)
        
- `POST /antiban`: Prevent mass banning with a limit and time.
    - Example:
        - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/antiban.js)
        - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/antiban.js)

## Notes

If you are using a different library, make sure to refer to its documentation and follow the provided endpoints.

## Examples

For code examples, check the [examples]( https://github.com/Combo-Miner/Guard-API/tree/main/examples) folder.

## Support

For support, join our [Discord server](https://discord.gg/invite/anti-raid).
