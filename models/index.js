const User = require('./User');
const Blogcomment = require('./blogcomment');
const Blogpost =  require('./blogpost');


User.hasMany(Blogpost,{
    foreignKey:'user_id',
    onDelete:'CASCADE'
});


Blogpost.hasMany(Blogcomment,{
foreignKey:'blog_id',
onDelete:'CASCADE'

});

module.exports = {
    User,
    Blogcomment,
    Blogpost
}


