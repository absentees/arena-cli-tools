# are.na CLI tools

A CLI utility for are.na satisfying some of the functionality that I can't find elsewhere. 

## Setup

### Install (Temporary)

Until I publish on NPM you'll need to installing globally directly from this repo URL

```
yarn global add https://github.com/absentees/arena-cli-tools
```


Then one environment variable for the utilities to be able to access your private channels.
You can generate a personal access token via the are.na dev site https://dev.are.na

```
ARENA_ACCESS_TOKEN=
```

## Utilities 
### Merge channels (On the way)

I often accidentally create a new channel when using the browser extension, would like a quick way to merge channels into a new one. Then optionally delete the old duplicates.

**Usage**
```
$ arena-cli-tools merge channels -a channel-adsf1 -s channel-asdf2 -c "New channel"
```


### Add URL block to channel (v1.0)

Add a URL block to a channel or multiple at once. Provide the URL with the `-u` URL and the channels with flag `-c` as many times as you like. 
The tool will create channels that do not exist.

Note: At the moment this creates a new block for each channel that it is added to, rather than the are.na way which would be one block with many connections.

```
$ arena-cli-tools add -u https://are.na -c "Added from cli" -c "cool CLI url"
```
