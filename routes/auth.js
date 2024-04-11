const express = require('express');
const { SdkManagerBuilder } = require('@aps_sdk/autodesk-sdkmanager');
const { AuthenticationClient, Scopes } = require('@aps_sdk/authentication');

const sdkManager = SdkManagerBuilder.create().build();
const authenticationClient = new AuthenticationClient(sdkManager);

let router = express.Router();

router.get('/token', async function(req, res, next) {
    try {
        const credentials = await authenticationClient.getTwoLeggedToken(process.env.APS_CLIENT_ID, process.env.APS_CLIENT_SECRET, [Scopes.ViewablesRead]);
        res.json(credentials);
    } catch(err) {
        next(err);
    }
});

module.exports = router;
