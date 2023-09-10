const ProductDB = require("../models/product");

const getProducts = async (req, res) => {
  try {
    const products = await ProductDB.find().sort({ _id: -1 });
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getFeaturedProducts = async (req, res) => {
  const { page } = req.query;
  try {
    const LIMIT = 10;
    const products = await ProductDB.find().sort({ _id: -1 }).limit(LIMIT);
    res.status(200).json({ data: products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductDB.find({ _id: id });
    var RelatedProducts = await ProductDB.find({
      category: product[0].category,
      _id: { $ne: id }, 
    }).limit(4);
    if ( RelatedProducts.length <= 0 ){
      RelatedProducts = await ProductDB.find({
        department: product[0].department,
        _id: { $ne: id },
      }).limit(4);
    }
    res.status(200).json({ data: product , RelatedProducts : RelatedProducts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getAll = async (type, req, res) => {
  const { page } = req.query;
  const { sort } = req.params;
  const Sort = () => {
    switch (sort) {
      case 'Srating':
        return { AverageRating: -1 };
      case 'Slatest':
        return { _id: -1 };
      case 'Sprice-hl':
        return { price: 1 };
      case 'Sprice-lh':
        return { price: -1 };
      default:
        return { _id: 1 };
    }
  };
  try {
    const LIMIT = 9;
    const StartIndex = (Number(page) - 1) * LIMIT;
    
    const TOTAL = await ProductDB.find({
      department: type === "men" ? "Men's Fashion" : "Women's Fashion",
    });

    const ClothingCategory = [" ",...new Set(TOTAL.map((product) => product.category))];

    const products = await ProductDB.find({
      department: type === "men" ? "Men's Fashion" : "Women's Fashion",
    }).sort(Sort()).limit(LIMIT).skip(StartIndex);

      const pipeline = [
        {
          $sort: {
            selled: -1,
            "reviews.rating": -1,
            _id: -1
          }
        },
        {
          $limit: 3
        },
    ];
    const BestSelling = await ProductDB.aggregate(pipeline);


    var OtherGender;
    if (type == "women") {
      OtherGender = await ProductDB.countDocuments({ department: "Men's Fashion" });
    } else {
      OtherGender = await ProductDB.countDocuments({ department: "Women's Fashion" });
    }
    res
      .status(200)
      .json({
        data: products,
        currentPage: Number(page),
        numberOfPages: Math.ceil(TOTAL.length / LIMIT),
        numberOfMen: type === "men" ? TOTAL.length : OtherGender,
        numberOfWomen: type === "women" ? TOTAL.length : OtherGender,
        numberOfProducts: TOTAL.length,
        BestSelling: BestSelling,
        ClothingCategory:ClothingCategory,
      });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getProductsBySearch = async (req, res) => {
    const { page, search } = req.query;
    try {
      const LIMIT = 9;
      const StartIndex = (Number(page) - 1) * LIMIT;

      const regexSearch = new RegExp(search, 'i'); 
  
      const TOTAL = await ProductDB.countDocuments({
        name: { $regex: regexSearch }
      });
  
      const products = await ProductDB.find({
        name: { $regex: regexSearch }
      })
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(StartIndex);
  
      res.status(200).json({
        data: products,
        currentPage: Number(page),
        numberOfPages: Math.ceil(TOTAL / LIMIT),
        numberOfProducts: TOTAL,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

const getProductsByCategory = async ( type ,req, res) => {
    const { page } = req.query;
    var { category } = req.params;   
    try {
      const LIMIT = 9;
      const StartIndex = (Number(page) - 1) * LIMIT;

  
      const TOTAL = await ProductDB.countDocuments({
        department: type === "men" ? "Men's Fashion" : "Women's Fashion",
        category: category
      });
  
      const products = await ProductDB.find({
        department: type === "men" ? "Men's Fashion" : "Women's Fashion",
        category: category
      })
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(StartIndex);
  
      res.status(200).json({
        data: products,
        currentPage: Number(page),
        numberOfPages: Math.ceil(TOTAL / LIMIT),
        numberOfProducts: TOTAL,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

const createReview = async (req , res) => {
  const body = req.body;
  const {id} = req.params;
  const OldProduct = await ProductDB.findOne({ _id: id });

  const NewAverage = OldProduct.reviews.map((review) => review.rating);  
  if(NewAverage.length > 1) {
    const totalRatings = NewAverage.length;
    const sumRatings = NewAverage.reduce((acc, rating) => acc + rating, 0);
    const newRating= totalRatings === 0 ? 0 : sumRatings / totalRatings;
    OldProduct.AverageRating = Math.min(newRating, 5);
  }else{
    OldProduct.AverageRating = body.rating
  }
  if (!OldProduct) {
    return res.status(404).json({ error: 'Product not found' });
  }
  OldProduct.reviews.push(body);
  try {
    await OldProduct.save();
    res.status(200).json({
      data : OldProduct
    });
  } catch (error) {
    res.status(500).json({ error: 'Error saving the product with the new review' });
  }
}

const getProductsByPrice = async (type, req, res) => {
  const { page } = req.query;
  const { price } = req.params;
  const priceRange = price.split(',').map(Number);
  const [minPrice, maxPrice] = priceRange;
  
  try {
    const LIMIT = 9;
    const StartIndex = (Number(page) - 1) * LIMIT;

    const pipeline = [
      {
        $match: {
          department: type === "men" ? "Men's Fashion" : "Women's Fashion",
        },
      },
      {
        $addFields: {
          discountedPrice: {
            $cond: {
              if: { $gt: ["$discountPercentage", 0] },
              then: {
                $multiply: [
                  "$price",
                  { $subtract: [1, { $divide: ["$discountPercentage", 100] }] },
                ],
              },
              else: "$price",
            },
          },
        },
      },
      {
        $match: {
            discountedPrice: { $gte: minPrice, $lte: maxPrice },
        },
      },
      {
        $sort: { _id: -1 },
      },
      {
        $skip: StartIndex,
      },
      {
        $limit: LIMIT,
      },
    ];

    const products = await ProductDB.aggregate(pipeline);

    res.status(200).json({
      data: products,
      currentPage: Number(page),
      numberOfPages: Math.ceil(products.length / LIMIT),
      numberOfProducts: products.length,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};




const createProduct = async (req, res) => {
  const product = {
    name: "Men's Casual Shirt",
    price: 29.99,
    description: "A comfortable and stylish shirt for men.",
    category: "Men's T-Shirt -1",
    department: "Men's Fashion",
    imageUrl: "https://johnlewis.scene7.com/is/image/JohnLewis/mw-tshirts-hyb2-260423?$cms-max-image-threshold$&wid=576&fit=hfit,1",
    stock: 50,
    discountPercentage: 10,
    colors: ["blue", "black", "red"],
    sold: 0, // Corrected property name from "selled" to "sold"
    AverageRating: 4, // Corrected property name from "AverageRating" to "averageRating"
    reviews: [
      {
        username: "Abdelrhman",
        rating: 4, // Corrected rating value from {4} to 4
        createdAt: "2023-09-09T03:37:18.728+00:00", // You can add the actual date here
        comment: "Great Product!",
      },
    ],
    sizes: ["S", "L", "XL", "M"],
  };
  
  ;
  const newProduct = new ProductDB({
    ...product });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getFeaturedProducts,
  createProduct,
  getAll,
  getProduct,
  getProductsBySearch,
  getProductsByCategory,
  getProductsByPrice,
  createReview
};
