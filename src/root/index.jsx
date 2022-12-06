import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./globalStyle";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import Modal from "../components/modal";
import AuthorizedForm from "../components/authorizedForm";
import ConfirmOrderForm from "../components/confirmOrderForm";
import { useQuery } from "react-query";
import { getCategory, getProduct, getShop } from "../services";

const items = [
  { name: "همه", id: 1 },
  { name: "کارواش", id: 2 },
  // { name: "رستوران", id: 3 },
  // { name: "آرایشگاه", id: 4 },
  // { name: "ماساژ", id: 5 },
  // { name: "بوتیک مردانه", id: 6 },
  // { name: "بوتیک زنانه", id: 7 },
  // { name: "کافه", id: 8 },
];

const subItems = [
  // { name: "نوشیدنی", id: 1 },
  // { name: "عصرانه", id: 2 },
  // { name: "غذای گرم", id: 3 },
  // { name: "غذای سرد", id: 4 },
  // { name: "صبحانه", id: 5 },
  // { name: "شام", id: 6 },
  // { name: "ناهار", id: 7 },
  // { name: "قهوه", id: 8 },
  // { name: "همبرگر", id: 9 },
  // { name: "کارواش", id: 9 },
  // { name: "رستوران", id: 13 },
  // { name: "آرایشگاه", id: 14 },
  // { name: "ماساژ", id: 15 },
  // { name: "بوتیک مردانه", id: 16 },
  // { name: "بوتیک زنانه", id: 17 },
  // { name: "کافه", id: 18 },
  // { name: "نوشیدنی", id: 1 },
  // { name: "عصرانه", id: 2 },
  // { name: "غذای گرم", id: 3 },
  // { name: "غذای سرد", id: 4 },
  // { name: "صبحانه", id: 5 },
  // { name: "شام", id: 6 },
  // { name: "ناهار", id: 7 },
  // { name: "قهوه", id: 8 },
  // { name: "همبرگر", id: 9 },
  // { name: "کارواش", id: 9 },
  // { name: "رستوران", id: 13 },
  // { name: "آرایشگاه", id: 14 },
  // { name: "ماساژ", id: 15 },
  // { name: "ماساژ", id: 15 },
  // { name: "بوتیک مردانه", id: 16 },
  // { name: "بوتیک زنانه", id: 17 },
  // { name: "کافه", id: 18 },
  // { name: "نوشیدنی", id: 1 },
  // { name: "عصرانه", id: 2 },
  // { name: "غذای گرم", id: 3 },
  // { name: "غذای سرد", id: 4 },
  // { name: "صبحانه", id: 5 },
  // { name: "شام", id: 6 },
  // { name: "ناهار", id: 7 },
  // { name: "قهوه", id: 8 },
  // { name: "همبرگر", id: 9 },
  // { name: "کارواش", id: 9 },
  // { name: "رستوران", id: 13 },
  // { name: "آرایشگاه", id: 14 },
  // { name: "ماساژ", id: 15 },
  // { name: "ماساژ", id: 15 },
  // { name: "بوتیک مردانه", id: 16 },
  // { name: "بوتیک زنانه", id: 17 },
  // { name: "کافه", id: 18 },
  // { name: "نوشیدنی", id: 1 },
  // { name: "عصرانه", id: 2 },
  // { name: "غذای گرم", id: 3 },
  // { name: "غذای سرد", id: 4 },
  // { name: "صبحانه", id: 5 },
  // { name: "شام", id: 6 },
  // { name: "ناهار", id: 7 },
  // { name: "قهوه", id: 8 },
  // { name: "همبرگر", id: 9 },
  // { name: "کارواش", id: 9 },
  // { name: "رستوران", id: 13 },
  // { name: "آرایشگاه", id: 14 },
  // { name: "ماساژ", id: 15 },
  // { name: "ماساژ", id: 15 },
  // { name: "بوتیک مردانه", id: 16 },
  // { name: "بوتیک زنانه", id: 17 },
  // { name: "کافه", id: 18 },
  // { name: "نوشیدنی", id: 1 },
  // { name: "عصرانه", id: 2 },
  // { name: "غذای گرم", id: 3 },
  // { name: "غذای سرد", id: 4 },
  // { name: "صبحانه", id: 5 },
  // { name: "شام", id: 6 },
  // { name: "ناهار", id: 7 },
  // { name: "قهوه", id: 8 },
  // { name: "همبرگر", id: 9 },
  // { name: "کارواش", id: 9 },
  // { name: "رستوران", id: 13 },
  // { name: "آرایشگاه", id: 14 },
  // { name: "ماساژ", id: 15 },
  // { name: "بوتیک مردانه", id: 16 },
  { name: "بوتیک زنانه", id: 17 },
  { name: "کافه", id: 18 },
];

