import Arena from "are.na";

const arena = new Arena({
    accessToken: process.env.ARENA_ACCESS_TOKEN
});

async function getPersonalChannels(){
    console.info("Retrieving personal channels")
    const user = await arena.me().get();
    return await arena.user(user.id).channels();
}

async function createChannel(name) {
    const chan = await arena.channel().create(name,"closed");
    return chan;
}

function getChannelSlugByName(channels, name) {
    console.info(`Finding slug for channel: ${name}`)
    const chan = channels.find(channel => channel.title == name) 
    return chan ? chan.slug : createChannel(name).slug;
}

async function addToChannels(channels, url, create) {
    const personalChannels = await getPersonalChannels();
    const slugs = channels.map(channel => {
        return getChannelSlugByName(personalChannels, channel, create)
    })
    let promises = slugs.map(slug => arena.block().create(slug,url));

    Promise.all(promises).then(result => {
        console.log(`Successfully added ${url} to channels ${channels}`);
    }).catch(err => {
        console.error(err);
    });
}

export default function utils(command, flags) {
    switch (command[0]) {
        case 'add':
            addToChannels(flags.channel, flags.url);
            break;
        case 'merge':
            console.log('WIP: Merge two or more channels')
            break;
    }
}
