const { recoverPersonalSignature, signTypedData } = require("@metamask/eth-sig-util");
const express = require('express')
const crypto = require('crypto')

const app = express(),
    bodyParser = require("body-parser");
    port = 3003;
var cors = require("cors");

let nextNonce = null
const url = `http://localhost:${port}`;

app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }))

app.listen(port, ()=>{
    console.log('Server is listening on port ' + port)
})

//  Get the nonce for user
app.post('/nonce', (req, res) => {
    nextNonce = crypto.randomBytes(16).toString('base64')
    return res.json({ nonce: nextNonce })
})

//  Verify Signature
app.post('/verify', (req, res) => {
    
    console.log("CALL VERIFY")

    const address = req.body.address
    const sig = req.body.signature
    console.log(nextNonce.toString('base64'))

    const recoveredAddress = recoverPersonalSignature({
        data: `${nextNonce.toString('hex')}`,
        signature: sig,
    });

    nextNonce = crypto.randomBytes(16).toString('base64')

    if (recoveredAddress == address) {
        console.log('Signature Verified')
        return res.json({ verified: true })
    }
    return res.json({ verified: false })
})