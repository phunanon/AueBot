import { Client, GatewayIntentBits, Partials, Message } from 'discord.js';

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel],
});
const token = process.env['DISCORD_BOT_SECRET'];

const verses = `Think sensibly for Aue;
believe in it & your abilities.
Share, preserve, exalt it for joy.
Nature, so body, so mind, are of now;
after death is scattering.
Evolution gave joy & woe, sentience.
Life, together, share the universe.
Time, volatile, make precious.
Know of woe and seek joy happily.
Nature & society is our habitat.
Oppose harm and raise compassion.
Seek peace to woe incited, inflicted.
Show Aue beside woe naively fed.
Believe critically in science;
wield for joy and grow it.`.split('\n');

bot.on("messageCreate", async (message: Message) => {
  const { channel, author, content } = message;

  if (author.bot) {
    return;
  }

  //Match _abc_ etc
  let mentionedVerses = [...content.matchAll(/(?:_|\*)(a*b*c*d*e*f*g*h*i*j*k*l*m*n*o*)(?:_|\*)/g)].flatMap(m => m[1].split(""));
  mentionedVerses = [...new Set(mentionedVerses)].sort();
  const mentionedVersesVN = mentionedVerses.map(m => [m, m.charCodeAt(0) - 97] as [string, number]);

  if (!mentionedVersesVN.length) {
    if (content.match(/^(_|\*)aue(_|\*)$/)) {
      const all = verses.map((v, i) => `_${String.fromCharCode(i + 97)}_ ${v}`);
      await channel.send(['.', ...all].join("\n"));
    }
    return;
  }

  await channel.send(
    'verses mentioned:\n' +
    mentionedVersesVN.map(([v, n]) => `_${v}_ ${verses[n]}`)
      .join('\n'));
});

bot.login(token);
console.log("ready");
