//این تابع برای ادد کردن تعدادی اتربیوت هست
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

// let playedteams =[];
//این تابع نتایج بازی هارا گرفته و امتیازات را اضافه میکند
let resualtArray = [];
handleCreateScoreTable = (TeamScore) => {
    let mustBePushed;
    let mustBeAdded;
    const obj = {
        teamName: TeamScore[0],
        score: TeamScore[1],
        goalFor: TeamScore[2],
        goalAgainst: TeamScore[3],
    }
    if (resualtArray.length === 0) {
        mustBePushed = true;
        mustBeAdded = false;
    }
    else {
        for (let i = 0; i < resualtArray.length; i++) {
            if (resualtArray[i].teamName === TeamScore[0]) {
                resualtArray[i].score += TeamScore[1];
                resualtArray[i].goalFor -= -TeamScore[2];
                resualtArray[i].goalAgainst -= -TeamScore[3];
                mustBePushed = false;
                mustBeAdded = true;
                break;
            }
            else {
                mustBePushed = true;
                mustBeAdded = false;
            }
        }
    }
    if (mustBePushed==true&& mustBeAdded == false) {
        resualtArray.push(obj);
    }

    resualtArray?.sort((a, b) => (a.score > b.score ? -1 : 1))
    arrPrint = document.getElementById('arrPrint');
    arrPrint.innerHTML = JSON.stringify(resualtArray,null, 4);
    // resultsTable= document.getElementById("resultsTable")
    // resultsTable.insertRow()
}

function handleAddScore(firstCompetitor, secondCompetitor) {
    let scoresTabels = [];
    let firstPoint = document.getElementById(firstCompetitor).value;
    let secondPoint = document.getElementById(secondCompetitor).value;
    let firstTeamScore = [firstCompetitor, 0, firstPoint, secondPoint];
    let secondTeamScore = [secondCompetitor, 0, secondPoint, firstPoint];
    if (firstPoint > secondPoint) {
        firstTeamScore[1] += 3;
    } if (firstPoint < secondPoint) {
        secondTeamScore[1] += 3;
    } if (firstPoint == secondPoint) {
        firstTeamScore[1] += 1;
        secondTeamScore[1] += 1;
    }


    handleCreateScoreTable(firstTeamScore);
    handleCreateScoreTable(secondTeamScore);


    // handleCreateScoreTable(firstTeamScore);
    // handleCreateScoreTable(secondTeamScore);
}

function createPointInputes() {
    table = document.getElementById("table");
    rows = table.rows.length;
    cells = table.rows[0].cells.length - 1;
    inputTables = document.getElementById("pointsTable");

    if (!createPointInputes.didrun) {
        createPointInputes.didrun = true;
    }
    else {
        for (let i = 0; i < rows; i++) {
            inputRow = inputTables.insertRow(i);
            for (let j = 0; j < cells; j++) {
                inputDiv = document.createElement("div");
                header = document.createElement("p");
                header.innerHTML = `نتیجه بازی ${table.rows[i].cells[j].innerHTML}`;
                firstId = table.rows[i].cells[j].id.split("-")[0];
                secondId = table.rows[i].cells[j].id.split("-")[1];
                firsPointInput = document.createElement("input")
                secondPointInput = document.createElement("input");
                setAttributes(firsPointInput, {
                    'type': 'number',
                    'id': `${firstId}`,
                    'requires': 'requires',

                });
                setAttributes(secondPointInput, {
                    'type': 'number',
                    'id': `${secondId}`,
                    'requires': 'requires',
                    "onchange": `handleAddScore(${firstId},${secondId})`
                })
                inputDiv.appendChild(header)
                inputDiv.appendChild(firsPointInput);
                inputDiv.appendChild(secondPointInput);
                inputRow.insertCell(j).appendChild(inputDiv);
            }
        }
    }

}


function matchCreator(teams) {
    let partOne = [];
    let partTwo = [];

    for (let i = 0; i < teams.length; i++) {
        if (i < teams.length / 2) {
            partOne.push(teams[i]);
        }
        else {
            partTwo.push(teams[i]);
        }
    }

    let weaks = 2 * teams.length - 2;
    table = document.getElementById("table");
    for (let i = 1; i <= weaks; i++) {
        let matches = [];
        matchRows = table.insertRow(i - 1);
        cells = matchRows.insertCell(0).innerHTML = ` مسابقات هفته ${i} ام-${i <= weaks / 2 ? 'رفت' : 'برگشت'}`
        for (let j = 0; j < teams.length / 2; j++) {
            matches.push(`${partOne[j]} - ${partTwo[j]}`);
            matchRows.insertCell(j).innerHTML = `${partOne[j]} و ${partTwo[j]}`;
            matchRows.cells[j].id = `${partOne[j]}-${partTwo[j]}`;
        }
        partTwo.unshift(partOne[1]);
        partOne.splice(1, 1);
        partOne.push(partTwo.slice(-1));
        partTwo.pop();
    }

    resualtBtn = document.createElement('button');
    resualtBtn.innerHTML = " دوبار کلیک برای ثبت نتایج";
    resualtBtn.setAttribute("onclick", "createPointInputes()");
    resualtBtn.setAttribute("class", "add-btm-2");
    document.getElementById("matchesContainer").appendChild(resualtBtn);
}

//تابعی برای اضافه کردن تعدادی اتربیوت به المنت

function handleSubmitInputs() {
    let teams = [];
    let vS = document.querySelectorAll(".my-class");
    [].forEach.call(vS, function (el) {
        teams.push(el.value);
    });
    matchCreator(teams);
}

function creatInputs(teamCount) {
    alert("لطفا نام تیم ها وارد کنید !")
    const container = document.getElementById("teamInputeContainer")
    const submitInputs = document.createElement('button');
    submitInputs.innerHTML = "ثبت تیم ها";

    setAttributes(submitInputs, {
        "type": "button",
        "id": "submitInputs",
        "onclick": "handleSubmitInputs()",
    })

    for (let i = 1; i <= teamCount; i++) {
        const newInput = document.createElement('input');
        setAttributes(newInput, {
            'id': `team-${i}`,
            'type': 'text',
            'class': 'my-class',
            'placeholder': `نام تیم ${i} ام`,
        });
        container.appendChild(newInput);
    }
    container.appendChild(submitInputs);
}

// این تابع برسی میکند ایا نام لیگ جدید تکراری هست یا نه
// همچنین ایا تعداد تیم شرکت کننده زوج هست؟
function checkNameAndCount(leageName, teamCount) {

    if (teamCount % 2 == 0) {
        check = localStorage.getItem(leageName);
        if (check == null) {
            //localStorage.setItem(leageName, leageName);
            creatInputs(teamCount);
        }
        else {
            alert("نام " + leageName + " تکراری است،لطفا نام دیگری انتخاب کنید!")
        }
    }
    else {
        alert("تعداد تیم ها باید زوج باشد !");
    }
}

// این تابع بعد از کلیک کردن اضافه کردن لیگ جدید صدا زده میشود و اینپوت هارا
//نمایش میدهد
function addNewLeagueHandler() {
    document.getElementById("addNewLeagueInputs").style.display = "block";
}

function handleSubmit() {
    var leageName = document.getElementById("leagueName").value;
    var teamCount = document.getElementById("teamCount").value;
    checkNameAndCount(leageName, teamCount);
}


