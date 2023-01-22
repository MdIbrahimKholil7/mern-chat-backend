const jwt = require('jsonwebtoken');

exports.verifyJwt = (req, res, next) => {
    const authorization = req.headers.authorization
    if (!authorization) {
        return res.status(401).send({ message: 'unAuthorized access' })
    }
    const token = authorization.split(' ')[1]
 
    if (!token || token === 'undefined') return res.status(401).send({ message: 'Forbidden' })
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {

        if (err) {
            console.log(err)
            return res.status(403).send({ message: 'Forbidden' })
        }

        req.decoded = decoded
        next()

    })
}

