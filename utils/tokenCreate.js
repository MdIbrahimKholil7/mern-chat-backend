
const jwt = require('jsonwebtoken');

const jwtToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: '7d'
    })
}

module.exports = jwtToken