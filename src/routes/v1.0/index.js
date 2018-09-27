const {
  Router
} = require('express');
const auth = require('./auth');
const projects = require('./projects');
const router = Router();

import {
  authenticate,
  paginate
} from '../../utils/middlewares';

/**
 * GET home page
 */

router.get('/', (req, res) => {
  res.json({
    version: 'v1.0'
  });
});


/**
 * Authentication
 */
router.post('/signup', auth.signup);
router.post('/login', auth.login);

// /**
//  * Projects
//  */
router.get('/projects', paginate, projects.get);
router.post('/projects', authenticate, projects.post);
router.post('/projects/:id/like', authenticate, projects.like);
router.post('/projects/:id/unlike', authenticate, projects.unlike);
router.post('/projects/:id/follow', authenticate, projects.follow);
router.post('/projects/:id/unfollow', authenticate, projects.unfollow);
router.get('/projects/:id', projects.getId);
router.put('/projects/:id', authenticate, projects.put);
router.delete('/projects/:id', authenticate, projects.remove);

export default router;