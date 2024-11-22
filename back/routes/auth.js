const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { join, login, logout } = require('../controllers/auth');


const router = express.Router();

// POST /auth/join
//router.post('/join', isNotLoggedIn, join); 
//회원가입 요청 -> 로그인아닌 상태에만 가능 -> join은 controllers/auth.js
//             -> await User.create 수행 -> 여기서 User는 models/user.js
router.post('/signup', isNotLoggedIn, join);
router.post('/login', isNotLoggedIn, login);



// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// GET /auth/kakao
router.get('/kakao', passport.authenticate('kakao'));

// GET /auth/kakao/callback
router.get('/kakao/callback', passport.authenticate('kakao', {
  failureRedirect: '/?error=카카오로그인 실패',
}), (req, res) => {
  res.redirect('/'); // 성공 시에는 /로 이동  
});

module.exports = router;