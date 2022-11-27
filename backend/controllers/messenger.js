const pool = require("../models/db");


const addConversation = (req,res)=>{
    const companyId=req.params.companyId
    const userId=req.params.userId
    const message =req.body.message
    const sender =req.body.sender
    const Image =req.body.image

    const values = [companyId,userId,message,sender,Image]
    const query = `INSERT INTO conversations (companyId,userId,message,sender,image) VALUES($1,$2,$3,$4,$5) RETURNING *`
    pool.query(query,values).then((result)=>{
        res.status(200).json({
            success: true,
            massage: "Conversation added Successfully",
            result: result.rows,
          });
    }).catch((err)=>{
        res.status(500).json({
            success: false,
            massage: "server error",
            err: err,
          });
    })
  }

  
  const getConversation = (req, res) => {

    const companyId=req.params.companyId
    const userId=req.params.userId
    const values = [userId,companyId]

    const query = `SELECT * FROM conversations INNER JOIN users ON conversations.userId =users.id INNER JOIN companies ON conversations.companyId = companies.id WHERE companyId=$2 AND userId=$1`;
    pool
      .query(query,values)
      .then((result) => {
        res.status(200).json({
          success: true,
          massage: "All Users",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          massage: "server error",
          err: err,
        });
      });
  };


   
  const getCompanyConversations = (req, res) => {

    const companyId=req.params.companyId
    const userId=req.params.userId
    const values = [userId]
   
    const query = `SELECT sender,userid,companyid,image  FROM "conversations" INNER JOIN users ON conversations.userId =users.id where userid=${userId} GROUP BY sender ,userid,companyid,image`;
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          massage: "All Users",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          massage: "server error",
          err: err,
        });
      });
  };


  const getUserConversations = (req, res) => {

    const companyId=req.query.companyId
    const userId=req.params.userId
    const values = [companyId]
   
    const query = `SELECT sender,userid,companyid,image  FROM "conversations" INNER JOIN users ON conversations.userId =users.id where companyid=${companyId} GROUP BY sender ,userid,companyid,image`;
    pool
      .query(query)
      .then((result) => {
        res.status(200).json({
          success: true,
          massage: "All Users",
          result: result.rows,
        });
      })
      .catch((err) => {
        res.status(500).json({
          success: false,
          massage: "server error",
          err: err,
        });
      });
  };

  

  module.exports = {addConversation,getConversation,getCompanyConversations,getUserConversations};