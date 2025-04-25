/*
  Convert an npub to a pubkey
*/

// Global npm libraries
import * as nip19 from 'nostr-tools/nip19'

// Copied a random npub from Nostr
// const npub = 'npub1eg59l0mdz29d7srvg9kr8g76lspy9effny25qp425sl2mhcqfmeqqrpnw6'
const eventId = '9ec3877eb681ddbc64beb67cbf336757533e62335aace7da70e2c07c041e296a'

const result = nip19.noteEncode(eventId)
console.log('result: ', result)

console.log(`https://astral.psfoundation.info/${result}`)
