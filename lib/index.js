import Arena from "are.na";

const arena = new Arena({
    accessToken: process.env.ARENA_ACCESS_TOKEN
});

async function getPersonalChannels() {
    console.info("Retrieving personal channels")
    const user = await arena.me().get();
    return await arena.user(user.id).channels();
}

async function createChannel(name) {
    try {
        const chan = await arena.channel().create(name, "closed");
        return chan;
    } catch (error) {
        console.error(`Error creating channel ${name}: ${error}`)
    }
}

function getChannelSlugByName(channels, name) {
    console.info(`Finding slug for channel: ${name}`)
    const chan = channels.find(channel => channel.title == name);
    return chan;
}

async function addToChannels(channels, url, create) {
    const personalChannels = await getPersonalChannels();

    let promises = channels.map(async channel => {
        let chan = getChannelSlugByName(personalChannels, channel);
        if (!chan) {
            createChannel(channel, url).then(newChan => {
                arena.block().create(newChan.slug, url).then(res => {
                    return res;
                });
            });
        } else {
            arena.block().create(chan.slug, url).then(res => {
                return res;
            });
        }
    });

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
