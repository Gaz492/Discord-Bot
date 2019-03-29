module.exports = {
    discord: {
        bot_token: "",
        client_id: "",
        activityText: "I spy 👀"
    },
    web: {
        port: 3030
    },
    mongodb: {
        URI: process.env.mongoURI || 'mongodb://localhost/discordBot'
    }
}
