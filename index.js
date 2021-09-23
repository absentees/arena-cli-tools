#!/usr/bin/env node
import meow from "meow";
import meowHelp from "cli-meow-help";
import utils from "./lib/index.js";

const commands = {
    add: {
        desc: `Adds a new URL block to a channel to add to`
    },
    merge: {
        desc: `Merge two or more channels into a new one`
    }
}

const flags = {
    create: {
        type: 'boolean',
        default: false,
        desc: 'Create channels if specified but do not exist'
    },
    channel: {
        alias: 'c',
        type: 'string',
        isMultiple: true,
        isRequired: false,
        desc: `Specific the channel name`
    },
    url: {
        alias: 'u',
        type: 'string',
        desc: `URL to add to a channel`
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
    flags,
    commands,
    header: "Are.na CLI tools",
    footer: "Created by @absentees"
});

const cli = meow(helpText,{
    importMeta: import.meta,
    flags
});

utils(cli.input, cli.flags)