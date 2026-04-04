const { connectRedis } = require("../config/redis.config");
const app = require("./app");
const PORT = process.env.PORT || 3000;
// console.log(process.env.DATABASE_URL);
connectRedis();
app.listen(PORT,()=>{
    console.log(`Serve is running on ${PORT}`);
});