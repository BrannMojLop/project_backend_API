class Category {
    constructor(title, description, sector, status) {
        this.title = title;
        this.description = description;
        this.sector = sector;
        this.create_at = new Date();
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Category;
