const {createClient} = require("redis");

console.log("redis pass is ",process.env.REDIS_PASS);
const client = createClient({
    username: 'default',
    password: "oq0ifX7CaX1j60mBgGT2466j72iiLV0F",
    socket: {
        host: 'redis-15091.crce263.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 15091
    }
});

client.on('error', err => console.log('Redis Client Error', err));

async function connectRedis() {
    await client.connect();
    console.log("redis connected");

    
// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log("redis data is ",result)  // >>> bar

}



module.exports = {connectRedis ,client};

