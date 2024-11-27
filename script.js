document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loading');
  window.addEventListener('load', () => {
    document.body.classList.remove('loading');
  });

  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  document.getElementById('getStarted').addEventListener('click', () => {
    document.getElementById('dataInputScreen').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('connectWearable').addEventListener('click', () => {
    alert('Connecting to wearable device...');
  });

  document.getElementById('uploadFile').addEventListener('click', () => {
    document.getElementById('fileUpload').click();
  });

  document.getElementById('fileUpload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`File ${file.name} uploaded successfully.`);
      // Process the file here
    }
  });

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
        title: {
          display: true,
          text: 'Real-Time Engagement Metrics'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
        zoom: {
          pan: {
            enabled: true,
            mode: 'x',
          },
          zoom: {
            enabled: true,
            mode: 'x',
          }
        }
      },
      scales: {
        y: { beginAtZero: true },
        x: { title: { display: true, text: 'Time (s)' } }
      }
    }
  });

  // Simulate real-time data updates
  let time = 0;
  setInterval(() => {
    const physical = Math.random() * 100;
    const mental = Math.random() * 100;
    const emotional = Math.random() * 100;
    const spiritual = Math.random() * 100;

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
    time++;
  }, 1000);

  // Handle feedback form submission
  document.getElementById('feedbackForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const feedback = document.getElementById('feedback').value;
    alert(`Thank you for your feedback, ${name}!`);
    // Process the feedback here
  });
});
