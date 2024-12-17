import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/firebase";
import { fetchProducts } from "@/Redux/actions/GetProducts";
import { filterProducts, searchProducts } from "@/Redux/actions/ProductActions";
import { useUser } from "@clerk/clerk-react";
import { collection, getDocs } from "firebase/firestore";
import gsap from "gsap";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Shop = () => {
  const products = useSelector((state) => state.getProducts.products);
  const filterResults = useSelector((state) => state.getProducts.filterResults);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const { user } = useUser();

  // categories & brands values ("iphone","phones",....)
  const [filteredCategory, setFilteredCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  // categories & brands values ("iphone","phones",....)

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchProducts(user));
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const productsCollection = collection(db, "products");
        const categoriesSnapshot = await getDocs(productsCollection);
        const categoriesArray = [];
        categoriesSnapshot.forEach((doc) => {
          categoriesArray.push(doc.data().category);
        });
        setCategories([...new Set(categoriesArray)]);
      } catch (error) {
        alert(error.message);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const productsCollection = collection(db, "products");
        const brandsSnapshot = await getDocs(productsCollection);
        const brandsArray = [];
        brandsSnapshot.forEach((doc) => {
          brandsArray.push(doc.data().brand);
        });
        setBrands([...new Set(brandsArray)]);
      } catch (error) {
        alert(error.message);
      }
    };
    getBrands();
  }, []);

  useEffect(() => {
    gsap.fromTo(
      ".products",
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, delay: 0.5 }
    );
  }, []);

  useEffect(() => {
    if (products?.length > 0 || filterResults?.length > 0) {
      setLoading(false);
    }
  }, [products, filterResults]);

  return (
    <div>
      <div className="p-10">
        <div className="flex items-center gap-2">
          <Button onClick={() => dispatch(searchProducts(search))}>بحث</Button>
          <Input
            placeholder="ابحث عن منتج..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex justify-between gap-2 items-center mt-5">
          <Select
            onValueChange={(value) => {
              setFilteredCategory(value);
              dispatch(filterProducts(value, selectedBrand));
            }}
            className="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="الفئات" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories?.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              setSelectedBrand(value);
              dispatch(filterProducts(filteredCategory, value));
            }}
            className="w-full"
          >
            <SelectTrigger>
              <SelectValue placeholder="الماركات" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {brands?.map((brand) => (
                  <SelectItem key={brand} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center">
          <p className="text-2xl font-extrabold">جاري تحميل المنتجات....</p>
        </div>
      ) : (
        <div>
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-center m-auto gap-4 products">
            {(filterResults || products)?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