const Root = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);
  const onChangeActiveItem = (data) => setActiveItem(data);
  const [openOrderInMobile, setOpenOrderInMobile] = useState(false);
  const [authorizedModalStatus, setAuthorizedModalStatus] = useState(false);
  const [confirmModalStatus, setConfirmModalStatus] = useState(false);
  const [orders, setOrders] = useState([]);
  const { isLoading: shopLoading, data: shopData } = useQuery(
    ["shop", activeItem],
    () => getShop()
  );
  const { isLoading: productLoading, data: productData } = useQuery(
    ["product", activeCategory, activeItem],
    () => getProduct(activeCategory)
  );
  const { isLoading: categoryLoading, data: categoryData } = useQuery(
    ["category", activeItem],
    () => getCategory(activeItem)
  );
  const [user, setUser] = useState();
  const orderRef = useRef(null);

  useEffect(() => {
    const handleOrderOutsideClick = (e) => {
      if (
        !orderRef.current.contains(e.target) &&
        openOrderInMobile &&
        e.target.innerText !== "سفارشات"
      ) {
        setOpenOrderInMobile(false);
      }
    };
    window.addEventListener("click", handleOrderOutsideClick);

    return () => {
      window.removeEventListener("click", handleOrderOutsideClick);
    };
  }, [openOrderInMobile]);

  const totalPriceOrder = orders?.reduce(
    (acc, order) => acc + order.price * order.count,
    0
  );

  return (
    <Container>
      <Modal
        onClose={() => setAuthorizedModalStatus(false)}
        title="ورود به حساب کاربری"
        isOpen={authorizedModalStatus}
      >
        <AuthorizedForm
          setAuthorizedModalStatus={setAuthorizedModalStatus}
          setConfirmModalStatus={setConfirmModalStatus}
          setUser={setUser}
        />
      </Modal>
      <Modal
        isOpen={confirmModalStatus}
        onClose={() => setConfirmModalStatus(false)}
        title="لیست سفارشات نهایی"
      >
        <ConfirmOrderForm
          orders={orders}
          user={user}
          totalPriceOrder={totalPriceOrder}
          isOpen={confirmModalStatus}
        />
      </Modal>
      <GlobalStyle />
      <Header>
        <ul className="list">
          {shopLoading
            ? "درحال دریافت اطلاعات"
            : [{ title: "همه", id: 0 }, ...(shopData || [])]?.map((item) => (
                <li
                  key={item.name + "-" + item.id}
                  onClick={onChangeActiveItem.bind(null, item.id)}
                  className={`item ${
                    activeItem === item.id ? "item--active" : ""
                  }`}
                >
                  <a
                    className="item-link"
                    onClick={(e) => e.preventDefault()}
                    href={item.title}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
        </ul>
      </Header>
      <Group className="group">
        {categoryLoading
          ? "درحال دریافت اطلاعات"
          : [{ id: 0, title: "همه" }, ...(categoryData || [])]?.map(
              (category) => (
                <div
                  onClick={() => setActiveCategory(category.id)}
                  className="group-item"
                  key={category.id + "-" + category.title}
                >
                  <img
                    className="group-image"
                    src="https://kadolin.ir/mag/wp-content/uploads/2022/04/Pizza-recipe.jpg"
                  />
                  <div className="group-text">{category.title}</div>
                </div>
              )
            )}
      </Group>
      <DetailContainer>
        <Products>
          <div className="header">
            <h1 className="header-text">محصولات</h1>
            <button
              className="header-btn"
              onClick={() => setOpenOrderInMobile((prev) => !prev)}
            >
              سفارشات
            </button>
          </div>
          <div className="list">
            {productLoading
              ? "درحال دریافت اطلاعات"
              : productData?.map((product) => (
                  <div
                    className="product"
                    key={product.id + "-" + product.title}
                  >
                    <img
                      className="product-img"
                      src="https://kadolin.ir/mag/wp-content/uploads/2022/04/Pizza-recipe.jpg"
                      alt=""
                    />
                    <h3 className="product-title">
                      <span>{product.title}</span>
                      <span>
                        {new Intl.NumberFormat("fa-IR").format(product.price)}{" "}
                        تومان
                      </span>
                    </h3>
                    <button
                      onClick={() =>
                        setOrders((prev) => {
                          const state = [...prev];
                          const index = prev?.findIndex(
                            (order) => order.id === product.id
                          );
                          if (index === -1)
                            return [{ ...product, count: 1 }, ...state];
                          state[index].count = state[index].count + 1;
                          return state;
                        })
                      }
                      className="product-bucket"
                    >
                      افزودن به سبد خرید
                    </button>
                  </div>
                ))}
          </div>
        </Products>
        <div
          className={`overlay ${openOrderInMobile ? "overlay-open" : ""}`}
        ></div>
        <Order ref={orderRef} isOpenInMobile={openOrderInMobile}>
          <div className="header">
            <div className="header-content">
              <h1 className="title">سفارشات</h1>
              <span className="price">
                مبلغ کل:
                {new Intl.NumberFormat("fa-IR").format(totalPriceOrder)} تومان
              </span>
            </div>
            <button
              className="btn-save"
              onClick={() => {
                setAuthorizedModalStatus(true);
              }}
            >
              تایید سفارشات
            </button>
          </div>
          <ul className="list">
            {orders.map((order) => (
              <li className="list-item">
                <img
                  className="list-image"
                  src="https://kadolin.ir/mag/wp-content/uploads/2022/04/Pizza-recipe.jpg"
                />
                <h1 className="list-title">{order.title}</h1>
                <p className="list-desc">
                  جمع کل : {new Intl.NumberFormat("fa-IR").format(order.price)}{" "}
                  تومان
                </p>
                <div className="list-order">
                  <div
                    className="list-btn list-btn--add"
                    onClick={() => {
                      setOrders((prev) => {
                        const state = [...prev];
                        const index = state.findIndex((e) => e.id === order.id);
                        if (index === -1) return state;
                        state[index].count = state[index].count + 1;
                        return state;
                      });
                    }}
                  >
                    <AiOutlinePlus />
                  </div>

                  <input
                    type="text"
                    className="list-input"
                    value={order.count}
                    readOnly
                  />
                  <div
                    className="list-btn list-btn--minus"
                    onClick={() => {
                      setOrders((prev) => {
                        const state = [...prev];
                        const index = state.findIndex((e) => e.id === order.id);
                        if (index === -1) return state;
                        if (state[index].count === 1) state.splice(index, 1);
                        else state[index].count = state[index].count - 1;
                        return state;
                      });
                    }}
                  >
                    <AiOutlineMinus />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Order>
      </DetailContainer>
    </Container>
  );
};

export default Root;

const Container = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  overflow: "hidden",
  flexDirection: "column",
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  "& .overlay": {
    position: "absolute",
    height: "100%",
    left: "-100px",
    width: 0,
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.6)",
    zIndex: 1,
    "&-open": {
      width: "100%",
      left: 0,
    },
  },
}));

const Header = styled("header")(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "90%",
  paddingBlock: "10px",
  marginInline: "auto",
  borderBottom: "2px solid #eee",
  "@media(max-width: 1200px)": {
    width: "95%",
  },

  "& .list": {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    "& .item": {
      height: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      paddingInline: "23px",
      marginBlock: "5px",
      transition: "0.5s all",
      borderRadius: "50px",
      marginInlineEnd: "5px",
      "&:hover": {
        backgroundColor: "#0268ff",
        ".item-link": {
          color: "#fff",
        },
      },
      "&-link": {
        color: "#333",
        transition: "0.5s all",
      },
      "&--active": {
        backgroundColor: "#0268ff",
        ".item-link": {
          color: "#fff",
        },
      },
    },
  },
}));

