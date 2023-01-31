import {SHA256} from 'crypto-js';

export default function hash (state){
    state.checksum = "";
    let hash = SHA256(JSON.stringify(state, null, 2));
    //console.log(hash.toString());
    //console.log(JSON.stringify(state, null, 2));
    state.checksum = hash.toString();
}

//get JSON from store
//erase JSON.hash
//calculate new hash
//add back into JSON.hash
