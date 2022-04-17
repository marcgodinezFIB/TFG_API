module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://marc:marc@cluster0.8nfle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    SECRET_TOKEN: 'miclavedetokens'
}