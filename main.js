"use strict";

window.addEventListener("DOMContentLoaded", start);

let allStudents = [];
let prefects = [];
let newPrefects = [];
let expelledList = [];
let notExpelled = [];
let currentList = [];
let onlyGry;

// The prototype for all animals:
const Student = {
  firstName: "",
  middleName: "",
  lastName: "",
  nickName: "",
  newName: "",
  house: "",
  gender: "",
  img: null,
  bloodStatus: "",
  winner: false,
  star: false,
  expelled: false
};
const sortingStudents = document.querySelectorAll(".sort");
const btn = document.querySelectorAll(".filter");

function start() {
  console.log("ready");
  //countOfStudents = 0;

  loadJSON();
  // Adding event-listeners to filter and sort buttons
  document.querySelector('[data-filter="gryffindor"]').addEventListener("click", filterGryfindor);
  document.querySelector('[data-filter="hufflepuff"]').addEventListener("click", filterHufflepuff);
  document.querySelector('[data-filter="ravenclaw"]').addEventListener("click", filterRavenclaw);
  document.querySelector('[data-filter="slytherin"]').addEventListener("click", filterSlytherin);
  document.querySelector("[data-filter= all]").addEventListener("click", filterAll);

  //document.querySelector('[data-sort="house"]').addEventListener("click", sortHouse);
  // document.querySelector('[data-sort="gender"]').addEventListener("click", sortingType);
  // document.querySelector('[data-sort="desc"]').addEventListener("click", sortingDesc);
  // document.querySelector('[data-sort="age"]').addEventListener("click", sortingAge);

  // filtering and sorting using one querySelectorAll
  sortingStudents.forEach(button => {
    button.addEventListener("click", sortStudentonClick);
  });
  // btn.forEach(botton => {
  //   botton.addEventListener("click", filterStudent);
  // });
}

async function loadJSON() {
  const response = await fetch("https://petlatkea.dk/2020/hogwarts/students.json");
  const jsonData = await response.json();

  // when loaded, prepare data objects
  prepareObjects(jsonData);
}

function prepareObjects(jsonData) {
  allStudents = jsonData.map(preapareObject);
  console.log(allStudents);
  // TODO: This might not be the function we want to call first
  displayList(allStudents);
}

function displayList(students) {
  // clear the list
  document.querySelector(".container").innerHTML = "";
  // build a new list
  students.forEach(displayStudent);
  //console.log(allStudents)
  closeModal();
}

function preapareObject(jsonObject) {
  // fixing the student list
  const student = Object.create(Student);
  const studentName = jsonObject.fullname.trim();
  const houseName = jsonObject.house.trim();

  student.house = houseName.substring(0, 1).toUpperCase() + houseName.substring(1).toLowerCase();
  student.gender = jsonObject.gender;
  // console.log(studentName);
  // console.log(houseName);
  let text = studentName.split(" ");
  if (text.length < 3) {
    if (text[0]) {
      student.firstName = text[0].substring(0, 1).toUpperCase() + text[0].substring(1).toLowerCase();
    }
    if (text[1]) {
      student.lastName = text[1].substring(0, 1).toUpperCase() + text[1].substring(1).toLowerCase();
      student.newName = `${student.firstName}${student.lastName}`;
    } else {
      if (text[0]) {
        student.firstName = text[0].substring(0, 1).toUpperCase() + text[0].substring(1).toLowerCase();
      }
      if (text[1]) {
        student.middleName = text[1].substring(0, 1).toUpperCase() + text[1].substring(1).toLowerCase();
      }
      if (text[2]) {
        student.lastName = text[2].substring(0, 1).toUpperCase() + text[2].substring(1).toLowerCase();
        student.newName = `${student.firstName}${student.middleName}${student.lastName}`;
      }
    }
  }
  return student;
  console.log(student);
}
function buildList(student) {
  const currentList = allStudents;
  displayList(currrentList);
}

function displayList(students) {
  document.querySelector(".container").innerHTML = " ";
  students.forEach(displayStudent);
  closeModal();
}

