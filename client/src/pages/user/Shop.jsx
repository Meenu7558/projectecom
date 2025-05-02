import React, { useEffect, useState } from 'react'
//import { axiosInstance } from '../../config/axioInstance'
import { ShopCards } from '../../components/user/Cards'

import { ProductSkelton } from '../../components/shared/Skeltons';
import { useFetch } from '../../hooks/usefetch';



export const Shop = () => {
 // const [ProductList, setProductList] = useState({});
  
   // const fetchproducts = async () => {
     // try {
      
       // const response = await axiosInstance({
         // method: "GET",
         //// url: `product/getproducts${productId}`,
          //withCredentials: true,
          
  
  
       // });
  
      //  console.log("response ===", response);
      //  setProductList(response?.data?.data);
  
    //  } catch (error) {
      //    console.log("Error fetching product:", error?.response?.data || error.message || error);
    //  }
        
      
    //};
   
   // useEffect(()=>{
   //   fetchproducts()
   // },[]);
  
  const [ProductList, isLoading,error]=useFetch ("product/getproducts")
  console.log("isLoading====",isLoading)
  return (
    <div>
      {isLoading ? (
        <ProductSkelton />
      ) : (
        <div className="flex flex-col items-center justify-start px-8 py-16">
          <section className="mb-8">
            <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
              PRODUCTS
            </h1>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {ProductList?.map((product) => (
              <ShopCards key={product?._id} product={product} />
            ))}
          </section>
        </div>
      )}
    </div>
  );
};

