class User {
    constructor(firstname, lastname, email, username, password, type) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.type = type;
        this.create_at = new Date();
        this.update_at = new Date();
    }
}

module.exports = User;