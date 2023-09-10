const {
    signIn,
    signUp,
    addCartItem,
  } = require("../controllers/auth");

  
const  express =  require("express");
const router = express.Router();


router.post('/signin/',  signIn);
router.post('/signup/',  signUp);
router.post('/addCart/:id/',  addCartItem);



module.exports = router;
