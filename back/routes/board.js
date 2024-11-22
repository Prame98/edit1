const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn, isOwner } = require('../middlewares');

const router = express.Router();

const { getMyBoards } = require('../controllers/board.js');

router.get('/myBoard', isLoggedIn, getMyBoards);
router.get('/like')

module.exports = router;