function displayStudent(student) {
  console.log(student);
  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  // to show the star
  copy.querySelector("[data-field=star]").dataset.star = student.star;
  if (student.star === true) {
    copy.querySelector("[data-field=star]").star = student.star;
  } else {
    copy.querySelector("[data-field=star]").textContent = "⭐";
  }
  copy.querySelector(".studentsFull").textContent = student.newName;
  copy.querySelector(".houseName").textContent = student.house;
  copy.querySelector(".studentPic").src = `images/${student.lastName.toLowerCase() + "_" + student.firstName.toLowerCase() + ".png"}`;
  // to fix the image

  if (student.firstName == "Padma") {
    copy.querySelector(".studentPic").src = "images/" + student.lastName.toLowerCase() + "_" + "padme" + ".png";
  } else if (student.lastName == "Patil") {
    copy.querySelector(".studentPic").src = "images/" + student.lastName.toLowerCase() + "_" + student.firstName.toLowerCase() + ".png";
  } else if (student.firstName == "Leanne") {
    copy.querySelector(".studentPic").src = "images/" + "li_s" + ".png";
  } else if (student.lastName == "Finch-fletchley") {
    copy.querySelector(".studentPic").src = "images/" + "fletchley" + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";
  } else {
    copy.querySelector(".studentPic").src = "images/" + student.lastName.toLowerCase() + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";
  }

  // copy.querySelector(".studentsFull").textContent = student.newName;
  // copy.querySelector(".studentsFull").textContent = student.newName;

  copy.querySelector("button").addEventListener("click", function() {
    const modalOpen = document.querySelector(".modal_background");
    modalOpen.classList.remove("hide");

    //document.querySelector(".modal-content").setAttribute("data-house", student.house);

    document.querySelector(".first_name").textContent = `First Name: ${student.firstName}`;
    document.querySelector(".middle_name").textContent = `Middle Name: ${student.middleName}`;
    document.querySelector(".last_name").textContent = `Last Name: ${student.lastName}`;
    document.querySelector(".gender").textContent = `Gender: ${student.gender}`;
    document.querySelector(".houseName").textContent = `House: ${student.house}`;
    document.querySelector(".modalPic").src = `images/${student.lastName.toLowerCase() + "_" + student.firstName.toLowerCase() + ".png"}`;
    //document.querySelector(".crest").src = `crest/${student.house.substring(0, 1).toLowerCase() + student.house.substring(1).toLowerCase() + ".png"}`;

    if (student.firstName == "Padma") {
      document.querySelector(".modalPic").src = "images/" + student.lastName.toLowerCase() + "_" + "padme" + ".png";
    } else if (student.lastName == "Patil") {
      document.querySelector(".modalPic").src = "images/" + student.lastName.toLowerCase() + "_" + student.firstName.toLowerCase() + ".png";
    } else if (student.firstName == "Leanne") {
      document.querySelector(".modalPic").src = "images/" + "li_s" + ".png";
    } else if (student.lastName == "Finch-fletchley") {
      document.querySelector(".modalPic").src = "images/" + "fletchley" + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";
    } else {
      document.querySelector(".modalPic").src = "images/" + student.lastName.toLowerCase() + "_" + student.firstName.substring(0, 1).toLowerCase() + ".png";

      console.log(student.star);
    }

    document.querySelector(".modal_content").dataset.theme = student.house;
  });
  document.querySelector(".container").appendChild(copy);
}
function checkWinner(student) {
  winners = currentList.filter(student => student.winner === true);
  const winnerType = winners.some(winner => {
    return winner.house === student.house && winner.gender === student.gender;
  });
  if (student.winner === true) {
    student.winner = false;
  } else {
    if (winnerType) {
      //calling oneWinnerOfEachType function
      oneWinnerOfEachType(student);

      student.winner = false;
    } else if (winners.length == 8) {
      //calling removeOneToAddAnother function

      removeOneToAddAnother();

      student.winner = false;
    } else {
      student.winner = true;
    }
  }

  console.log(winners);
  console.log(student.winner);
  displayList(currentList);
}

