/*
  This example assumes that an event ID for a specific post is known, and it
	retrieves that post based on its unique event ID. This is as opposed to
	looking for posts based on a users pubkey.
*/

import {RelayPool} from 'nostr'
import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
import { hexToBytes } from '@noble/hashes/utils'

const eventId = 'be3a3ddb902cb09d9df77a3d2d9ab9668042b500343f4d6cadc0390f6707d105'

// Alice is our user making the post.
const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)
console.log(`Alice Public Key: ${alicePubKey}`)

const psf = "wss://nostr-relay.psfoundation.info"
const relays = [psf]

const pool = RelayPool(relays)

pool.on('open', relay => {
	// relay.subscribe("subid", {limit: 2, kinds:[1], authors: [alicePubKey]})
	relay.subscribe('REQ', {"ids": [eventId]})
});

pool.on('eose', relay => {
	relay.close()
});

pool.on('event', (relay, sub_id, ev) => {
	console.log(ev)
});
