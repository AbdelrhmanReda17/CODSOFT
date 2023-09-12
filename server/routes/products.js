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
// router.get('/search',  getProductsBySearch);

router.get('/men/search/',  (req, res) => {getProductsBySearch('men' , req ,res)});
router.get('/women/search/',  (req, res) => {getProductsBySearch('women' , req ,res)});
router.get('/accessories/search/',  (req, res) => {getProductsBySearch('accessories' , req ,res)});
router.get('/all/search/',  (req, res) => {getProductsBySearch('all' , req ,res)});

// router.get('/category',  getProductsByCategory);
router.get('/men/:sort',  (req, res) => {getAll('men' , req ,res)});
router.get('/women/:sort',  (req, res) => {getAll('women' , req ,res)});
router.get('/accessories/:sort',  (req, res) => {getAll('accessories' , req ,res)});
router.get('/all/:sort',  (req, res) => {getAll('all' , req ,res)});

router.get('/women/price/:price', (req, res) => {getProductsByPrice('women' , req ,res)});
router.get('/men/price/:price', (req, res) => {getProductsByPrice('men' , req ,res)});
router.get('/accessories/price/:price', (req, res) => {getProductsByPrice('accessories' , req ,res)});
router.get('/all/price/:price', (req, res) => {getProductsByPrice('all' , req ,res)});

router.get('/women/category/:category', (req, res) => {getProductsByCategory('women' , req ,res)});
router.get('/men/category/:category', (req, res) => {getProductsByCategory('men' , req ,res)});
router.get('/accessories/category/:category', (req, res) => {getProductsByCategory('accessories' , req ,res)});
router.get('/all/category/:category', (req, res) => {getProductsByCategory('all' , req ,res)});

router.get('/:id',  getProduct);

router.post('/:id/',  createReview);

router.post('/',  createProduct);



module.exports = router;
