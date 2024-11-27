let dataStore = [];
let time = 0;
let trackingInterval;

// Initialize Chart.js
const ctx = document.getElementById('engagementChart').getContext('2d');
const engagementChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      { label: 'Physical Engagement', data: [], borderColor: 'blue', fill: false },
      { label: 'Mental Engagement', data: [], borderColor: 'purple', fill: false },
      { label: 'Emotional Engagement', data: [], borderColor: 'red', fill: false },
      { label: 'Spiritual Engagement', data: [], borderColor: 'green', fill: false }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      title: { display: true, text: 'Real-Time Engagement Metrics' },
      legend: { display: true, position: 'bottom' }
    },
    scales: {
      y: { beginAtZero: true },
      x: { title: { display: true, text: 'Time (s)' } }
    }
  }
});

// Start Tracking
document.getElementById('startTracking').addEventListener('click', () => {
  alert("Tracking Started");
  trackingInterval = setInterval(() => {
    const physical = Math.random() * 100;
    const mental = Math.random() * 100;
    const emotional = Math.random() * 100;
    const spiritual = Math.random() * 100;

    // Update Table
    const row = `<tr>
      <td>${time}</td>
      <td>${physical.toFixed(2)}</td>
      <td>${mental.toFixed(2)}</td>
      <td>${emotional.toFixed(2)}</td>
      <td>${spiritual.toFixed(2)}</td>
    </tr>`;
    document.querySelector('#dataTable tbody').insertAdjacentHTML('beforeend', row);

    // Update Chart
    engagementChart.data.labels.push(time);
    engagementChart.data.datasets[0].data.push(physical);
    engagementChart.data.datasets[1].data.push(mental);
    engagementChart.data.datasets[2].data.push(emotional);
    engagementChart.data.datasets[3].data.push(spiritual);

    if (engagementChart.data.labels.length > 20) {
      engagementChart.data.labels.shift();
      engagementChart.data.datasets.forEach(dataset => dataset.data.shift());
    }
    engagementChart.update();

    // Store Data
    dataStore.push({ time, physical, mental, emotional, spiritual });
    time++;
  }, 1000);
});

// Stop Tracking
document.getElementById('stopTracking').addEventListener('click', () => {
  clearInterval(trackingInterval);
  alert('Tracking Stopped');
});

// Export Data
document.getElementById('exportData').addEventListener('click', () => {
  if (dataStore.length === 0) {
    alert('No data to export. Start tracking first.');
    return;
  }

  const csv = "data:text/csv;charset=utf-8," +
    ["Time,Physical,Mental,Emotional,Spiritual"]
      .concat(dataStore.map(d => `${d.time},${d.physical.toFixed(2)},${d.mental.toFixed(2)},${d.emotional.toFixed(2)},${d.spiritual.toFixed(2)}`))
      .join("\n");

  const link = document.createElement('a');
  link.href = encodeURI(csv);
  link.download = 'engagement_data.csv';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
