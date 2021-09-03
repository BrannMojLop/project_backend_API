class Product {
    constructor(title, description, image, id_category, id_lessor, status) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.id_category = id_category;
        this.id_lessor = id_lessor;
        this.create_at = new Date();
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Product;
