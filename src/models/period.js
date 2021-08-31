class Period {
    constructor(name, days) {
        this.name = name;
        this.days = days;
        this.create_at = new Date();
        this.update_at = new Date();
    }
}

module.exports = Period;
