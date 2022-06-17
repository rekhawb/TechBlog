const router = require('express').Router();

const {Blogpost,User,Blogcomment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

router.post('/newuser', async (req, res) => {
    try {
      const newUserData = await User.create({
        name:req.body.name,
        email: req.body.email,
         password: req.body.password
         
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.user_id = newUserData.user_id;
  
        res.status(200).json(newUserData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });


  
router.post('/addblogpost', async (req, res) => {
    try {
      const newBlogData = await Blogpost.create({
        name:req.body.name,
        description: req.body.description,
        user_id:req.session.user_id
         
      });
  
      req.session.save(() => {
        req.session.loggedIn = true;
  
        res.status(200).json(newBlogData);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });



  
router.put('/updateblog/:id',  (req, res) => {
    Blogpost.update({
        name: req.body.name,
        description: req.body.description
      },
      {
        where: {
          blog_id: req.params.id
        }
      })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  
router.delete('/myblogs/:id',  (req, res) => {
    Blogpost.destroy({
      where: {
        blog_id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No event found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  


  router.post('/comments', withAuth, (req, res) => {
    // check the session
    if (req.session.loggedIn) {
     Blogcomment.create({
        blog_comment: req.body.comment_text,
        blog_id: req.body.blog_id,
        // use the id from the session
       user_id: req.session.user_id,
      })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    }
  });
  

   
module.exports = router;