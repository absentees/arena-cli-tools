#!/usr/bin/env node
import meow from "meow";
import meowHelp from "cli-meow-help";


// const cli = meow(`
//             Usage
//                 $ arena-cli-tools <action> <object> <inputs...>

//             Options
//                 -c Channel name (Looks in your profile)
//                 -s Channel slug

//             Examples
//                 $ arena-cli-tools addBlock https://are.na -c "Added from cli"
//                 Added URL https://are.na to your channel "Added from CLI"

//                 $ arena-cli-tools merge channels -a channel-adsf1 -s channel-asdf2 -c "New channel"
//                 Merged channel-asdf1 + channel-asdf2 into new channel "New channel"

// `,{
//     allowUnknownFlags: false,
//     importMeta: import.meta,
//     flags: {
//         channel: {
//             alias: 'c',
//             type: 'string',
//             isMultiple: true,
//             isRequired: false
//         },
//         slug: {
//             alias: 's',
//             type: 'string',
//             isMultiple: true,
//             isRequired: false
//         }
//     }
// });

const commands = {
    add: {
        desc: `Adds a new URL block to a channel to add to`
    },
    merge: {
        desc: `Merge two or more channels into a new one`
    }
}

const flags = {
    channel: {
        alias: 'c',
        type: 'string',
        isMultiple: true,
        isRequired: false,
        desc: `Specific the channel name`
    },
    slug: {
        alias: 's',
        type: 'string',
        isMultiple: true,
        isRequired: false,
        desc: 'Specific the channel slug'
    }
}

const helpText = meowHelp({
    name: 'arena-cli-tools',
    desc: `A set of helper utilities for are.na`,
    flags,
    commands,
    header: "Are.na CLI tools",
    footer: "Created by @absentees"
});

meow(helpText,{
    importMeta: import.meta,
    flags
});

// console.log(cli.input, cli.flags)