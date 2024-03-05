document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://api.openligadb.de/getmatchdata/öbl1/2023";

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          console.log("data:", data);

          const upcomingMatchesContainer = document.getElementById("upcomingMatches");
          const showMoreBtn = document.getElementById("showMoreBtn");
          const showMoreContainer = document.getElementById("showMoreContainer");

          const upcomingMatches = data.filter(match => {
              const matchDateTime = new Date(match.matchDateTime);
              const currentDate = new Date();
              const oneDay = 24 * 60 * 60 * 1000;
              return matchDateTime < currentDate && !match.matchIsFinished;
          });

          const addMatchesToContainer = (matches, container, limit) => {
              matches.slice(0, limit).forEach(match => {
                  const matchElement = document.createElement("div");
                  matchElement.classList.add("wri");
                  const team1Element = document.createElement("div");
                  team1Element.classList.add("wrapper2");
                  team1Element.innerHTML = `
                      <img class="logo" src="${match.team1.teamIconUrl}" style="height: 2vw;">
                      <div class="team">${match.team1.teamName}</div>
                  `;

                  matchElement.appendChild(team1Element);
                  const matchTimeElement = document.createElement("div");
                  matchTimeElement.classList.add("text2");
                  const formattedMatchDateTime = new Date(match.matchDateTime).toLocaleString('de-DE', {
                      day: 'numeric',
                      month: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                  });

                  matchTimeElement.textContent = formattedMatchDateTime + ' Uhr';
                  matchElement.appendChild(matchTimeElement);
                  const team2Element = document.createElement("div");
                  team2Element.classList.add("wrapper2");
                  team2Element.innerHTML = `
                      <img class="logo" src="${match.team2.teamIconUrl}" style="height: 2vw;">
                      <div class="team">${match.team2.teamName}</div>
                  `;
                  matchElement.appendChild(team2Element);
                  container.appendChild(matchElement);
              });

          };
          addMatchesToContainer(upcomingMatches, upcomingMatchesContainer, 5);
          window.showMoreMatches = () => {
              upcomingMatchesContainer.innerHTML = ''; 
              addMatchesToContainer(upcomingMatches, upcomingMatchesContainer, upcomingMatches.length);
              showMoreContainer.style.display = 'none'; 
          };

          if (upcomingMatches.length > 5) {
              showMoreContainer.style.display = 'block';
          }
      })
      .catch(error => console.error("Error fetching data:", error));
});
