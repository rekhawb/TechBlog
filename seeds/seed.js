const sequelize = require('../config/connection');
const { User,Blogpost,Blogcomment} = require('../models');

const userdata = require('./userdata.json');
const blogpostdata = require('./blogpostdata.json');
const blogcommentdata = require('./blogcommentdata.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userdata, {
    individualHooks: true,
    returning: true,
  });


  const blogpost= await Blogpost.bulkCreate(blogpostdata, {
    individualHooks: true,
    returning: true,
  });

  const blogcomment = await Blogcomment.bulkCreate(blogcommentdata, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
