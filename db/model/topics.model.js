const db = require("../../db/connection");


exports.selectTopics = async () => {
    let sqlQuery = `SELECT * FROM topics;`
    return db.query(sqlQuery).then(({rows}) => {
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
    
  exports.selectAllArticles = async ({ sort_by = "created_at", order = "desc" }) => {
    const validSortBy = ["author", "title", "article_id", "topic", "created_at", "votes", "article_img_url", "comment_count"];
    const validOrder = ["asc", "desc"];
  
    if (!validSortBy.includes(sort_by)) {
      throw { status: 400, msg: "Invalid sort_by query" };
    }
  
    if (!validOrder.includes(order)) {
      throw { status: 400, msg: "Invalid order query" };
    }
  
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
      ORDER BY ${sort_by} ${order};
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


  //POST COMMENTS
  exports.insertCommentByArticleId = async (article_id, username, body) => {
    const queryStr = `
        INSERT INTO comments
            (body, author, article_id)
        VALUES ($1, $2, $3)
        RETURNING *;`

    return db.query(queryStr, [body, username, article_id]).then(({ rows }) => {
        return rows[0]
    })
  };

  //Patch article_id
exports.updateArticleById = async (article_id, newVotes) => {
  const sqlQuery = `
    UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING *;
  `;
  const { rows } = await db.query(sqlQuery, [newVotes, article_id]);
  return rows[0];
};

exports.deleteCommentsById = async(comment_id) => {
  const deleteQuery = `
  DELETE FROM comments
  WHERE comment_id = $1 
  RETURNING *;
`;
const {rows} = await db.query(deleteQuery, [comment_id])
return rows[0]
}

exports.selectAllUsers = async () => {
  const usersQuery = `
    SELECT username, name, avatar_url
    FROM users;
  `;

  const { rows } = await db.query(usersQuery);
  return rows;
};