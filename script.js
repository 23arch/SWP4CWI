document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://api.openligadb.de/getbltable/öbl1/2023";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log("data:", data);
            const sortedData = data.sort((a, b) => a.place - b.place);
            const apiDataContainer = document.getElementById("result");
            const teamsToShow = sortedData.slice(0, 5);

            teamsToShow.forEach(team => {
                console.log(team.teamName);
                const teamElement = document.createElement("div");
                teamElement.classList.add("wrapper");
                teamElement.innerHTML = `
                    <img class="logo" src="${team.teamIconUrl}" style="height: 40px;">
                    <div class="team">${team.teamName}</div>
                    <div class="circle">${team.won}</div>
                    <div class="circle">${team.lost}</div>
                    <div class="circle">${team.points}</div>
                    <div class="wrt">${team.goalDiff}</div>
                `;
                apiDataContainer.appendChild(teamElement);
            });
        })
        .catch(error => console.error("Error fetching data:", error));
});
