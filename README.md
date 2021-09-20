# are.na CLI tools

A CLI utility for are.na satisfying some of the functionality that I can't find elsewhere. 

## Setup

You'll need to provide your are.na personal access token in your environment variables.

## Utilities 
### Merge channels (WIP)

I often accidentally create a new channel when using the browser extension, would like a quick way to merge channels into a new one. Then optionally delete the old duplicates.

**Usage**
```
$ arena-cli-tools merge channels -a channel-adsf1 -s channel-asdf2 -c "New channel"
Merged channel-asdf1 + channel-asdf2 into new channel "New channel" 
```


### Add URL block to channel (WIP)

Add a URL block to a channel or multiple at once. Provide the URL and the channel with flag `-c` as many times as you like. 

```
$ arena-cli-tools add block https://are.na -c "Added from cli"
Added URL https://are.na to your channel "Added from CLI"
```