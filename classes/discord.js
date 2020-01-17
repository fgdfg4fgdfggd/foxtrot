const fetch = require("node-fetch")
class Discord {
  constructor (webhook, groupId) {
    this.webhook = webhook
    this.groupId = groupId
  }
  sendAlert (info, deranked) {
    const log = info.first
    const sendData = {
      username: 'Project_Foxtrot',
      avatar_url: 'https://cdn.discordapp.com/attachments/607243101391552512/667561761586544700/phantomlogo.png',
      content: '@everyone ALERT: Group Threat detected',
      embeds: [
        {
          title: `Possible Group Admin Abuse Detected`,
          description: `**User**: [${log.username}](${`https://www.roblox.com/users/${log.userId}/profile`}) (${log.userId}) \n**Rank**: \`${log.rankName} (${log.rank})\`\n**Number of actions**: ${info.no}\n${deranked ? 'User de-ranked.' : 'Failed to de-rank user!'}\n\n**DO NOT IGNORE THIS ALERT**`,
          color: 16711935,
          url: `https://www.roblox.com/groups/${this.groupId}/-`,
          footer: { text: "Powered by RCDForum" }
        }
      ],
      tts: true
    }
    fetch(this.webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
  }
}
module.exports = Discord
