/*
  Example script converting a Nostr public key (npub) to a BCH address.

  Based on proof-of-concept described in this code repository:
  https://github.com/bastiancarmy/nostr-multi-chain-tipping-nip/tree/main/examples/javascript/pay-to-npub
*/

import { getPublicKey } from 'nostr-tools/pure'
import { hexToBytes } from '@noble/hashes/utils'


// This information generated with the 08 example.
// mnemonic: balcony anger hotel predict dress boss despair maid stamp sad cable evidence
// derivation: m/44'/145'/0'/0/0
// WIF private key: 'L59ueCCar4VcAdxtFUTYpLbnFfo1YHArzFXoBeNp9PQkiaK2N2gz'
const nostrPubKey = 'ad8321f338063a55398ec95973108c3ab96efba711fce852abd8ed9e035d1b9c'
const expectedBchAddr = 'bitcoincash:qphprq55tz8vq0m9q9q3g3ucqs89p9dhnq329uce9a'

async function start() {
  try {

  } catch(err) {
    console.error('Error: ', err)
  }
}
start()