const Group = styled("div")(() => ({
  width: "90%",
  marginInline: "auto",
  paddingBlock: "30px 10px",
  flexWrap: "nowrap",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  overflowX: "auto",
  borderBottom: "1px solid #eee",
  "@media(max-width: 1200px)": {
    width: "95%",
  },
  ".group": {
    "&-item": {
      flex: "none",
      marginInlineEnd: "20px",
      borderRadius: "5px",
      cursor: "pointer",
      flexDirection: "column",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
      height: "130px",
      width: "130px",
    },
    "&-image": {
      height: "70%",
      width: "100%",
      borderRadius: "5px",
    },
    "&-text": {
      height: "30%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
}));

const DetailContainer = styled("div")(() => ({
  display: "flex",
  flex: 1,
  width: "90%",
  marginInline: "auto",
  paddingBlock: "15px",
  overflow: "hidden",
  "@media(max-width: 1200px)": {
    width: "95%",
  },
}));

const Order = styled("div")(({ isOpenInMobile }) => ({
  width: "20%",
  borderRight: "1px solid #eee",
  overflow: "hidden",
  height: "100%",
  paddingBottom: "50px",
  transition: "0.5s all",

  "& .price": {
    fontSize: "11px",
  },

  "@media(max-width: 1200px)": {
    position: "absolute",
    height: "100%",
    backgroundColor: "#fff",
    zIndex: 9999,
    top: 0,
    left: isOpenInMobile ? 0 : -100,
    width: isOpenInMobile ? "330px" : 0,
    paddingTop: "20px",
    "@media(max-width: 450px)": {
      width: isOpenInMobile ? "70%" : 0,
    },
  },
  "& .btn-save": {
    paddingInline: "20px",
    height: "40px",
    border: "none",
    background: "#00c900",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",

    "@media(max-width: 400px)": {
      width: "100%",
      marginTop: "10px",
    },
  },

  "& .header": {
    borderBottom: "1px solid #eee",
    paddingInline: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "15px",
    "@media(max-width: 400px)": {
      flexDirection: "column",
      "&-content": {
        width: "100%",
      },
    },
  },

  "& .title": {
    fontSize: "18px",
  },

  "& .list": {
    height: "100%",
    width: "95%",
    marginRight: "auto",
    overflowY: "auto",
    paddingBlock: "10px 30px",
    paddingLeft: "10px",
    "&-image": {
      height: "150px",
      width: "100%",
      borderRadius: "5px",
    },
    "&-title": {
      fontSize: "16px",
      paddingBlock: "5px",
    },
    "&-desc": {
      fontSize: "13px",
    },
    "&-item": {
      marginBottom: "20px",
    },
    "&-order": {
      marginBlock: "10px",
      height: "30px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginInline: "auto",
      border: "1px solid #eee",
    },
    "&-btn": {
      height: "100%",
      width: "40px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
      "& *": {
        fill: "#fff",
      },
    },
    "&-btn--minus": {
      background: "#ff4848",
      borderRight: "1px solid #eee",
    },
    "&-btn--add": {
      background: "#00c900",
      borderLeft: "1px solid #eee",
    },
    "&-input": {
      height: "100%",
      width: "100%",
      border: "none",
      textAlign: "center",
    },
  },
}));

const Products = styled("div")(() => ({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",

  "@media(max-width: 1200px)": {
    width: "100%",
  },

  "& .header": {
    paddingBottom: "15px",
    borderBottom: "1px solid #eee",
    paddingInline: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",

    "&-text": {
      fontSize: "18px",
    },

    "&-btn": {
      height: "40px",
      width: "120px",
      background: "#5599ff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",

      "@media(min-width: 1200px)": {
        display: "none",
      },
    },
  },

  "& .list": {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    alignItems: "flex-start",
    paddingBlock: "20px",
    flex: 1,
    overflowY: "auto",
    width: "100%",
  },

  "& .product": {
    width: "18%",
    marginInlineEnd: "25px",
    marginBottom: "20px",
    "@media(max-width: 1400px)": {
      width: "23%",
      marginInlineEnd: "17px",
    },
    "@media(max-width: 1200px)": {
      width: "23%",
      marginInlineEnd: "17px",
    },
    "@media(max-width: 1000px)": {
      width: "30%",
      marginInlineEnd: "17px",
    },
    "@media(max-width: 700px)": {
      width: "47%",
      marginInlineEnd: "15px",
    },
    "@media(max-width: 570px)": {
      width: "100%",
      marginInlineEnd: "unset",
    },
    "@media(max-width: 400px)": {
      width: "100%",
      marginInlineEnd: "unset",
    },

    "&-img": {
      height: "150px",
      width: "100%",
      borderRadius: "5px",
      "@media(max-width: 570px)": {
        height: "200px",
      },
    },

    "&-title": {
      fontSize: "16px",
      marginBlock: "10px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    "&-bucket": {
      height: "40px",
      width: "100%",
      marginTop: "20px",
      background: "#5599ff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  },
}));
