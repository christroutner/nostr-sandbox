/*
  Example to update the follow list  with a new list of people to follow.
*/

import { finalizeEvent, getPublicKey } from 'nostr-tools/pure'
// import {RelayPool} from 'nostr'
import {Relay, useWebSocketImplementation} from 'nostr-tools/relay'
import { hexToBytes } from '@noble/hashes/utils'
import WebSocket from 'ws'
useWebSocketImplementation(WebSocket)

// Alice want to update her follow list
const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)
console.log(`Alice Public Key: ${alicePubKey}`)

// Bob is the person to be added to the new follow list
const bobPrivKeyHex = "d2e71a977bc3900d6b0f787421e3d1a666cd12ca625482b0d9eeffd23489c99f"
const bobPrivKeyBin = hexToBytes(bobPrivKeyHex)
const bobPubKey = getPublicKey(bobPrivKeyBin)
console.log(`Bob Public Key: ${bobPubKey}`)

// Relay list
const psf = "wss://nostr-relay.psfoundation.info"

const followList = [
  ['p', bobPubKey, psf, 'bob'],
]

// Generate a post.
const eventTemplate = {
	kind: 3,
	created_at: Math.floor(Date.now() / 1000),
	tags: followList,
	content: ''
}
console.log(`eventTemplate: ${JSON.stringify(eventTemplate, null, 2)}`)

// Sign the post
const signedEvent = finalizeEvent(eventTemplate, alicePrivKeyBin)

// Connect to a relay.
const relay = await Relay.connect(psf)
console.log(`connected to ${relay.url}`)

// Publish the message to the relay.
await relay.publish(signedEvent)

// Close the connection to the relay.
relay.close()
