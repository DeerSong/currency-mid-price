document.addEventListener('DOMContentLoaded', function() {
  console.log('popup 已加载');
  
  // 添加加载中的提示
  const rateList = document.getElementById('rateList');
  rateList.innerHTML = '正在加载数据...';
  
  fetch('https://m.cmbchina.com/api/rate/fx-rate', {
    // 添加请求头
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // 添加模式
    mode: 'cors'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const rateList = document.getElementById('rateList');
      
      // 添加更新时间
      const updateTimeDiv = document.createElement('div');
      updateTimeDiv.className = 'update-time';
      updateTimeDiv.textContent = `更新时间：${data.body.time}`;
      
      // 创建表格
      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      
      // 创建表头
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th>币种</th>
          <th>中间价</th>
          <th>现汇买入</th>
          <th>现汇卖出</th>
          <th>现钞买入</th>
          <th>现钞卖出</th>
        </tr>
      `;
      table.appendChild(thead);
      
      // 创建表体
      const tbody = document.createElement('tbody');
      data.body.data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.ccyNbr}</td>
          <td class="middle-rate">${item.rtbBid}</td>
          <td>${item.rthBid}</td>
          <td>${item.rthOfr}</td>
          <td>${item.rtcBid}</td>
          <td>${item.rtcOfr}</td>
        `;
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      
      // 清空原有内容并添加更新时间和表格
      rateList.innerHTML = '';
      rateList.appendChild(updateTimeDiv);
      rateList.appendChild(table);
    })
    .catch(error => {
      console.error('错误:', error);
      rateList.innerHTML = `
        <div style="color: red; padding: 10px;">
          加载失败: ${error.message}<br>
          可能原因：<br>
          1. 网络连接问题<br>
          2. 请先访问招商银行网站以建立连接<br>
          3. 服务器暂时无响应<br>
          <button onclick="window.location.reload()" 
                  style="margin-top: 10px; 
                         padding: 6px 12px; 
                         border: none; 
                         background: #1890ff; 
                         color: white; 
                         border-radius: 4px; 
                         cursor: pointer;">
            重试
          </button>
        </div>
      `;
    });
});