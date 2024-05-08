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
- `POST /antilink`: Check if a message contains a link.
- Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/discordJS/antilink.js)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/tree/main/examples/oceanicJS/antilink.js)
- `POST /antiban`: Prevent mass banning with a limit and time.

## Notes

If you are using a different library, make sure to refer to its documentation and follow the provided endpoints.

## Examples

For code examples, check the [examples]( https://github.com/Combo-Miner/Guard-API/tree/main/examples) folder.

## Support

For support, join our [Discord server](https://discord.gg/invite/anti-raid).
