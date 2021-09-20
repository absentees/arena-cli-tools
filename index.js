#!/usr/bin/env node
import meow from "meow";

const cli = meow(`
            Usage
                $ arena-cli-tools <action> <object> <inputs...>

            Options
                -c Channel name (Looks in your profile)
                -s Channel slug

            Examples
                $ arena-cli-tools add block https://are.na -c "Added from cli"
                Added URL https://are.na to your channel "Added from CLI"

                $ arena-cli-tools merge channels -a channel-adsf1 -s channel-asdf2 -c "New channel"
                Merged channel-asdf1 + channel-asdf2 into new channel "New channel"

`,{
    allowUnknownFlags: false,
    importMeta: import.meta,
    flags: {
        channel: {
            alias: 'c',
            type: 'string',
            isMultiple: true
        },
        slug: {
            alias: 's',
            type: 'string',
            isMultiple: true
        }
    }
});

console.log(cli.input, cli.flags)