const endpointsJson = require("../../endpoints.json");
const {selectTopics, selectArticleById, selectAllArticles} = require('../model/topics.model')

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