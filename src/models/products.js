class Product {
    constructor(title, description, image, category, sector, status) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.category = category;
        this.sector = sector;
        this.create_at = new Date();
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Product;
