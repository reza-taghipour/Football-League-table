//ریفکتور
//این تابع یک دکوراتور هست که تابع اسم و  تعداد تیم هارا میگیرد
// و چک های لازم را انجام میدهد
// const evenChecker = (fn) => {
//     return (...args) => {
//         // if (args[])
//         console.log("args" + args);
//         alert("args" + args);
//     }
// }

//این تابع برای ادد کردن تعدادی اتربیوت هست
function setAttributes(el, attrs) {
    for (var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function addPoints() {
    rows = document.getElementById("table").rows.length;
    cells =document.getElementById('table').rows[0].cells.length
    console.log("rows "+rows + " cells "+cells);
    resultsTables = document.getElementById("resultsTable")

    // let pointsArray = [];
    // let teamRecords = [id , points,goalFor , goalAgainst];
    // console.log(teamRecords);

    for (var i = 0; i < rows; i++) {
        resultRows = resultsTables.insertRow(i);
        resultRows.insertCell(0).innerHTML = "نام تیم";
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
        pointRows = table.insertRow(i);
        cells = matchRows.insertCell(0).innerHTML = ` مسابقات هفته ${i} ام-${i <= weaks / 2 ? 'رفت' : 'برگشت'}`
        console.log(`مسابقات هفته ی ${i} ام`);
        for (let j = 0; j < teams.length / 2; j++) {
            firsPointInput = document.createElement("input")
            secondPointInput = document.createElement("input")
            setAttributes(firsPointInput, {
                "placeholder": `گل های زده ${partOne[j]} `,
                "type": "number",
                "id": `${partOne[j]}`,
                "row": `${i}`,
                "cell": `${j}`,
                "onchange": "addPoints(this.id , this.value,this.row,this.cell)"
            });
            setAttributes(secondPointInput, {
                "placeholder": `گل های زده ${partTwo[j]} `,
                "type": "number",
                "id": `${partTwo[j]}`,
                "row": `${i + weaks}`,
                "cell": `${j}`,
                "onchange": "addPoints(this.id, this.value,this.row,this.cell)"
            });
            matches.push(`${partOne[j]} - ${partTwo[j]}`);
            matchRows.insertCell(j).innerHTML = `|${partOne[j]} - ${partTwo[j]}|`;
            pointRows.insertCell(j).appendChild(firsPointInput);
            pointRows.insertCell(j).appendChild(secondPointInput);
        }


        console.log(matches);
        partTwo.unshift(partOne[1]);
        partOne.splice(1, 1);
        partOne.push(partTwo.slice(-1));
        partTwo.pop();
    }
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
            localStorage.setItem(leageName, leageName);
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


