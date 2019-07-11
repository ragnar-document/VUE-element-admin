var express = require('express');
var router = express.Router();
var userController = require('./../controllers/user.js');
var classifyController = require('./../controllers/classify.js');
var articleController = require('./../controllers/article.js');
var authController  = require('./../controllers/auth.js');
var cors = require('./../middlewares/cors.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',cors.allowAll,authController.login);

router.get('/user',userController.list);
router.post('/user',userController.insert);
router.put('/user/:id',userController.update);

router.get('/classify',classifyController.list);
router.post('/classify',classifyController.insert);
router.put('/classify/:id',classifyController.update);

router.get('/article',articleController.list)
router.post('/article',articleController.insert)
router.put('/article/:id',articleController.updata)
router.get('/article/:id',articleController.show)

//删除集合
router.delete('/user/:id',userController.delete);
router.delete('/classify/:id',classifyController.delete);
router.delete('/article/:id',articleController.delete)



module.exports = router;
