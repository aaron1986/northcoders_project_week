const endpointsJson = require("../../endpoints.json");
const {
    selectTopics, 
    selectArticleById, 
    selectAllArticles, 
    selectComments, 
    insertCommentByArticleId,
    updateArticleById
  
  } = require('../model/topics.model')

exports.getApi = (req, res) => {
    res.status(200).send({ endpoints: endpointsJson }); 
};

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
    try {
      const articles = await selectAllArticles();
      res.status(200).send({ articles });
    } catch (err) {
      next(err);
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


  exports.postComment = async (req, res, next) => {
    try {
      const { article_id } = req.params
      const { username, body } = req.body
      insertCommentByArticleId(article_id, username, body)
          .then((comment) => {
              res.status(201).send({ comment })
          })
          .catch((err) => {
              next(err)
          })
    } catch (err) {
        if (err.code === "23503") {
            res.status(404).send({ msg: "User not found" });
        } else if (err.code === "22P02") {
            res.status(400).send({ msg: "Invalid article_id format" });
        } else {
            next(err);
        }
    }
};

  exports.postComment = async (req, res, next) => {
   try {
    const { article_id } = req.params
    const { username, body } = req.body
    if (!username) {
      return res.status(400).send({ message: "Username is required" });
  }
    insertCommentByArticleId(article_id, username, body)
        .then((comment) => {
            res.status(201).send({ comment })
        })
        .catch((err) => {
            next(err)
        })
   } catch(err) {
    console.log(err)
   }
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


