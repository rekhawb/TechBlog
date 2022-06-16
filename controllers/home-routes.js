
const router = require('express').Router();
const {Blogpost,User} = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {

    try{
      const query =  "select b.blog_id,b.name as blogname,b.description,b.blog_dt as blogdt,u.name as name from blogpost b  INNER JOIN user u  on b.user_id  = u.user_id;"
     
  
    const blogData = await sequelize.query(
        query, 
        
        { 
          type: sequelize.QueryTypes.SELECT 
        }
      );
  
        const blogs= blogData;
  
       // console.log(posts);


       console.log(req.session.loggedIn);
     
        res.render('blog', {
            blogs,loggedIn:req.session.loggedIn,user_id:req.session.user_id

      });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  
  });


  router.get('/myblogs', async (req, res) => {
if(!req.session.loggedIn){
  req.session.loggedIn = false;
  res.render('login',{loggedIn:req.session.loggedIn,user_id:req.session.user_id})
}else{

  try{
    const query =  "select b.blog_id,b.name as blogname,b.description,b.blog_dt as blogdt from blogpost b INNER JOIN user u ON b.user_id = u.user_id and b.user_id  = "+req.session.user_id+";"
   

  const blogData = await sequelize.query(
      query, 
      
      { 
        type: sequelize.QueryTypes.SELECT 
      }
    );

      const blogs= blogData;

     
      res.render('myblogs', {
          blogs,loggedIn:req.session.loggedIn,user_id:req.session.user_id

    });
  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }

}
   
  
  });





  router.get('/login',async (req, res) => {

    res.render('login',{loggedIn:req.session.loggedIn,user_id:req.session.user_id});
  });


  router.get('/newblogpost',async (req, res) => {

    res.render('newblogpost',{loggedIn:req.session.loggedIn,user_id:req.session.user_id});
  });


  
router.post('/login', async (req, res) => {
  try {
    console.log(req.body.email);
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.user_id;
      req.session.loggedIn = true;
      req.session.user = userData.name;
      if( userData.name === "admin"){
        //console.log(userData.name);
        req.session.admin = true;
      }

      
      res.
      status(200)
    //  .render('homepage',{loggedIn: req.session.loggedIn})
      .json({ user: userData,loggedIn:req.session.loggedIn, user_id:req.session.user_id,message: 'You are now logged in!' });
      
    });

  } catch (err) {
    res.status(400).json(err);
  }
});



router.get('/comment/:id', async (req, res) => {

  try{
    const query =  "select b.blog_id,b.blog_comment as description, b.blog_comment_dt as blog_dt, u.name as name from blogcomment b  INNER JOIN user u  on b.user_id  = u.user_id and b.blog_id = "+req.params.id+";"
   

  const commentData = await sequelize.query(
      query, 
      
      { 
        type: sequelize.QueryTypes.SELECT 
      }
    );

  

     // console.log(posts);


     //console.log(req.session.loggedIn);
     req.session.save(() => {
      req.session.blog_id = commentData.blog_id;
      const comments= commentData;
   
      res.render('blogpostcomment', {
          comments,loggedIn:req.session.loggedIn,user_id:req.session.user_id,blog_id:req.session.blog_id
        });
    });
  }
  catch (err) {
      console.log(err);
      res.status(500).json(err);
  }

});




router.post('/logout', (req, res) => {
  console.log(req.session.loggedIn);
  if (req.session.loggedIn) {
    req.session.loggedIn = false;

    req.session.destroy(() => {
     // req.session.loggedIn = false;
      res.status(204).end();
      
    });
  } else {
    res.status(404).end();
  }
});






router.get('/signup', async (req, res) => {
  res.render('signup');
});



router.get('/myblogs/:id', async (req, res) => {
  if(!req.session.loggedIn){
    req.session.loggedIn = false;
    res.render('login',{loggedIn:req.session.loggedIn,user_id:req.session.user_id})
  }else{
  
    try{
      const query =  "select b.name as blogname,b.description,b.blog_dt as blogdt from blogpost b  where  b.blog_id  = "+req.params.id+";"
     
  
    const blogData = await sequelize.query(
        query, 
        
        { 
          type: sequelize.QueryTypes.SELECT 
        }
      );
  
        const blogs= blogData;
  
       
        res.render('editblog', {
            blogs,loggedIn:req.session.loggedIn,user_id:req.session.user_id
  
      });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
  
  }
     
    
    });

  module.exports = router;