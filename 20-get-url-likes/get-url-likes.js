/*
  Example script for reading event reactions 
  https://github.com/nostr-protocol/nips/blob/master/25.md
*/
import { RelayPool } from 'nostr'
import { hexToBytes } from '@noble/hashes/utils'
import { getPublicKey } from 'nostr-tools/pure'


// Bob is the receiver of the message
const bobPrivKeyHex = "d2e71a977bc3900d6b0f787421e3d1a666cd12ca625482b0d9eeffd23489c99f"
const bobPrivKeyBin = hexToBytes(bobPrivKeyHex)
const bobPubKey = getPublicKey(bobPrivKeyBin)
const psf = "wss://nostr-relay.psfoundation.info"
const relays = [psf]

const pool = RelayPool(relays)

// Get Alice post likes
const urltWithLikes = "https://example.com/"
let urlLikes = 0
let bobReactions=0

await new Promise((resolve) => {
  pool.on('open', relay => {
    relay.subscribe("subid", { limit: 100, kinds: [17], "#r": [urltWithLikes] })
  });

  pool.on('eose', relay => {
    resolve()
    relay.close()
  });

  pool.on('event', (relay, sub_id, ev) => {
    // count likes 
    if (ev.content === '+') {
      urlLikes++
      if (ev.pubkey === bobPubKey) {
        bobReactions++
      }
    }
  });
})

console.log('Url Likes : ', urlLikes)
console.log(`Bob like this url ${bobReactions}  times`)





