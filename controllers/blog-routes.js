const router = require('express').Router();
const {Blogpost} = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/all', async (req, res) => {

    try{
      const query =  "select * from blogpost"
     
  
    const blogData = await sequelize.query(
        query, 
        
        { 
          type: sequelize.QueryTypes.SELECT 
        }
      );
  
        const blogs= blogData;
  
       // console.log(posts);
       
        
        res.render('blog', {
            blogs,loggedIn:req.session.loggedIn
  
      });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  
  });


  
    

module.exports = router;