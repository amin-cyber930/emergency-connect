// book.js - نظام الحجوزات
class Book {
    constructor() {
        this.list = JSON.parse(localStorage.getItem('bookList')) || [];
    }

    add(doctor, date, time, patient) {
        const item = {
            id: Date.now(),
            doctor: doctor,
            date: date,
            time: time,
            patient: patient,
            status: 'new'
        };

        this.list.push(item);
        this.save();
        return item;
    }

    save() {
        localStorage.setItem('bookList', JSON.stringify(this.list));
    }

    getAll() {
        return this.list;
    }
}

const bookSystem = new Book();