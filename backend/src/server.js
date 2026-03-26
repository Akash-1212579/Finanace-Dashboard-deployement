const app = require("./app");
const PORT = process.env.PORT || 3000;
console.log(process.env.DATABASE_URL);
app.listen(PORT,()=>{
    console.log(`Serve is running on ${PORT}`);
})