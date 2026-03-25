const express = require("express");
const cors = require("cors");
const authRoute = require("../routes/auth.routes");
const transactionRoute = require("../routes/transaction.routes");
const accountRoute = require("../routes/account.routes");
const gettransactionsRoute = require("../routes/gettransactions.routes");
const getTransactionsDateWiseRoute = require("../routes/getTransactionsByDateRange.routes");
const getTransactionsByModeRoute = require("../routes/getTransactionsByMode.routes");
const createCategoryRoute = require("../routes/category.routes");
const getCategorizedTransactions = require("../routes/getTransactionsByCategory.routes");
const getTotalAmountRoute = require("../routes/getTotalAmount.routes");
const getTotalAmountForCategory = require("../routes/getTotalAmountForCategories.route");
const getAmountByModeRoute = require("../routes/getAmountByMode.route");
const getMonthlyAmountRoute = require("../routes/getMonthlyAmountForGivenYear.route");
const getFilteredTransactionsRoute = require("../routes/getFilteredTransactions.route");
const addTransactionRoute = require("../routes/addTransaction.routes");
const getUsersProfileInfo = require("../routes/profile.routes");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "https://finanace-dashboard-deployement.vercel.app", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.get("/",(req,res)=>{
    res.send("Server running Perfectly!");
});
app.use("/auth",authRoute);
app.use("/uploadcsv",transactionRoute);
app.use("/bankaccount",accountRoute);
app.use("/gettransactions",gettransactionsRoute);
app.use("/gettransactionsdaterange",getTransactionsDateWiseRoute);
app.use("/getTransactionsbymode",getTransactionsByModeRoute);
app.use("/addcategory",createCategoryRoute);
app.use("/gettransactionsforcategory",getCategorizedTransactions);
app.use("/gettotalamount",getTotalAmountRoute); 
app.use("/gettotalamountforcategory",getTotalAmountForCategory);
app.use("/getamountbymode",getAmountByModeRoute);
app.use("/getmonthlyamountforyear",getMonthlyAmountRoute);
app.use("/getfilteredtransactions",getFilteredTransactionsRoute);
app.use("/addtransaction",addTransactionRoute);
app.use("/profile",getUsersProfileInfo);
module.exports = app;