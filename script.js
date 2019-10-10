window.addEventListener("load", function() {
    let json = [];
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response){
        response.json().then(function(json) {
            const container = document.getElementById("container");
            let index = 0;
            let activeStatus = document.getElementsByClassName("activeClass");

            // Sorts astronauts from most to least time in space
            json.sort((a, b) => (a.hoursInSpace < b.hoursInSpace) ? 1 : -1);

            // Creates body of the html document
            while (index < json.length) {
                let indexSkills = 0;
                let astronautSkills = [];
                while (indexSkills < json[index].skills.length) {
                    astronautSkills.push(json[index].skills[indexSkills]);
                    indexSkills += 1;
                }
                container.innerHTML += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${json[index].firstName} ${json[index].lastName}</h3>
                            <ul>
                                <li>Hours in space: ${json[index].hoursInSpace}</li>
                                <li class="activeClass">Active: ${json[index].active}</li>
                                <li>Skills: ${astronautSkills.join(", ")}</li>
                            </ul>
                        </div>
                        <img class="avatar" src="${json[index].picture}">
                    </div>
                `;
                index += 1;
            }
            
            // Makes the "Active: true" text green, for astronauts that are still active (active is true)
            for (let i = 0; i < activeStatus.length; i++) {
                if (activeStatus[i].innerHTML === "Active: true") {
                    activeStatus[i].style.color = "green";
                }
            }

            // Adds a count of astronauts to the page
            container.innerHTML += `
            <div>
                <h3>Astronaut Count: ${json.length}</h3>
            </div>
            `;
        });
    });
});