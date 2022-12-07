module.exports = {
    url: `mongodb://root:${process.env.DB_PASS}@cluster0-shard-00-00-62xni.gcp.mongodb.net:27017,cluster0-shard-00-01-62xni.gcp.mongodb.net:27017,cluster0-shard-00-02-62xni.gcp.mongodb.net:27017/healthfromugo?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
}
/*module.exports = {
	url: 'mongodb://localhost:27017/healthfromugo'
}  */
