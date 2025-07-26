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


const evIdToLike = 'd09b4c5da59be3cd2768aa53fa78b77bf4859084c94f3bf26d401f004a9c8167'
const evIdAuthorPubKey = '2c7e76c0f8dc1dca9d0197c7d19be580a8d074ccada6a2f6ebe056ae41092e92'
// Generate like event
const likeEventTemplate = {
	kind: 7,
	created_at: Math.floor(Date.now() / 1000),
  pubkey: bobPubKey,
 	tags: [
    ['e', evIdToLike , psf ], // "e" tag includes event id , relay reference  
    ['p', psf , evIdAuthorPubKey] , //  "p" tag include relay reference
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



