class User {
    constructor(firstname, lastname, email, username, password, id_type) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.username = username;
        this.password = password;
        this.id_type = id_type;
        this.create_at = new Date();
        this.update_at = new Date();
    }
}

module.exports = User;