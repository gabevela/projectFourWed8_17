const express = require('express');
const router = express.Router();
const articlesCtrl = require('../../controllers/articles');

// this handles  POST /api/articleSubmissions
router.post('/', articlesCtrl.create)

// this handles GET /api/articleSubmissions/allArticles
router.get('/allArticles', articlesCtrl.index)


// this gets the numeric value of the articles in the db 
router.get('/articleCount', articlesCtrl.fetchArticleCount)


module.exports = router;