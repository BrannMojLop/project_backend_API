class Rental {
    constructor(id_lessor, id_lessee, id_product, price, payment, start_date, end_date) {
        this.id_lessor = id_lessor;
        this.id_lessee = id_lessee;
        this.id_product = id_product;
        this.price = price;
        this.payment = payment;
        this.start_date = new Date(start_date.year, start_date.month, start_date.day,);
        this.end_date = new Date(end_date.year, end_date.month, end_date.day);
    }
}

module.exports = Rental;
