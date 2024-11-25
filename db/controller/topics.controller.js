const endpointsJson = require("../../endpoints.json");
const {selectTopics} = require('../model/topics.model')

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