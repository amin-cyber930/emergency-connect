// map.js - الخرائط
class Map {
    constructor() {
        this.map = null;
    }

    init(box) {
        // كود الخريطة الأساسي
        console.log('Map ready for:', box);
        return true;
    }

    addSpot(name, lat, lng) {
        return {
            name: name,
            lat: lat,
            lng: lng,
            added: new Date()
        };
    }
}

const mapSystem = new Map();