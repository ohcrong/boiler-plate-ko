const { User } = require('../models/User');

let auth = (req, res, next) => {
    //인증처리

    //클라이언트 쿠키에서 토큰 가져온다
    let token = req.cookies.x_auth;
    //토큰을 decode한 후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        //유저 있으면 okay
        //유저 없으면 no
        if (err) throw err
        if (!user) return res.json({ isAuth: false, error: true })

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };