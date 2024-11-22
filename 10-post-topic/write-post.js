/*
  Forked from example 03. This is an example of posting a message related to
	a 'topic', so that other nodes can subscribe to that 'topic'. This is as
	opposed to following a user.

	Using kind 867, and tag 't' (for topic).
*/

import { finalizeEvent, generateSecretKey, getPublicKey } from 'nostr-tools/pure'
// import {RelayPool} from 'nostr'
import {Relay, useWebSocketImplementation} from 'nostr-tools/relay'
import { hexToBytes } from '@noble/hashes/utils'
import WebSocket from 'ws'
useWebSocketImplementation(WebSocket)

// Alice is our user making the post.
const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)
console.log(`Alice Public Key: ${alicePubKey}`)

// Relay list
const psf = "wss://nostr-relay.psfoundation.info"

const now = new Date()

// Generate a post.
const eventTemplate = {
	kind: 867,
	created_at: Math.floor(Date.now() / 1000),
	tags: [["t", "bch-dex-test"]],
	content: `This is a test message posted at ${now.toLocaleString()} to the topic bch-dex-test`
}
console.log(`eventTemplate: ${JSON.stringify(eventTemplate, null, 2)}`)

// Sign the post
const signedEvent = finalizeEvent(eventTemplate, alicePrivKeyBin)
console.log('signedEvent: ', signedEvent)

// Connect to a relay.
const relay = await Relay.connect(psf)
console.log(`connected to ${relay.url}`)

// Publish the message to the relay.
const result = await relay.publish(signedEvent)
console.log('result: ', result)

// Close the connection to the relay.
relay.close()
