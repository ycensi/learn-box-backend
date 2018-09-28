import models from '../../models';
import {
  asyncMiddleware
} from '../../utils/middlewares';

export const get = asyncMiddleware(async (req, res, next) => {
  const page = req.page;
  const pageSize = req.pageSize;

  try {
    const result = await models.Project.findAndCountAll({
      offset: page * pageSize,
      limit: pageSize
    });

    res.set('x-page', page);
    res.set('x-page-size', pageSize);
    res.set('x-total-count', result.count);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

export const like = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const UserId = req.user.id;

  try {
    const project = await models.Project.findById(id);
    project.addLikes(UserId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export const unlike = asyncMiddleware(async (req, res, next) => {
  const ProjectId = req.params.id;
  const UserId = req.user.id;

  try {
    await models.ProjectLike.destroy({
      where: {
        ProjectId,
        UserId
      }
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export const follow = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const UserId = req.user.id;

  try {
    const project = await models.Project.findById(id);
    project.addFollowers(UserId);
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

export const unfollow = asyncMiddleware(async (req, res, next) => {
  const ProjectId = req.params.id;
  const UserId = req.user.id;

  try {
    await models.ProjectFollower.destroy({
      where: {
        ProjectId,
        UserId
      }
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});


export const post = asyncMiddleware(async (req, res, next) => {
  const projectBody = req.body;
  projectBody.UserId = req.user.id;

  try {
    const newProject = await models.Project.create(projectBody);
    res.json({
      newProjectId: newProject.id
    });
  } catch (err) {
    next(err);
  }
});

export const getId = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await models.Project.findById(id, {
      include: [{
          model: models.User,
          as: 'Likes',
          required: false,
          attributes: ['id', 'name', 'username'],
        },
        {
          model: models.User,
          as: 'Followers',
          required: false,
          attributes: ['id', 'name', 'username']
        }
      ],
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});


export const put = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const UserId = req.user.id;
  const projectBody = req.body;

  try {
    const updatedProject = await models.Project.update(projectBody, {
      where: {
        id,
        UserId
      }
    });

    res.json({
      updatedProjectId: updatedProject.id
    });
  } catch (err) {
    next(err);
  }
});

export const remove = asyncMiddleware(async (req, res, next) => {
  const id = req.params.id;
  const UserId = req.user.id;

  try {
    await models.Project.update({
      deleted: true
    }, {
      where: {
        id,
        UserId
      }
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});