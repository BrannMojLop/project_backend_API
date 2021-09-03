class Category {
    constructor(title, description, id_sector, status) {
        this.title = title;
        this.description = description;
        this.id_sector = id_sector;
        this.create_at = new Date();
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Category;
