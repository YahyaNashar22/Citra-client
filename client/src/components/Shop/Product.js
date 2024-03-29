import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import style from "./Product.module.css";
import placeholder from "../../assets/images/test.jpg";
import { motion } from "framer-motion";
import {
  fetchProductsShop,
  fetchProductsByCateg,
  fetchProductsBySubCateg,
  fetchProductsNumber,
} from "../../db/fetchProduct";
import { useQuery } from "react-query";
import { Pagination, PaginationItem } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { ShopContext } from "../../ShopContext/ShopContext";
import { toast } from "react-toastify";
import ShopSide from "./ShopSide";
import Search from "./Search";
import LoadingPage from "../loadingPage";

function Product() {
  const { selectedCategory, selectedSubCategory, setSelectedSubCategory } =
    useContext(ShopContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAbove769px, setIsAbove769px] = useState(window.innerWidth > 769);
  const [search, setSearch] = useState();

  async function fetchTotalProducts() {
    try {
      let totalProducts = await fetchProductsNumber();
      totalProducts = totalProducts.number;
      let total;
      if (totalProducts <= 10) {
        total = 1;
      } else {
        total = Math.ceil(totalProducts / 10);
      }

      setTotalPages(total);
    } catch (error) {
      console.error("Error fetching total products:", error);
    }
  }
  useEffect(() => {
    fetchTotalProducts();
    function handleResize() {
      setIsAbove769px(window.innerWidth > 769);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (selectedCategory && selectedSubCategory) {
    var {
      isLoading: isLoadingProducts,
      data: products,
      refetch,
    } = useQuery(
      ["products", currentPage],
      () => fetchProductsBySubCateg(selectedSubCategory.join(","), currentPage),
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );
    products = products ? products : [];
  } else if (selectedCategory) {
    var {
      isLoading: isLoadingProducts,
      data: products,
      refetch,
    } = useQuery(
      ["productsFilterCateg", currentPage],
      () => fetchProductsByCateg(selectedCategory, currentPage),
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );
    products = products ? products : [];
  } else {
    var {
      isLoading: isLoadingProducts,
      data: products,
      refetch,
    } = useQuery(
      ["products", currentPage],
      () => fetchProductsShop(currentPage),
      {
        refetchOnMount: true,
        refetchOnWindowFocus: true,
      }
    );
    products = products ? products : [];
  }
  if (search) {
    products = search;
  }
  useEffect(() => {
    refetch();
    if (!selectedSubCategory || selectedSubCategory?.length === 0) {
      setSelectedSubCategory(null);
      setSearch(null);
    }
    if (search && selectedCategory) {
      setSelectedSubCategory(null);
      setSearch(null);
    }
  }, [selectedCategory, selectedSubCategory]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleClick = (product) => {
    const { arabicName, price, images, details, slug } = product;
    const selectedColor =
      details[0].color && details[0].color.length > 0 ? details[0].color : null;
    const selectedSize =
      details[0].sizes[0].size && details[0].sizes[0].size.length > 0
        ? details[0].sizes[0].size
        : null;

    const initialQuantity = 1;

    const productInfo = {
      arabicName,
      price,
      totalPrice: price * initialQuantity,
      image: images && images.length > 0 ? images[0] : null,
      selectedColor,
      selectedSize,
      quantity: initialQuantity,
      slug,
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProductIndex = existingCart.findIndex(
      (item) =>
        item.arabicName === productInfo.arabicName &&
        item.selectedColor === productInfo.selectedColor &&
        item.selectedSize === productInfo.selectedSize &&
        item.slug === productInfo.slug
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += initialQuantity;
      existingCart[existingProductIndex].totalPrice += productInfo.totalPrice;
    } else {
      existingCart.push(productInfo);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("تمت اضافة المنتج");
  };

  if (isLoadingProducts) {
    return <LoadingPage />;
  }

  return (
    <article className={isAbove769px ? style.collapse : ""}>
      <ShopSide setSearch={setSearch} search={search} />
      <motion.section
        className={isAbove769px ? style.shopContainer : ""}
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          ease: "easeIn",
          stiffness: 260,
          damping: 20,
          duration: 0.6,
        }}
      >
        <Search currentPage={currentPage} setSearch={setSearch} />
        <section className={style.productSection}>
          {products.length == 0 ? (
            <h3 className={style.loading}>منتجات غير متوفرة</h3>
          ) : (
            products?.products.map((element) => (
              <NavLink
                to={`/singleProduct/${element.slug}`}
                className={style.productHolder}
                key={element._id}
              >
                <img
                  src={
                    element.images.length != 0
                      ? `${process.env.REACT_APP_BACKEND}${element.images[0]}`
                      : placeholder
                  }
                  alt="product"
                />
                <div className={style.details}>
                  <div>
                    <h4>{element.arabicName}</h4>
                    <p>${element.price}</p>
                  </div>
                  <Link
                    className={style.addToCart}
                    onClick={() => handleClick(element)}
                  >
                    اضف الآن
                  </Link>
                </div>
              </NavLink>
            ))
          )}
        </section>
        <div className={style.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </div>
      </motion.section>
    </article>
  );
}

export default Product;
