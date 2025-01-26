document.addEventListener('DOMContentLoaded', () => { // Ensure DOM is fully loaded

  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const statsContainer = document.getElementById('stats-container');

      if (!data || !data.stats || !Array.isArray(data.stats)) {
        console.error("Invalid JSON data format. Check your data.json file.");
        statsContainer.innerHTML = "<p>Error: Invalid data format.</p>";
        return;
      }

      const stats = data.stats;

      if (stats.length === 0) {
        statsContainer.innerHTML = "<p>No stats data available.</p>";
        return;
      }

      stats.forEach(stat => {
        const statCard = document.createElement('div');
        statCard.classList.add('stat-card');

        const kills = stat.kills || 0;
        const deaths = stat.deaths || 0;
        const kdRatio = deaths === 0 ? kills.toFixed(2) : (kills / deaths).toFixed(2);
          const accuracy = stat.accuracy || 0;

        statCard.innerHTML = `
          <h2>${stat.date || "N/A"} - ${stat.mode || "N/A"}</h2>
          <p>Matches Played: ${stat.gamesPlayed || 0}</p>
          <p>MVP Games: ${stat.mvpGames || 0}</p>
          <p>Top 3 Kills: ${stat.top3Kills || 0}</p>
          <p>Kills: ${kills}</p>
          <p>Deaths: ${deaths}</p>
          <p>K/D: ${kdRatio}</p>
          <p>Accuracy: ${accuracy.toFixed(2) || "N/A"}%</p>
        `;

        statsContainer.appendChild(statCard);
      });
    })
    .catch(error => {
      console.error("Error fetching or parsing JSON:", error);
      const statsContainer = document.getElementById('stats-container');
      statsContainer.innerHTML = "<p>Error loading stats. Check console.</p>";
    });
});
