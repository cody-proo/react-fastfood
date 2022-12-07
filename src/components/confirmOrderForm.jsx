import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  exportOrder,
  loadBank,
  loadCash,
  setTransactionService,
} from "../services";
import moment from "jalali-moment";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import Image from "./Img";

const ConfirmOrderForm = ({ user, totalPriceOrder, orders, isOpen }) => {
  const [openTransaction, setOpenTransaction] = useState(false);
  const [isProcess, setProcess] = useState(false);
  const transactionClass = openTransaction
    ? "transaction"
    : "transaction transaction-close";
  const orderClass = openTransaction ? "order order-close" : "order";
  const detailClass = openTransaction ? "detail detail-close" : "detail";
  const payClass = openTransaction ? "pay pay-close" : "pay";
  const detailContainerClass = openTransaction ? "detail-container-close" : "";
  // const [selectedBank, setSelectedBank] = useState("");
  // const [selectedBankAmount, setSelectedBankAmount] = useState("");
  // const [selectedCash, setSelectedCash] = useState("");
  // const [selectedCashAmount, setSelectedCashAmount] = useState("");
  // useEffect(() => {
  //   if (totalPriceOrder) {
  //     setSelectedBankAmount(totalPriceOrder);
  //     setSelectedCashAmount(totalPriceOrder);
  //   }
  // }, [totalPriceOrder]);

  // const { isLoading: cashLoading, data: cashData } = useQuery(
  //   "cash",
  //   () => loadCash(),
  //   {
  //     enabled: isOpen,
  //   }
  // );

  // const { isLoading: bankLoading, data: bankData } = useQuery(
  //   "bank",
  //   () => loadBank(),
  //   { enabled: isOpen }
  // );

  const exportOrderHandler = (totalAmount) => {
    setProcess(true);
    exportOrder(
      {
        items: orders.map((order) => ({
          id: order.id,
          price: order.price,
          quantity: order.count,
          discount: 0,
        })),
        orderType: "ShopOrder",
        submitAt: moment().locale("en").format("YYYY/MM/DD HH:mm"),
        user: user.id,
      },
      totalAmount
    )
      .then(() => {
        toast("با موفقیت ثبت گردید", {
          type: "success",
        });

        setTimeout(() => {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("refreshToken");
          window.localStorage.removeItem("user");
          window.location.href = "/";
        }, 300);
      })
      .catch((error) => {
        const errorMsg = error.response.data.message;
        if (errorMsg === "Credit not enough") {
          toast("موجودی حساب شما کافی نیست", { type: "error" });
        } else if (errorMsg === "Forbidden resource") {
          toast("شما دسترسی پرداخت ندارید", { type: "error" });
        }
      })
      .finally(() => {
        setProcess(false);
      });
  };

  return (
    <Container>
      {isProcess && (
        <div className="loading">
          <ReactLoading type="spin" height="40px" width="40px" color="#000" />
        </div>
      )}
      <div className="profile">
        {user && (
          <Image
            src={"https://test.gymsoft.ir/media".concat(
              "/",
              user?.profile?.name,
              "?w=600&h=400"
            )}
            className="profile-user"
          />
        )}

        <h1 className="profile-username">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
      <div className={orderClass}>
        {orders.map((order) => (
          <div className="order-item">
            <Image
              src={"https://test.gymsoft.ir/media".concat(
                "/",
                order?.image?.name,
                "?w=600&h=400"
              )}
              className="order-img"
            />
            {/* <img
              className="order-img"
              src="https://kadolin.ir/mag/wp-content/uploads/2022/04/Pizza-recipe.jpg"
            /> */}
            <div className="order-data">
              <h1 className="order-title">{order.title}</h1>
              <p className="order-price">
                قیمت :‌{" "}
                {Intl.NumberFormat("fa-IR").format(order.count * order.price)}{" "}
                تومان
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className={transactionClass}>
        {/* <div>
          <div className="transaction-group">
            <select
              onChange={(e) => {
                setSelectedBank(e.currentTarget.value);
              }}
              disabled={bankLoading}
              className="transaction-textfield"
            >
              <option value="">بانک را انتخاب کنید</option>
              {bankData?.map((bank) => (
                <option value={bank.id}>{bank.title}</option>
              ))}
            </select>
            <input
              onChange={(e) => setSelectedBankAmount(e.currentTarget.value)}
              type="text"
              placeholder="مبلغ را وارد کنید"
              className="transaction-textfield"
              value={new Intl.NumberFormat("fa-IR").format(selectedBankAmount)}
            />
          </div>
          <div className="transaction-group">
            <select
              onChange={(e) => {
                setSelectedCash(e.currentTarget.value);
              }}
              disabled={cashLoading}
              className="transaction-textfield"
            >
              <option value="">صندوق را انتخاب کنید</option>
              {cashData?.map((cash) => (
                <option value={cash.id}>{cash.title}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="مبلغ را وارد کنید"
              className="transaction-textfield"
              onChange={(e) => setSelectedCashAmount(e.currentTarget.value)}
              value={new Intl.NumberFormat("fa-IR").format(selectedCashAmount)}
            />
          </div>
        </div> */}
        <div className="transaction-btngroup">
          <div>
            <button
              disabled={isProcess}
              onClick={() => {
                exportOrderHandler();
              }}
              className="transaction-btn transaction-btn--primary"
            >
              تسویه از کیف پول
            </button>
            {/* <button
              onClick={() => {
                const data = {
                  bank: selectedBank,
                  bankAmount: selectedBankAmount,
                  cash: selectedCash,
                  cashAmount: selectedCashAmount,
                  user: user?.id,
                  submitAt: moment().locale("en").format("YYYY/MM/DD HH:mm"),
                };

                setTransactionService(data).then((data) => {
                  exportOrderHandler(data.totalAmount);
                });
              }}
              className="transaction-btn transaction-btn--primary"
            >
              واریز و تسویه
            </button> */}
          </div>
          <button
            disabled={isProcess}
            className="transaction-btn transaction-btn--secondary"
            onClick={() => setOpenTransaction(false)}
          >
            بازگشت
          </button>
        </div>
      </div>
      <div className={detailContainerClass}>
        <div>
          <div className={detailClass}>
            <span>جمع کل</span>
            <span>
              {new Intl.NumberFormat("fa-IR").format(totalPriceOrder)} تومان
            </span>
          </div>
          <div className={detailClass}>
            <span>موجودی کیف پول</span>
            <span>
              {new Intl.NumberFormat("fa-IR").format(user?.credit || 0)} تومان
            </span>
          </div>
          <div
            className={`${detailClass}`}
            style={{
              color:
                (user?.credit || 0) - totalPriceOrder < 0 ? "red" : "green",
            }}
          >
            <span>مانده</span>
            <span>
              {new Intl.NumberFormat("fa-IR").format(
                Math.abs((user?.credit || 0) - totalPriceOrder)
              )}{" "}
              تومان
            </span>
          </div>
        </div>
        <button
          disabled={(user?.credit || 0) - totalPriceOrder < 0}
          onClick={() => setOpenTransaction(true)}
          className={payClass}
        >
          پرداخت نهایی
        </button>
      </div>
    </Container>
  );
};

export default ConfirmOrderForm;

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: "100%",
  position: "relative",
  "& .loading": {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    background: "rgba(255,255,255,0.9)",
  },
  ".profile": {
    textAlign: "center",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    "&-user": {
      height: "80px",
      width: "80px",
      borderRadius: "50%",
      marginInline: "auto",
    },
    "&-username": {
      fontSize: "17px",
    },
    "&-text": {
      fontSize: "14px",
    },
  },

  ".transaction": {
    overflow: "hidden",
    transaction: "0.5s all",
    height: "100%",
    "&-group": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
    },
    "&-textfield": {
      width: "48%",
      height: "40px",
      paddingInline: "10px",
      border: "1px solid #eee",
      background: "#fff",
      fontFamily: "iransans",
      borderRadius: "4px",
      appearance: "none",
    },
    "&-btngroup": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "10px",
    },
    "&-close": {
      height: 0,
    },
    "&-btn": {
      height: "35px",
      width: "100px",
      border: "none",
      color: "#fff",
      borderRadius: "4px",
      background: "red",
      fontSize: "12px",
      fontFamily: "iransans",
      cursor: "pointer",
      "&--primary": {
        background: "#5599ff",
        marginInlineEnd: "5px",
      },
      "&--secondary": {
        background: "#ff4848",
      },
    },
  },

  ".pay": {
    height: "40px",
    width: "100%",
    fontFamily: "iransans",
    border: "none",
    backgroundColor: "#0268ff",
    color: "#fff",
    borderRadius: "4px",
    cursor: "pointer",
    "&:disabled": {
      opacity: 0.5,
      cursor: 'unset'
    },
    "&-close": {
      opacity: 0,
      height: 0,
    },
  },

  ".detail-container-close": {
    height: 0,
    overflow: "hidden",
  },

  ".detail": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "14px",
    transition: "0.5s all",
    overflow: "hidden",
    "&:last-child": {
      marginBottom: "20px",
    },
    "&-close": {
      height: 0,
    },
  },

  ".order": {
    maxHeight: "240px",
    flex: 1,
    overflowY: "auto",
    transition: "0.5s all",
    "&-close": {
      flex: "unset",
      height: 0,
    },
    "&-price": {
      fontSize: "13px",
    },
    "&-title": {
      fontSize: "16px",
    },
    "&-data": { paddingInline: "10px" },
    "&-item": {
      height: "100px",
      width: "100%",
      borderBottom: "1px solid #eee",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      "&:last-child": {
        borderBottom: "unset",
      },
    },
    "&-img": {
      height: "80px",
      width: "80px",
      objectFit: "cover",
      borderRadius: "4px",
    },
  },
}));
