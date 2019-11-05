const { Router } = require("express");
const auth = require("./auth");
const courses = require("./courses");
const router = Router();

import { authenticate, paginate } from "../../utils/middlewares";

/**
 * GET home page
 */

router.get("/", (req, res) => {
  res.json({
    version: "v1.0"
  });
});

router.post("/", (req, res) => {
  res.json(req.body);
});

/**
 * Authentication
 */
router.post("/signup", auth.signup);
router.post("/login", auth.login);

/**
 * Courses
 */
router.get("/course/all", paginate, courses.get);
router.get("/course/my-courses", authenticate, courses.userCourses);
router.post("/course/:id/join", authenticate, courses.join);
router.post("/course/:id/leave", authenticate, courses.leave);
router.post(
  "/course/:id/current-lesson",
  authenticate,
  courses.updateCurrentLesson
);

// /**
//  * Projects
//  */
// router.get('/projects', paginate, projects.get);
// router.post('/projects', authenticate, projects.post);
// router.post('/projects/:id/like', authenticate, projects.like);
// router.post('/projects/:id/unlike', authenticate, projects.unlike);
// router.post('/projects/:id/follow', authenticate, projects.follow);
// router.post('/projects/:id/unfollow', authenticate, projects.unfollow);
// router.get('/projects/:id', projects.getId);
// router.put('/projects/:id', authenticate, projects.put);
// router.delete('/projects/:id', authenticate, projects.remove);

export default router;
