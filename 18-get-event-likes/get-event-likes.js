/*
  Example script for reading event reactions 
  https://github.com/nostr-protocol/nips/blob/master/25.md
*/
import { RelayPool } from 'nostr'
import { hexToBytes } from '@noble/hashes/utils'
import { getPublicKey } from 'nostr-tools/pure'


// Bob is the reciver of the message
const bobPrivKeyHex = "d2e71a977bc3900d6b0f787421e3d1a666cd12ca625482b0d9eeffd23489c99f"
const bobPrivKeyBin = hexToBytes(bobPrivKeyHex)
const bobPubKey = getPublicKey(bobPrivKeyBin)

const alicePrivKeyHex = "3292a48aa331aeccce003d50d70fbd79617ba91860abbd2c78fa4a8301e36bc0"
const alicePrivKeyBin = hexToBytes(alicePrivKeyHex)
const alicePubKey = getPublicKey(alicePrivKeyBin)

const psf = "wss://nostr-relay.psfoundation.info"
const relays = [psf]

const pool = RelayPool(relays)

// Get Alice post likes
const evIdtWithLikes = 'd09b4c5da59be3cd2768aa53fa78b77bf4859084c94f3bf26d401f004a9c8167'
let eventLikes = 0
let bobReactions = 0
let aliceReactions = 0


await new Promise((resolve) => {
  pool.on('open', relay => {
    relay.subscribe("subid", { limit: 100, kinds: [7], "#e": [evIdtWithLikes] })
  });

  pool.on('eose', relay => {
    resolve()
    relay.close()
  });

  pool.on('event', (relay, sub_id, ev) => {
    // count likes 
    if (ev.content === '+') {
      eventLikes++
      // count bob likes
      if (ev.pubkey === bobPubKey) {
        bobReactions++
      }
      // count alice likes
      if (ev.pubkey === alicePubKey) {
        aliceReactions++
      }
    }
  });
})


console.log('Post Likes: ', eventLikes)
console.log(`Bob liked this post ${bobReactions}  times`)
console.log(`Alice liked this post ${aliceReactions}  times`)




