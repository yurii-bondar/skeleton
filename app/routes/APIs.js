const Router = require('koa-router');
const passport = require('koa-passport');

const baseRoutes    = new Router(),
      authRoutes    = new Router(),
      userRoutes    = new Router(),     
      postRoutes    = new Router(),
      likesRoutes   = new Router(),
      commentRoutes = new Router();


baseRoutes
      .prefix('/api')
      .get(`/service`, require('../controllers/index').startPage)              // info about service
      .get(`/get-sys-mysql`, require('../controllers/test').getSysInfoMysql);  // get sys info from mysql (for test)

authRoutes
      .prefix('/api/auth')
      .post('/register', require('../controllers/auth').register) // user registration
      .post('/login', require('../controllers/auth').login);      // user login

userRoutes
      .prefix('/api/users')
      .get('/:_id', passport.authenticate('jwt', { session: false }), require('../controllers/users').getUserById)

postRoutes
      .prefix('/api/posts')
      .post('/', passport.authenticate('jwt', { session: false }), require('../controllers/posts').save)          // save post
      .get('/', require('../controllers/posts').getByUserId)                                                      // get posts by user/users id/Ids
      .get('/:id', require('../controllers/posts').getByPostId)                                                   // get post by postId
      .put('/', passport.authenticate('jwt', { session: false }), require('../controllers/posts').update)         // update post
      .delete('/:_id', passport.authenticate('jwt', { session: false }), require('../controllers/posts').delete); // delete post

likesRoutes
      .prefix('/api/posts/:postId/likes')
      .post('/', passport.authenticate('jwt', { session: false }), require('../controllers/likes').like)             // like post
      .delete('/:likeId', passport.authenticate('jwt', { session: false }), require('../controllers/likes').dislike) // dislike post

commentRoutes
      .prefix('/api/posts/:postId/comments')
      .post('/', passport.authenticate('jwt', { session: false }), require('../controllers/comments').create)              // create comment
      .delete('/:commentId', passport.authenticate('jwt', { session: false }), require('../controllers/comments').delete)  // delete comment
    
      
module.exports = {
      baseRoutes() {
            return baseRoutes.routes();
      },
      authRoutes() {
            return authRoutes.routes();
      },
      postRoutes() {
            return postRoutes.routes();
      },
      likesRoutes() {
            return likesRoutes.routes();
      },
      commentRoutes() {
            return commentRoutes.routes()
      },
      userRoutes() {
            return userRoutes.routes()
      }
};
