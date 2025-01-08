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
      
      // 创建表格
      const table = document.createElement('table');
      table.style.borderCollapse = 'collapse';
      table.style.width = '100%';
      
      // 创建表头
      const thead = document.createElement('thead');
      thead.innerHTML = `
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px;">币种</th>
          <th style="border: 1px solid #ddd; padding: 8px;">中间价</th>
          <th style="border: 1px solid #ddd; padding: 8px;">现汇买入</th>
          <th style="border: 1px solid #ddd; padding: 8px;">现汇卖出</th>
          <th style="border: 1px solid #ddd; padding: 8px;">现钞买入</th>
          <th style="border: 1px solid #ddd; padding: 8px;">现钞卖出</th>
        </tr>
      `;
      table.appendChild(thead);
      
      // 创建表体
      const tbody = document.createElement('tbody');
      data.body.data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td style="border: 1px solid #ddd; padding: 8px;">${item.ccyNbr}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.rtbBid}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.rthBid}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.rthOfr}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.rtcBid}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${item.rtcOfr}</td>
        `;
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
      
      // 清空原有内容并添加表格
      rateList.innerHTML = '';
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
          <button onclick="window.location.reload()" style="margin-top: 10px;">重试</button>
        </div>
      `;
    });
});