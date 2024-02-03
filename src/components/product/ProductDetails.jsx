import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.jsx";
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartAction";
import axios from "axios";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { id } = useParams();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );


  // quantity management area
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    if (quantity < product?.stock) setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  //

  const outOfStock = () => {
    alert.error("Currently item is out of stock");
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart Successfully");
  };

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product?.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData
            title={product?.name ? `${product?.name} | ShopKaro` : "ShopKaro"}
          />
          <div className="ProductDetails">
            <div className="CarouselDiv">
              <Carousel>
                {product?.images &&
                  product?.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>Product #{product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span>({product?.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>₹{product?.price}</h1>

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={() => decreaseQty()}>-</button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={() => increaseQty()}>+</button>
                  </div>
                  <button
                    onClick={
                      product?.stock >= 1 ? addToCartHandler : outOfStock
                    }
                  >
                    Add to cart
                  </button>
                </div>
                <p>
                  Status:
                  <b className={product?.stock < 1 ? "redColor" : "greenColor"}>
                    {product?.stock < 1 ? " Out Of Stock" : " In Stock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description: <p>{product?.description}</p>
              </div>
            </div>
          </div>

          <div className="RateProductContainer">
            <h3 className="reviewsHeading">Ratings & Reviews</h3>
            <button onClick={() => navigate(`/write/review/${product?._id}`)}>
              Rate Product
            </button>
          </div>
          {product?.numOfReviews > 0 ? (
            <div className="reviews">
              {product?.reviews.map((item, i) => (
                <ReviewCard review={item} key={i} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
