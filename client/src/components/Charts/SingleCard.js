import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import SingleCards from "./SingleCards.module.css";
<<<<<<< HEAD

export const CardBalanceOne = (props) => {
  const { averageOrderValue } = props;
=======
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c

  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            height: 170,
<<<<<<< HEAD
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#ffffff",
=======
            pt: 0.5,
            pb: 0.5,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#fee7cb",
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
<<<<<<< HEAD
              // borderRight: "20px solid #368681",
              borderBottom: "20px solid #368681",
              borderLeft: "20px solid #fee7cb",
              height: "100%",
              borderRadius: 2,
              
=======
              borderLeft: "8px solid",
              height: "100%",
              borderRadius: 2,
              borderLeftColor: "#368681",
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
<<<<<<< HEAD
                textAlign:"center",
                fontWeight:"bold"
              }}
            >
              قيمة الطلب الإجمالي
=======
              }}
            >
              {/* {title} */}
              Revenue
              {/* الربح */}
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
<<<<<<< HEAD
                textAlign:"center"
              }}
            >
              {averageOrderValue !== null
                ? `${averageOrderValue}`
                : "Loading..."}
=======
              }}
            >
              {/* {unit} {amount} */}
              unit amount
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c
            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};

<<<<<<< HEAD
export const CardBalanceTwo = (revenue) => {
  const { totalRevenueToday } = revenue;
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            height: 170,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#ffffff",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderBottom: "20px solid #368681",
              borderLeft: "20px solid #fee7cb",
              height: "100%",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
                textAlign:"center",
                fontWeight:"bold"
              }}
            >
              إجمالي الربح اليومي
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign:"center",

              }}
            >
              {totalRevenueToday !== null ? `${totalRevenueToday} $`: "Loading..." }

            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};

export const CardBalanceThree = (users) => {
  const { totalUsers } = users;
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            height: 170,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#ffffff",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderBottom: "20px solid #368681",
              borderLeft: "20px solid #fee7cb",
              height: "100%",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
                textAlign:"center",
                fontWeight:"bold"
              }}
            >
              إجمالي المستخدمين
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign:"center",

              }}
            >
              {totalUsers !== null ? `${totalUsers} مستخدم` : "Loading..."}
            </Typography>
          </Box>
        </Paper>
      </div>
    </>
  );
};

export const CardBalanceFour = (product) => {
  const {totalProducts} = product
  return (
    <>
      <div className={SingleCards.main}>
        <Paper
          variant="outlined"
          sx={{
            width: 320,
            height: 170,
            borderRadius: "12px",
            border: "1px solid #E6E9EE",
            backgroundColor: "#ffffff",
          }}
        >
          {/* <div className={SingleCards.box1}> */}
          <Box
            sx={{
              borderBottom: "20px solid #368681",
              borderLeft: "20px solid #fee7cb",
              height: "100%",
              borderRadius: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                p: 2,
                ml: 2,
                color: "#4D342B",
                textAlign:"center",
                fontWeight:"bold"
              }}
            >
              إجمالي المنتجات
            </Typography>
            <Typography
              variant="body1"
              sx={{
                p: 2,
                ml: 2,
                fontWeight: "600",
                fontSize: "20px",
                color: "#368681",
                textAlign:"center",
              }}
            >
              {totalProducts !== null ? `${totalProducts} منتجات` : "Loading..."}
            </Typography>
          </Box>
          {/* </div> */}
        </Paper>
      </div>
    </>
  );
};
=======
export default CardBalance;
>>>>>>> b862b33e879d57931a28395af05066112d9bcf2c
