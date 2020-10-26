module.exports = function (options) {
    return function (req, res, next) {
      // Implement the middleware function based on the options object

      sess = req.session;
      if(sess.user_data){

        next();
      }else{
      
        res.status(200).redirect('/cms/login')
      }
     
    }
  }