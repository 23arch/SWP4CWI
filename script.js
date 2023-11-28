const loadData = () => {
    fetch("").then((result) =>{
        result.json().then((data) => {
            console.log(data);
            filltable(data);
        });
    });
};
 
const filltable =  (data) => {
    let html = "";
    data.array.forEach(element => {
        html += "<div>" + element.points + " by Team" +  element.teamName + "</div>";    
    });
    document.getElementById("").innerHTML = html;
};  
 
localData();



function loadMatches(){
 
    fetch('https://api-basketball.p.rapidapi.com/')
      .then(response => response.json())
      .then(json => fillTable(json))
}
 
 
function fillTable(data){
    console.log(data);
    let table = "";
    data.forEach((team, index) => {
        // let position = index +1;
       let output =
       
       '<div class="component">' + team.teamName +
       '<div class="wappen"><img src="' + team.teamIconUrl + '" alt="" height="35px" width="35px">' +
       '</div><div class="pk">' + team.points + '</div> <div class="Games">' + team.matches + '</div> <div class="Sieg">' + team.won + '</div>' +
       '<div class="Unent">' + team.draw + '</div> <div class="Nied">' + team.lost + '</div> </div>';
 
       table += output;
    });
    document.getElementById("table").innerHTML=table;
}
 
loadMatches();