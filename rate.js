// rate.js - نظام التقييم
class Rate {
    constructor() {
        this.list = JSON.parse(localStorage.getItem('rateList')) || [];
    }

    add(service, stars, text) {
        const item = {
            service: service,
            stars: stars,
            text: text,
            date: new Date()
        };

        this.list.push(item);
        this.save();
        return item;
    }

    save() {
        localStorage.setItem('rateList', JSON.stringify(this.list));
    }

    getAvg(service) {
        const items = this.list.filter(item => item.service === service);
        if (items.length === 0) return 0;
        
        const total = items.reduce((sum, item) => sum + item.stars, 0);
        return total / items.length;
    }
}

const rateSystem = new Rate();