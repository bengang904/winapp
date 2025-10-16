let allAppsData = [];
let filteredAppsData = [];

function renderApps(appsToRender) {
    const container = document.getElementById('app-container');
    container.innerHTML = '';

    appsToRender.forEach((app, index) => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.style.backgroundColor = index % 2 === 0 ? '#f1f8ff' : '#f9f9f9';
        
        card.innerHTML = `
            <img src="${app.logo}" alt="${app.name}" class="app-logo">
            <div class="app-content">
                <div class="app-name">${app.name}</div>
                <div class="app-description" onclick="toggleDescription(this)">${app.description}</div>
                <a href="${app.download}" class="download-btn" target="_blank">立即下载</a>
            </div>
        `;
        
        container.appendChild(card);
    });

    if (appsToRender.length === 0) {
        container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; font-size: 1.2em; color: #555;">抱歉，没有找到匹配的应用。</p>';
    }
}

function executeSearch(query) {
    const lowerCaseQuery = query.trim().toLowerCase();

    if (!lowerCaseQuery) {
        filteredAppsData = [...allAppsData];
    } else {
        filteredAppsData = allAppsData.filter(app => 
            (app.name && app.name.toLowerCase().includes(lowerCaseQuery)) || 
            (app.description && app.description.toLowerCase().includes(lowerCaseQuery))
        );
    }
    
    renderApps(filteredAppsData);
}

function searchApps() {
    const query = document.getElementById("search-input").value.trim();
    
    const baseUrl = window.location.origin + window.location.pathname;
    let newUrl;
    
    if (query === "") {
        newUrl = baseUrl;
    } else {
        newUrl = `${baseUrl}?q=${encodeURIComponent(query)}`;
    }
    
    window.location.href = newUrl;
}

function toggleDescription(element) {
    element.classList.toggle('expanded');
}


document.addEventListener("DOMContentLoaded", () => {
    fetch('apps.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allAppsData = data;
            
            const urlParams = new URLSearchParams(window.location.search);
            const initialQuery = urlParams.get('q');

            if (initialQuery) {
                const searchInput = document.getElementById("search-input");
                searchInput.value = initialQuery;
                executeSearch(initialQuery);
            } else {
                filteredAppsData = [...allAppsData]; 
                renderApps(filteredAppsData);
            }
            
            const searchInput = document.getElementById("search-input");
            searchInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    searchApps();
                }
            });
        })
        .catch(error => {
            console.error("加载应用数据失败:", error);
            const container = document.getElementById('app-container');
            container.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: red;">加载应用数据失败，请检查 apps.json 文件。</p>';
        });
});
