import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import gsap from "gsap";
import { createProduct } from "@/Redux/actions/ProductActions";
import { useUser } from "@clerk/clerk-react";
import { useDispatch } from "react-redux";

const CreateProduct = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  useEffect(() => {
    gsap.fromTo(
      ".create",
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        duration: 1,
        x: 0,
      }
    );
  }, []);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [discount, setDiscount] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [shippingInfo, setShippingInfo] = useState("");
  const [warranty, setWarranty] = useState("");
  const [shippingPrice, setShippingPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      await dispatch(
        createProduct(
          title,
          description,
          price,
          discount,
          brand,
          category,
          warranty,
          shippingInfo,
          shippingPrice,
          image,
          user
        )
      );
    } catch (error) {
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 text-right create">
      <h1 className="md:text-5xl text-3xl md:mb-5 mb-8 font-extrabold tracking-tighter text-center">
        إنشاء منتج جديد
      </h1>
      <div className="px-10 py-8 space-y-8">
        <div>
          <Label htmlFor="brand" className="text-lg font-medium">
            ماركة المنتج
          </Label>
          <Input
            id="brand"
            placeholder="أدخل اسم المنتج"
            className="mt-2 w-full"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="title" className="text-lg font-medium">
            اسم المنتج
          </Label>
          <Input
            id="title"
            placeholder="أدخل اسم المنتج"
            className="mt-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-lg font-medium">
            وصف المنتج
          </Label>
          <Textarea
            id="description"
            placeholder="أدخل وصف المنتج"
            className="mt-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="price" className="text-lg font-medium">
              السعر
            </Label>
            <Input
              id="price"
              type="number"
              placeholder="أدخل سعر المنتج"
              className="mt-2 w-full"
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="discount" className="text-lg font-medium">
              نسبة الخصم (اختياري)
            </Label>
            <Input
              id="discount"
              type="number"
              min="1"
              placeholder="أدخل نسبة الخصم"
              className="mt-2 w-full"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label>صورة المنتج</label>
          <Label htmlFor="image" className="text-lg font-medium">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Product"
                className="w-[300px] flex justify-center m-auto cursor-pointer"
              />
            ) : (
              <img
                src="https://cdn3.iconfinder.com/data/icons/ios-edge-glyph-1/25/Add-Image-512.png"
                className="w-[200px] flex justify-center m-auto cursor-pointer"
              />
            )}
          </Label>
        </div>

        <Input
          id="image"
          type="file"
          className="mt-2 w-full file:bg-gray-200 file:rounded-lg file:border-none file:px-4 file:py-2 file hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div>
          <Label htmlFor="shippingInfo" className="text-lg font-medium">
            معلومات الشحن
          </Label>
          <Textarea
            id="shippingInfo"
            placeholder="أدخل معلومات الشحن"
            className="mt-2 w-full"
            value={shippingInfo}
            onChange={(e) => setShippingInfo(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="shippingPrice" className="text-lg font-medium">
            سعر الشحن (اختياري)
          </Label>
          <Input
            id="shippingPrice"
            type="number"
            placeholder="أدخل سعر الشحن"
            className="mt-2 w-full"
            min={0}
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="warrantyInfo" className="text-lg font-medium">
            معلومات الضمان (اختياري)
          </Label>
          <Textarea
            id="warrantyInfo"
            placeholder="أدخل معلومات الضمان"
            className="mt-2 w-full"
            value={warranty}
            onChange={(e) => setWarranty(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="category" className="text-lg font-medium">
            التصنيف
          </Label>
          <Input
            id="category"
            placeholder="أدخل تصنيف المنتج"
            className="mt-2 w-full"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <Button onClick={handleCreate} className="w-full" size="lg">
          {loading === true ? (
            <div class="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin flex justify-center items-center m-auto"></div>
          ) : (
            "انشاء المنتج"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateProduct;
