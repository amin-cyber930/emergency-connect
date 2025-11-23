// search.js
class EmergencySearch {
    constructor() {
        this.doctors = [
            { name: "د/خالد رشاد", specialty: "أطفال", phone: "01120980999", location: "قوص المركز" },
            { name: "د/عادل قطمة", specialty: "أطفال", phone: "01098869679", location: "قوص المركز" }
        ];
        
        this.initSearch();
    }

    initSearch() {
        // إضافة شريط البحث في الهيدر
        const searchHTML = `
            <div class="search-container" style="margin-right: 20px;">
                <input type="text" id="globalSearch" placeholder="ابحث عن طبيب أو صيدلية..." 
                       style="padding: 8px 12px; border: 1px solid #ddd; border-radius: 20px; width: 250px;">
                <button onclick="emergencySearch.performSearch()" 
                        style="background: var(--primary); color: white; border: none; padding: 8px 15px; border-radius: 20px; margin-right: 5px;">
                    <i class="fas fa-search"></i>
                </button>
            </div>
        `;
        
        const nav = document.querySelector('nav');
        nav.insertAdjacentHTML('beforeend', searchHTML);
    }

    performSearch() {
        const query = document.getElementById('globalSearch').value.toLowerCase();
        if (query.length < 2) return;

        const results = {
            doctors: this.doctors.filter(d => 
                d.name.toLowerCase().includes(query) || 
                d.specialty.toLowerCase().includes(query)
            ),
            pharmacies: this.pharmacies.filter(p =>
                p.name.toLowerCase().includes(query)
            )
        };

        this.displayResults(results);
    }

    displayResults(results) {
        // عرض النتائج في صفحة مخصصة أو modal
        let resultsHTML = '<div class="search-results" style="background: white; padding: 20px; border-radius: 10px; margin-top: 10px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">';
        
        if (results.doctors.length > 0) {
            resultsHTML += '<h3>الأطباء:</h3>';
            results.doctors.forEach(doctor => {
                resultsHTML += `
                    <div class="doctor-result" style="padding: 10px; border-bottom: 1px solid #eee;">
                        <strong>${doctor.name}</strong> - ${doctor.specialty}<br>
                        <small>${doctor.phone} | ${doctor.location}</small>
                    </div>
                `;
            });
        }

        resultsHTML += '</div>';

        // إظهار النتائج تحت شريط البحث
        const existingResults = document.querySelector('.search-results');
        if (existingResults) existingResults.remove();
        
        document.querySelector('.search-container').insertAdjacentHTML('afterend', resultsHTML);
    }
}

// إنشاء كائن البحث
const emergencySearch = new EmergencySearch();