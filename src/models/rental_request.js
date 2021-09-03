class Rental_Request {
    constructor(id_lessee, id_publicacion, status) {
        this.id_lessee = id_lessee;
        this.id_publicacion = id_publicacion;
        this.answer = false;
        this.create_at = new Date();
        this.update_at = new Date();
        this.status = status;
    }
}

module.exports = Rental_Request;