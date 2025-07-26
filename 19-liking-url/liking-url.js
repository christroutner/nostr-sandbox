/*
  Example script for add a reaction ( like ) to a event
  https://github.com/nostr-protocol/nips/blob/master/25.md
*/

import { hexToBytes } from '@noble/hashes/utils'
import { finalizeEvent, getPublicKey } from 'nostr-tools/pure'
import {Relay , useWebSocketImplementation} from 'nostr-tools/relay'
import WebSocket from 'ws'
useWebSocketImplementation(WebSocket)

const bobPrivKeyHex = "d2e71a977bc3900d6b0f787421e3d1a666cd12ca625482b0d9eeffd23489c99f"
const bobPrivKeyBin = hexToBytes(bobPrivKeyHex)
const bobPubKey = getPublicKey(bobPrivKeyBin)

const psf = "wss://nostr-relay.psfoundation.info"

const urlToLike = "https://example.com/"
// Generate like event
const likeEventTemplate = {
	kind: 17,
	created_at: Math.floor(Date.now() / 1000),
  pubkey: bobPubKey,
 	tags: [
    ['r' , urlToLike ], // "e" tag includes event id , relay reference  
  ], 
  content: '+', 
}


// Sign the post
const signedEvent = finalizeEvent(likeEventTemplate, bobPrivKeyBin)
console.log('signedEvent: ', signedEvent)

// Connect to a relay.
const relay = await Relay.connect(psf)
console.log(`connected to ${relay.url}`)

// Publish the message to the relay.
const result = await relay.publish(signedEvent)
console.log('result: ', result)

// Close the connection to the relay.
relay.close()



