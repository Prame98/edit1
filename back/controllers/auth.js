const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');


// 회원가입!
exports.join = async (req, res, next) => {
  console.log("회원가입 요청 데이터: ", req.body);
  const { userId, nickname, password, userType, address, time } = req.body;
  try {
    console.log(req.body);
    const exUser = await User.findOne({ where: { userId } });
    // 로그인 - 일단 이 아이디로 가입한 유저가 있는지 찾기
    if (exUser) {
      return res.redirect('/join?error=exist');  // 이미 존재하는 이메일입니다
    }
    const hash = await bcrypt.hash(password, 12); // bcrypt 비밀번호 암호화
    await User.create({
      userId,
      nick: nickname,
      password: hash,
      userType,
      address: JSON.stringify(address),
      time: userType==='owner' ? time : null  //사장님유저일때만 time컬럼값 가짐
    });
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

// 로그인! 
exports.login = (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.status(400).json({ responseMessage: info.message });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      let parasedAddress ={};
      try{
        if(user.address){
        parasedAddress = JSON.parse(user.address);}
      } catch(e){
        console.log("address를 json파싱 하는데에 실패ㅠㅠ",e)
      } 


    /*  const responseData = {
        userId: user.userId,
        nickname: user.nickname,
        address: parsedAddress,
        userType: user.userType,
    };
      console.log("로그인 응답 데이터는?: ", responseData);*/



      // 여기서 JSON으로 응답을 반환해야
      return res.status(200).json({ 
        userId: user.userId, 
        nickname: user.nickname,
        address: parasedAddress,
        userType: user.userType,
       });
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
};
