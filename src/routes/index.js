const {
  Router
} = require('express');

const routerOne = require('./v1.0').default;
const router = Router();
router.use('/v1.0', routerOne);

export default router;