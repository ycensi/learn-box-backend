import models from "../../models";
import { asyncMiddleware } from "../../utils/middlewares";

const { Course, User, CourseStudent } = models;

export const get = asyncMiddleware(async (req, res, next) => {
  const page = req.page;
  const pageSize = req.pageSize;

  try {
    const result = await Course.findAndCountAll({
      offset: page * pageSize,
      limit: pageSize
    });

    res.set("x-page", page);
    res.set("x-page-size", pageSize);
    res.set("x-total-count", result.count);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

export const userCourses = asyncMiddleware(async (req, res, next) => {
  const UserId = req.user.id;

  try {
    const result = await models.sequelize.query(
      `SELECT Course.id AS id, CourseStudent.currentLesson, CourseStudent.updatedAt AS lastClassAt, 
      Course.title AS title, Course.description AS description, 
      Course.level AS level, Course.active AS active
      FROM CourseStudents AS CourseStudent 
      INNER JOIN Courses AS Course ON CourseStudent.CourseId = Course.id AND Course.active = true 
        WHERE CourseStudent.UserId = ${UserId}`,
      {
        type: models.sequelize.QueryTypes.SELECT
      }
    );

    res.json(result);
  } catch (err) {
    next(err);
  }
});

export const leave = asyncMiddleware(async (req, res, next) => {
  const CourseId = req.params.id;
  const UserId = req.user.id;

  try {
    await models.CourseStudent.destroy({
      where: {
        CourseId,
        UserId
      }
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export const updateCurrentLesson = asyncMiddleware(async (req, res, next) => {
  const CourseId = req.params.id;
  const UserId = req.user.id;
  const { currentLesson } = req.body;

  try {
    await models.CourseStudent.update(
      {
        currentLesson
      },
      {
        where: {
          CourseId,
          UserId
        }
      }
    );
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export const join = asyncMiddleware(async (req, res, next) => {
  const CourseId = req.params.id;
  const UserId = req.user.id;

  try {
    const course = await models.Course.findById(CourseId);
    course.addStudents(UserId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});
