const endpointsJson = require("../../endpoints.json");
const {
    selectTopics, 
    selectArticleById, 
    selectAllArticles, 
    selectComments, 
    insertCommentByArticleId,
    updateArticleById,
    deleteCommentsById,
    selectAllUsers,
  
  } = require('../model/topics.model')

exports.getApi = (req, res) => {
    res.status(200).send({ endpoints: endpointsJson }); 
}

exports.getTopics = async (req, res) => {
    try {
        const topics = await selectTopics(req.query)
        res.status(200).send({topics})
    } catch(err) {
        console.log(err)
    }
}

  exports.getArticleById = async (req, res, next) => {
    try {
      const { article_id } = req.params; 
      selectArticleById(article_id) 
        .then((article) => {
          if (!article) {
            res.status(404).send({ msg: "Article not found" });
          }
          res.status(200).send({ article }); 
        })
        .catch(next); 
    } catch (err) {
      next(err);
    }
  };

  exports.getArticles = async (req, res, next) => {
    const { sort_by, order, topic } = req.query;
  
    try {
      const articles = await selectAllArticles({ sort_by, order, topic });
      res.status(200).send({ articles });
    } catch (err) {
      if (err.status) {
        res.status(err.status).send({ msg: err.msg });
      } else {
        next(err);
      }
    }
  };
  

  exports.getComments = async (req, res, next) => {
    try {
      const { article_id } = req.params;
      const comments = await selectComments(article_id);
      if (comments.length === 0) {
        return res.status(404).send({ msg: "No comments found for this article" });
      }
      res.status(200).send({ comments });
    } catch (err) {
      next(err);
    }
  };

  exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body;

    if (!username) {
        return res.status(400).send({ message: "Username is required" });
    }
    selectArticleById(article_id).then((article) => {
        if (!article) {
            return res.status(404).send({ message: "Article not found" });
        }
        selectAllUsers().then(users => {
            const userExists = users.some(user => user.username === username);
            if (!userExists) {
                return res.status(404).send({ message: "User not found" });
            }
            insertCommentByArticleId(article_id, username, body)
                .then((comment) => {
                    res.status(201).send({ comment });
                })
                .catch((err) => {
                    next(err);
                });
        }).catch(next); 
    }).catch(next); 
};


exports.patchArticle = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const { inc_votes } = req.body;

    if (!inc_votes || typeof inc_votes !== 'number') {
      return res.status(400).send({ message: "bad request" });
    }

    const updatedArticle = await updateArticleById(article_id, inc_votes);

    if (!updatedArticle) {
      return res.status(404).send({ message: "article not found" });
    }

    res.status(200).send({ article: updatedArticle });
  } catch (err) {
    next(err);
  }
};


exports.deleteComment = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    if (isNaN(comment_id)) {
      return res.status(400).send({ message: "bad request" });
    }
    const deleteComments = await deleteCommentsById(comment_id);
    if (!deleteComments) {
      return res.status(400).send({ message: "bad request" });
    }
    res.status(204).send({ comment: deleteComments });
  } catch(err) {
    next(err);
  }
}

exports.getUsers = async (req, res, next) => {
  try {
    const users = await selectAllUsers();
    if (!users.length) {
      return res.status(404).send({ msg: "No users found" });
    }
    res.status(200).send({ users });
  } catch (err) {
    next(err);
  }
};