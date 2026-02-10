const { createClient } = require("redis");

const client = createClient({
  username: "default",
  password: "Ywul4arBasSgVJzJhew9Xt4U6oeu8Z0V",
socket: {
        host: 'redis-17113.crce217.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 17113
    }
});

client.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

module.exports = client;
