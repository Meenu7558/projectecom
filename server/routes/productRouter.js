import express from "express";
import { getProducts, getProductDetails,createProduct,updateProduct,deleteProduct, getFeaturedProducts, getProductById, addProductReview} from "../controllers/productControllers.js";
import { sellerAuth  } from "../middlewares/sellerAuth.js";
import {userAuth} from "../middlewares/userAuth.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();
router.get('/getproducts', getProducts);

router.post('/createproducts',sellerAuth,upload.single("image"), createProduct);

router.get('/productsdetails/:productId',  getProductDetails);

router.put('/productsupdate/:id',sellerAuth,upload.single("image"), updateProduct);

router.delete('/productsdelete/:id',sellerAuth, deleteProduct);


router.get('/featured', getFeaturedProducts);

router.get("/:id", getProductById);

router.post('/:id/reviews', userAuth, addProductReview);


export { router as productRouter };