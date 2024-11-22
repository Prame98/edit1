const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const cors = require('cors'); // CORS 모듈 추가

dotenv.config();
const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');  // authRouter 기억!
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board'); // 마이페이지에서 게시물보이기
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig(); // 패스포트 설정
app.set('port', process.env.PORT || 8001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:3000', // 프론트엔드 도메인 허용
  credentials: true, // 쿠키 공유를 위해 true 설정
}));


app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/board', boardRouter);

// 프론트와 api 연결!!!
app.use('/api/member',authRouter); // api/member경로로 들어오는 요청은 routes/auth.js
app.use('/api/board',postRouter)  // board.js요청
app.use('/uploads', express.static('uploads'));
app.use('/api/mypage', boardRouter)  // 사장님유저 마이페이지



app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

/*app.post('/auth/join', (req, res) => {
  console.log(req.body); // 요청 본문 출력
  const allVariables = req.body;
  console.log(allVariables);
  res.status(200).send('Request received');
});*/


app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});