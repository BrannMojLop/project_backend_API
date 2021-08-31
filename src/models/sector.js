class Sector {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.create_at = new Date();
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Sector;
