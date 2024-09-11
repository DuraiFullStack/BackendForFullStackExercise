import jwt from 'jsonwebtoken'
import User from './models/userDetails.js'

export const middelware = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        throw Error("Authorization token required");
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({ _id }).select('_id')
        next()
    } catch (err) {
        res.status(401).json({error: err})
    }
};