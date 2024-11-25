const db = require("../../db/connection");

exports.selectTopics = async () => {
    let sqlQuery = `SELECT * FROM topics;`
    const values = [];
    return db.query(sqlQuery, values).then(({rows}) => {
        return rows
    })

} // end of selectTopics

exports.selectArticleById = (article_id) => {
    return db
      .query(
        `SELECT author, title, article_id, body, topic, created_at, votes, article_img_url
         FROM articles
         WHERE article_id = $1;`,
        [article_id]
      )
      .then(({ rows }) => rows[0]); 
  }; //end of selectArticleById function
    
  exports.selectAllArticles = async () => {
    const query = `
      SELECT 
        articles.author, 
        articles.title, 
        articles.article_id, 
        articles.topic, 
        articles.created_at, 
        articles.votes, 
        articles.article_img_url, 
        COUNT(comments.comment_id)::INT AS comment_count
      FROM articles
      LEFT JOIN comments ON articles.article_id = comments.article_id
      GROUP BY articles.article_id
      ORDER BY articles.created_at DESC;
    `;
  
    const { rows } = await db.query(query);
    return rows;
  };


  exports.selectComments = async (article_id) => {
    const query = `
      SELECT 
        comment_id, 
        votes, 
        created_at, 
        author, 
        body, 
        article_id
      FROM comments
      WHERE article_id = $1
      ORDER BY created_at DESC;
    `;
  
    const { rows } = await db.query(query, [article_id]);
    return rows;
  };