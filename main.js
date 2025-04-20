fetch('apps.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('app-container');
    data.forEach((app, index) => {
      const card = document.createElement('div');
      card.className = 'app-card';
      card.style.backgroundColor = index % 2 === 0 ? '#f1f8ff' : '#f9f9f9';
      
      // 创建应用卡片的内容
      card.innerHTML = `
        <img src="${app.logo}" alt="${app.name}" class="app-logo">
        <div class="app-content">
          <div class="app-name">${app.name}</div>
          <div class="app-description" onclick="toggleDescription(this)">${app.description}</div>
          <a href="${app.download}" class="download-btn" target="_blank">立即下载</a>
        </div>
      `;
      
      // 将卡片添加到容器中
      container.appendChild(card);
    });
  });

// 切换描述的展开和折叠
function toggleDescription(element) {
  // 切换 'expanded' 类来控制描述是否展开
  element.classList.toggle('expanded');
}
