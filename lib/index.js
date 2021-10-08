import process from 'node:process';
import Arena from 'are.na';

const arena = new Arena({
	accessToken: process.env.ARENA_ACCESS_TOKEN,
});

async function getPersonalChannels(page = 1) {
	const user = await arena.me().get();
	const results = await arena.user(user.id).channels({
		page: page, per: 85
	})
	if (results.length > 0) {
		return results.concat(await getPersonalChannels(page + 1));
	} else {
		return results;
	}
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

	// TODO: Need a slight rewrite, block needs to be created in the first channel then 'connected' to the others, not recreated.
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

async function listAllChannels() {
	try {
		console.info("Retrieving all personal channels")
		let channels = await getPersonalChannels();
		console.log(`Retrieved ${channels.length} channels.`);
		// console.log(channels.map(c => c.title));
		console.dir(channels, {'maxArrayLength': null});
	} catch (error) {
		console.error(error);
	}
}

export default function utils(command, flags) {
	switch (command[0]) {
		case 'add':
			addToChannels(flags.channel, flags.url);
			break;
		case 'merge':
			console.log('WIP: Merge two or more channels')
			break;
		case 'list':
			listAllChannels();
			break;
	}
}
