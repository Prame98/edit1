const { Post, Hashtag } = require('../models');
const { User } = require('../models');

exports.afterUploadImage = (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
};

// 게시물작성!
exports.uploadPost = async (req, res, next) => {
  console.log("게시물작성 입력 데이터: ", req.body);
  const { title, content, category, image, original_price, discount_rate, sale_end_date } = req.body;

  if (!category || !['bread', 'rice_cake', 'side_dish', 'grocery', 'etc']
    .includes(category)) {
    return res.status(400).json({ responseMessage: '카테고리를 선택해주세요.' });
  }

  try {
    const post = await Post.create({
      title: req.body.title,
      content: req.body.content,
      original_price: req.body.original_price,
      discount_rate: req.body.discount_rate,
      sale_end_date: req.body.sale_end_date,
      category: req.body.category,
      image: req.file ? `/uploads/${req.file.filename}` : null,  // 프론트로의 이미지 건네주는 경로
      UserId: req.user.id,
    });

    return res.status(201).json({ 
      id: post.id,
      responseMessage: '게시물이 성공적으로 작성되었습니다.', post });
  } 
  catch (error) {
    console.error(error);
    return next(error);
  }
};



// 게시물 목록을 가져와 JSON 형식으로 응답하는 컨트롤러
exports.getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 0; // 페이지 번호, 기본값 0
    const size = parseInt(req.query.size, 10) || 10; // 페이지당 항목 수, 기본값 10
    const sort = req.query.sort ? req.query.sort.split(',') : ['createdAt', 'DESC']; // 정렬 기준, 기본값: createdAt 기준 내림차순

    const offset = page * size;
    const limit = size;
    const order = [[sort[0], sort[1].toUpperCase()]]; // 정렬 기준과 순서 설정

    const posts = await Post.findAll({
      offset: page * size,
      limit: size,
      order: [sort],
      include: [
        {
          model: User,
          attributes: ['id', 'nick'], // 작성자의 정보
        },
      ],
    });

    // 프론트엔드에서 기대하는 데이터 형식으로 변환하여 응답
    const responseDtos = posts.map(post => ({
      id: post.id,
      title: post.title,
      content: post.content,
      image: post.image, // 이미지 경로
      category: post.category, // 카테고리 정보
      original_price: post.original_price, // 원래 가격
      discount_rate: post.discount_rate, // 할인율
      price: post.original_price * (1 - post.discount_rate / 100), // 할인가 계산
      sale_end_date: post.sale_end_date, // 판매 종료일
      status: post.sale_end_date && new Date(post.sale_end_date) < new Date() ? '거래완료' : '판매중', // 판매 상태
      nickname: post.User.nick, // 상점명 (사장님 닉네임)
    }));

    return res.status(200).json({
      data: {
        responseDtos: responseDtos,
        page: page,
        size: size,
      }
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

 


    //const hashtags = req.body.content.match(/#[^\s#]*/g);
    /*
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag => {
          return Hashtag.findOrCreate({
            where: { title: tag.slice(1).toLowerCase() },
          })
        }),
      );
      await post.addHashtags(result.map(r => r[0]));
    }
    res.redirect('/');
  } catch (error) {
    console.error(error);
    next(error);
  }
}; */