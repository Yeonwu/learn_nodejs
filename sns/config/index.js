var configData = {
    DB: {
        protocol: "mongodb+srv",
        userName: "",
        userPW: "",
        path: "",
        getfullURL: function() {
            return`${this.protocol}://${this.userName}:${this.userPW}@${this.path}`;
        },
    },
    TOKEN: {
        SECRET_KEY: "",
    },
}

module.exports = configData;
