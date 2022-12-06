import styled from "styled-components";

const subItems = [
  { name: "نوشیدنی", id: 1 },
  { name: "عصرانه", id: 2 },
  { name: "غذای گرم", id: 3 },
  { name: "غذای سرد", id: 4 },
  { name: "صبحانه", id: 5 },
  { name: "شام", id: 6 },
  { name: "ناهار", id: 7 },
  { name: "قهوه", id: 8 },
  { name: "همبرگر", id: 9 },
  { name: "کارواش", id: 9 },
  { name: "رستوران", id: 13 },
  { name: "آرایشگاه", id: 14 },
  { name: "ماساژ", id: 15 },
  { name: "بوتیک مردانه", id: 16 },
  { name: "بوتیک زنانه", id: 17 },
  { name: "کافه", id: 18 },
  { name: "نوشیدنی", id: 1 },
  { name: "عصرانه", id: 2 },
  { name: "غذای گرم", id: 3 },
  { name: "غذای سرد", id: 4 },
  { name: "صبحانه", id: 5 },
  { name: "شام", id: 6 },
  { name: "ناهار", id: 7 },
  { name: "قهوه", id: 8 },
  { name: "همبرگر", id: 9 },
  { name: "کارواش", id: 9 },
  { name: "رستوران", id: 13 },
  { name: "آرایشگاه", id: 14 },
  { name: "ماساژ", id: 15 },
  { name: "ماساژ", id: 15 },
  { name: "بوتیک مردانه", id: 16 },
  { name: "بوتیک زنانه", id: 17 },
  { name: "کافه", id: 18 },
  { name: "نوشیدنی", id: 1 },
  { name: "عصرانه", id: 2 },
  { name: "غذای گرم", id: 3 },
  { name: "غذای سرد", id: 4 },
  { name: "صبحانه", id: 5 },
  { name: "شام", id: 6 },
  { name: "ناهار", id: 7 },
  { name: "قهوه", id: 8 },
  { name: "همبرگر", id: 9 },
  { name: "کارواش", id: 9 },
  { name: "رستوران", id: 13 },
  { name: "آرایشگاه", id: 14 },
  { name: "ماساژ", id: 15 },
  { name: "ماساژ", id: 15 },
  { name: "بوتیک مردانه", id: 16 },
  { name: "بوتیک زنانه", id: 17 },
  { name: "کافه", id: 18 },
  { name: "نوشیدنی", id: 1 },
  { name: "عصرانه", id: 2 },
  { name: "غذای گرم", id: 3 },
  { name: "غذای سرد", id: 4 },
  { name: "صبحانه", id: 5 },
  { name: "شام", id: 6 },
  { name: "ناهار", id: 7 },
  { name: "قهوه", id: 8 },
  { name: "همبرگر", id: 9 },
  { name: "کارواش", id: 9 },
  { name: "رستوران", id: 13 },
  { name: "آرایشگاه", id: 14 },
  { name: "ماساژ", id: 15 },
  { name: "ماساژ", id: 15 },
  { name: "بوتیک مردانه", id: 16 },
  { name: "بوتیک زنانه", id: 17 },
  { name: "کافه", id: 18 },
  { name: "نوشیدنی", id: 1 },
  { name: "عصرانه", id: 2 },
  { name: "غذای گرم", id: 3 },
  { name: "غذای سرد", id: 4 },
  { name: "صبحانه", id: 5 },
  { name: "شام", id: 6 },
  { name: "ناهار", id: 7 },
  { name: "قهوه", id: 8 },
  { name: "همبرگر", id: 9 },
  { name: "کارواش", id: 9 },
  { name: "رستوران", id: 13 },
  { name: "آرایشگاه", id: 14 },
  { name: "ماساژ", id: 15 },
  { name: "بوتیک مردانه", id: 16 },
  { name: "بوتیک زنانه", id: 17 },
  { name: "کافه", id: 18 },
];

const ConfirmOrderForm = () => {
  return (
    <Container>
      <div className="profile">
        <img
          className="profile-user"
          src="https://kadolin.ir/mag/wp-content/uploads/2022/04/Pizza-recipe.jpg"
        />
        <h1 className="profile-username">حسین لادمخی نژاد</h1>
        <p className="profile-text">موجودی کیف پول : 400.000.000 تومان</p>
      </div>
      <div className="order">
        {subItems.map((subItem) => (
          <div className="order-item">
            <img
              className="order-img"
              src="https://kadolin.ir/mag/wp-content/uploads/2022/04/Pizza-recipe.jpg"
            />
            <div style={{ paddingInline: "10px" }}>
              <h1 style={{ fontSize: "16px" }}>پیتزای پپرونی</h1>
              <p style={{ fontSize: "13px" }}>قیمت :‌ 120.000.000 تومان</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <div className="detail">
          <span>جمع کل</span>
          <span>100.000.000 تومان</span>
        </div>
        <button className="pay">پرداخت نهایی</button>
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
  ".profile": {
    textAlign: "center",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    "&-user": {
      height: "80px",
      width: "80px",
      borderRadius: "50%",
    },
    "&-username": {
      fontSize: "17px",
    },
    "&-text": {
      fontSize: "14px",
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
  },

  ".detail": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontWeight: "bold",
    marginBottom: "20px",
    fontSize: "14px",
  },

  ".order": {
    maxHeight: "240px",
    flex: 1,
    overflowY: "auto",
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
