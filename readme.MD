# Discord Server Security API

Protect your Discord server with ease using this API. This API provides endpoints to secure your server by implementing various security measures such as anti-spam, anti-link, anti-ban, and more.

## Documentation

For detailed documentation and usage examples, please visit [https://anti-raid.xyz](https://anti-raid.xyz).

## Authorization

To access the endpoints, you need to provide a valid Discord bot token as in the Authorization header.

## Routes

- `POST /channeldelete`: Make this request when an unauthorized user deletes a channel.
  - Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/examples/discordJS/channelDelete)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/examples/oceanicJS/channelDelete)
- `POST /channelupdate`: Make this request when an unauthorized user updates a channel.
  - Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/examples/discordJS/guildAuditLogEntry)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/examples/oceanicJS/guildAuditLogEntry)
- `POST /roledelete`: Make this request when an unauthorized user deletes a role.
- Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/examples/discordJS/guildAuditLogEntry)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/examples/oceanicJS/guildAuditLogEntry)
- `POST /roleupdate`: Make this request when an unauthorized user updates a role.
- Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/examples/discordJS/guildAuditLogEntry)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/examples/oceanicJS/guildAuditLogEntry)
- `POST /antispam`: Check if a message contains spam.
- Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/examples/discordJS/antispam)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/examples/oceanicJS/antispam)
- `POST /antilink`: Check if a message contains a link.
- Example:
    - [Discord.js](https://github.com/Combo-Miner/Guard-API/examples/discordJS/antilink)
    - [Oceanic.js](https://github.com/Combo-Miner/Guard-API/examples/oceanicJS/antilink)
- `POST /antiban`: Prevent mass banning with a limit and time.

## Notes

If you are using a different library, make sure to refer to its documentation and follow the provided endpoints.


## Examples

For code examples, check the [examples]( https://github.com/Combo-Miner/Guard-API/examples) folder.

## Support

For support, join our [Discord server](https://discord.gg/invite/anti-raid).
