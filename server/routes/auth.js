const {
    signIn,
    signUp,
  } = require("../controllers/auth");

  
const  express =  require("express");
const router = express.Router();


router.post('/signin/',  signIn);
router.post('/signup/',  signUp);



module.exports = router;
