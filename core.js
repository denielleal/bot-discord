const Discord   = require("discord.js");
const client    = new Discord.Client();

const config    = require("./config.json");
const commands  = require("./scripts/commandsReader")(config.prefix);

const unknowCommand = require("./scripts/unknowCommand");

client.on("ready",()=>{
    console.log(`Logando com o bot ${client.user.tag}`);
});


client.on("message",(msg)=>{
    if(!msg.author.bot && msg.guild){
        if(config.debug) console.log(`${msg.author.username}: ${msg.content}`);
        const args = msg.content.split(" ");
        if(commands[args[0]]) commands[args[0]](client,msg);
        else if(args[0].split("")[0] == config.prefix) unknowCommand(client,msg);
    }
});

client.on("guildMemberAdd", (member) => {
    const BoasVindasChannel = member.guild.channels.cache.find(channel=>channel.id == config.BoasVindasChannelId);
    BoasVindasChannel.send(`${member.displayName} acabou de entra em nosso servidor`);
    member.send("Bem vindo ao nosso servidor\n Se divirta :D yey")
});
client.on("guildMemberRemove", (member) => {
    const SaidaChannel = member.guild.channels.cache.find(channel=>channel.id == config.SaidaChannelId);
    SaidaChannel.send(`${member.displayName} acabou de partir`);
});

client.login(config.token);