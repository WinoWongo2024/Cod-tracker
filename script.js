fetch('data.json') // Fetch your JSON file
  .then(response => response.json())
  .then(data => {
    const statsContainer = document.getElementById('stats-container');
    const stats = data.stats;

    stats.forEach(stat => {
      const statCard = document.createElement('div');
      statCard.classList.add('stat-card');

      statCard.innerHTML = `
        <h2>${stat.date} - ${stat.mode}</h2>
        <p>Matches Played: ${stat.matchesPlayed}</p>
        <p>MVP Games: ${stat.mvpGames}</p>
        <p>Top 3 Kills: ${stat.top3Kills}</p>
        <p>Kills: ${stat.kills}</p>
        <p>Deaths: ${stat.deaths}</p>
        <p>K/D: ${(stat.kills / stat.deaths).toFixed(2)}</p>
        <p>Accuracy: ${stat.accuracy}%</p>
      `;

      statsContainer.appendChild(statCard);
    });
  });
