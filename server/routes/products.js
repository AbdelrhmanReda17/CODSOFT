const {
    getFeaturedProducts,
    getProducts,
    createProduct,
    getAll,
    getProduct,
    getProductsBySearch,
    getProductsByCategory,
    getProductsByPrice,
    createReview
  } = require("../controllers/products");

  
const  express =  require("express");
const router = express.Router();


router.get('/',  getProducts);
router.get('/featured',  getFeaturedProducts);
router.get('/search',  getProductsBySearch);
// router.get('/category',  getProductsByCategory);
router.get('/men/:sort',  (req, res) => {getAll('men' , req ,res)});
router.get('/women/:sort',  (req, res) => {getAll('women' , req ,res)});
router.get('/women/price/:price', (req, res) => {getProductsByPrice('women' , req ,res)});
router.get('/men/price/:price', (req, res) => {getProductsByPrice('men' , req ,res)});
router.get('/women/category/:category', (req, res) => {getProductsByCategory('women' , req ,res)});
router.get('/men/category/:category', (req, res) => {getProductsByCategory('men' , req ,res)});
router.get('/:id',  getProduct);

router.post('/:id/',  createReview);

router.post('/',  createProduct);



module.exports = router;
