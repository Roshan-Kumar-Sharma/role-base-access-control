const jwt = require("jsonwebtoken");
const env = require("./secret");

module.exports = {
    signAccessToken: (data) => {
        return new Promise((resolve, reject) => {
            const payload = data;
            const options = {
                issuer: "codewithroshan@gmail.com",
                expiresIn: data.eat,
            };
            jwt.sign(
                payload,
                env.ACCESS_TOKEN_SECRET,
                options,
                (err, token) => {
                    if (err) {
                        return reject(new Error(err));
                    }
                    return resolve(token);
                }
            );
        });
    },
    verifyAccessToken: (accessToken) => {
        return new Promise((resolve, reject) => {
            jwt.verify(accessToken, env.ACCESS_TOKEN_SECRET, (err, payload) => {
                if (err) return reject(new Error(err));
                return resolve(payload);
            });
        });
    },
};
