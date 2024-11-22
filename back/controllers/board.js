// controllers/board.js
const { Post } = require('../models');


// 사장님유저 마이페이지에 자기 게시물 보이게 하기
exports.getMyBoards = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: { userId: req.user.id }, // 로그인한 사용자의 ID로 필터링
      order: [['createdAt', 'DESC']], // 최신 게시물 순으로 정렬
    });
    res.status(200).json({
      data: posts,
      message: "Successfully retrieved user's posts.",
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
