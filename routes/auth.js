const express = require('express');
const { AuthenticationClient } = require('forge-server-utils');

let router = express.Router();
let auth = new AuthenticationClient(process.env.APS_CLIENT_ID, process.env.APS_CLIENT_SECRET);

router.get('/token', async function(req, res, next) {
    try {
        const result = await auth.authenticate(['viewables:read']);
        res.json({ access_token: result });
    } catch(err) {
        next(err);
    }
});

module.exports = router;
