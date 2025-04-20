window.addEventListener('DOMContentLoaded', () => {
    fetch('apps.json')
      .then(res => res.json())
      .then(apps => {
        const container = document.getElementById('app-list');
  
        apps.forEach(app => {
          const card = document.createElement('div');
          card.className = 'app-card';
  
          card.innerHTML = `
            <img src="${app.logo}" alt="${app.name}" class="app-logo">
            <div class="app-content">
              <div class="app-name">${app.name}</div>
              <div class="app-description">${app.description}</div>
              <a href="${app.link}" class="download-btn" target="_blank">立即下载</a>
            </div>
          `;
  
          const description = card.querySelector('.app-description');
          description.addEventListener('click', () => {
            description.classList.toggle('expanded');
          });
  
          container.appendChild(card);
        });
      });
  });
  