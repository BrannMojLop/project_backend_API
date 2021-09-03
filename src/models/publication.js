class Publication {
    constructor(id_product, prices, date_finished, status) {
        this.id_product = id_product;
        this.prices = prices;
        this.create_at = new Date();
        this.finished_at = new Date(date_finished.year, date_finished.month, date_finished.day);
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Publication;