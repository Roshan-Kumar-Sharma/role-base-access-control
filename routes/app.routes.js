const express = require("express");
const { token } = require("morgan");
const guard = require("express-jwt-permissions")({
    requestProperty: "token",
    permissionsProperty: "scope",
});
const { signAccessToken, verifyAccessToken } = require("../helpers/tokens");
const router = express.Router();

router.post(
    "/posts",
    async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return next(new Error("Token not found"));
            }
            const token = req.headers.authorization.split(" ")[1];

            const payload = await verifyAccessToken(token);

            req.payload = payload;
            req.token = { scope: payload.scope };
            console.log("req.token: ", req.token);
            guard.check(["login", "posts"])(req, res, next);
        } catch (err) {
            return next(err);
        }
    },
    (req, res, next) => {
        res.send("https://jsonplaceholder.typicode.com/posts");
    }
);

router.post(
    "/users",
    async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                return next(new Error("Token not found"));
            }
            const token = req.headers.authorization.split(" ")[1];

            const payload = await verifyAccessToken(token);

            req.payload = payload;
            // req.token = "login";
            req.token = { scope: payload.scope };
            console.log("req.token: ", req.token);
            guard.check(["login", "users"])(req, res, next);
        } catch (err) {
            return next(err);
        }
    },
    (req, res, next) => {
        res.send("https://jsonplaceholder.typicode.com/users");
    }
);

router.get("/token/:permissions", async (req, res, next) => {
    try {
        const tokenData = {
            username: "roshan",
            scope: req.params.permissions,
            eat: "1m",
        };
        console.log(tokenData);
        const accessToken = await signAccessToken(tokenData);
        res.send({
            TOKEN: accessToken,
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