function oneWinnerOfEachType(student) {
  document.querySelector("#oneKind").classList.add("show");
  document.querySelector("#oneKind .closebutton").addEventListener("click", closeDialog);

  console.log(oneWinnerOfEachType);
  //document.querySelector("#onlyonekind .student1").textContent = winners[0].firstName + " " + winners[0].lastName + " " + winners[0].house;
  currentList.forEach(prefectStudent => {
    if (prefectStudent.winner == true && prefectStudent.gender == student.gender && prefectStudent.house == student.house) {
      console.log(prefectStudent.firstName + " " + prefectStudent.lastName);
      document.querySelector("#oneKind .student1").textContent = prefectStudent.firstName + " " + prefectStudent.lastName;
    }
    document.querySelector("#oneKind > div > p > button").addEventListener("click", function() {
      if (prefectStudent.gender == student.gender) {
        console.log("remove");
        prefectStudent.winner = false;
        student.winner = true;
        displayList(currentList);
        closeDialog();
      }
    });
  });
}
function closeDialog() {
  document.querySelector("#onlytwowinners").classList.remove("show");
  document.querySelector("#oneKind").classList.remove("show");
}
function closeModal() {
  const modal = document.querySelector(".modal_background");
  modal.addEventListener("click", () => {
    modal.classList.add("hide");
  });
}

function filterGryfindor() {
  // console.log("filterGryfindor");
  currentList = allStudents.filter(isGryffindor);
  displayList(currentList);
}
function filterHufflepuff() {
  currentList = allStudents.filter(isHufflepuff);
  displayList(currentList);
}
function filterRavenclaw() {
  currentList = allStudents.filter(isRavenclaw);
  displayList(currentList);
}
function filterSlytherin() {
  currentList = allStudents.filter(isSlytherin);
  displayList(currentList);
}
function filterAll() {
  currentList = allStudents.filter(isAll);
  displayList(currentList);
}
function isGryffindor(student) {
  return student.house === "Gryffindor";
}
function isHufflepuff(student) {
  return student.house === "Hufflepuff";
}
function isRavenclaw(student) {
  return student.house === "Ravenclaw";
}
function isSlytherin(student) {
  return student.house === "Slytherin";
}

function isAll(student) {
  return student;
}
function filterStudent() {
  const filter = this.dataset.filter;
  clearAllSort();
  console.log(filter);
  myFilter(filter);
}

function myFilter(filter) {
  console.log("myFilter", filter);
  if (filter === "all") {
    currentList = allStudents.filter(allStudents => true);
    displayList(currentList);
  } else {
    currentList = allStudents.filter(student => student.house === filter);
    displayList(currentList);
  }
}
function sortStudentonClick() {
  console.log("sortStudentonClick");

  //const sort = this.dataset.sort;
  if (this.dataset.action === "sort") {
    clearAllSort();
    this.dataset.action = "sorted";
  } else {
    if (this.dataset.sortDirection === "asc") {
      this.dataset.sortDirection = "desc";
      console.log("sortdir desc", this.dataset.sortDirection);
    } else {
      this.dataset.sortDirection = "asc";
      console.log("sortdir asc", this.dataset.sortDirection);
    }
  }
  mySort(this.dataset.sort, this.dataset.sortDirection);
}

function clearAllSort() {
  console.log("clearAllSort");
  sortingStudents.forEach(botton => {
    botton.dataset.action = "sort";
  });
}

function mySort(sortBy, sortDirection) {
  console.log(`mySort-, ${sortBy} sortDirection-  ${sortDirection}  `);
  let desc = 1;
  currentList = allStudents.filter(allStudents => true);

  if (sortDirection === "desc") {
    desc = -1;
  }

  currentList.sort(function(a, b) {
    var x = a[sortBy];
    var y = b[sortBy];
    if (x < y) {
      return -1 * desc;
    }
    if (x > y) {
      return 1 * desc;
    }
    return 0;
  });

  displayList(currentList);
}
function closeModal() {
  const modal = document.querySelector(".modal_background");
  modal.addEventListener("click", () => {
    modal.classList.add("hide");
  });
}

function selectTheme() {
  document.querySelector("body").setAttribute("houseStyle", this.value);
  console.log(selectTheme);
}
