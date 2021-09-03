class TypeUser {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.create_at = new Date();
        this.update_at = new Date();
    }
}

module.exports = TypeUser;