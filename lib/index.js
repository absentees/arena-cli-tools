import Arena from "are.na";
import env from "dotenv";
env.config()

const arena = new Arena({
    accessToken: process.env.ARENA_ACCESS_TOKEN
});

async function getPersonalChannels(){
    // const channels = await arena.user().channels();
    console.log(await arena.user(process.env.ARENA_USER_ID).channels());
    // return channels;
}

function getChannelSlug(channelName){


    return channelSlug;
}

export default function utils(command, flags) {
    switch (command[0]) {
        case 'add':
            console.log("Adding URL to channels")
            const addToChannels = flags.channel;
            
            // console.log(addToChannels);
            console.log(getPersonalChannels());
            break;
        case 'merge':
            console.log('Merge two or more channels')
            break;
    }
}
