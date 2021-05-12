var configData = {
    DB: {
        protocol: "mongodb+srv",
        userName: "hellobye9290",
        userPW: "tmteatn319",
        path: "cluster0.x9izi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
        getfullURL: function() {
            return`${this.protocol}://${this.userName}:${this.userPW}@${this.path}`;
        },
    },
    TOKEN: {
        SECRET_KEY: "qodn39d1md",
    },
}

module.exports = configData;