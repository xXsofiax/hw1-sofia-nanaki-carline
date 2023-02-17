
'use strict';

let population = [];
let test = new Array();
let totalpop = 0;
let averOfreps;
let input;

function readFile() {
  document.querySelector('#submit').addEventListener('click', read);
}

function read() {
  let file = document.querySelector('#file').files[0];
  let reader = new FileReader();
  reader.addEventListener('load', function(e) {
    let text = e.target.result;
    //document.querySelector('#file-contents').textContent = text;
    loadArr(text.trim(), ',');
  });
  reader.readAsText(file);
}

function loadArr(info, delimiter) {
  test = info.split('\r');
  for (let row = 0; row < test.length; row++) {
    let rowArray = test[row].split(delimiter);
    population.push(rowArray);
  }
  
  totalPo();
calculateReps(totalpop,population);
}


function totalPo() {
  //to add all the population together
  if (population.length > 1) {
    for (let i = 1; i < population.length; i++) {
      totalpop += parseInt(population[i][1],10);
      
    }
  } 
  console.log("The total population is "+totalpop);
  return totalpop;
}

function calculateReps(totalpop, population) {
  // to calculate the average of population
  let avg = 0;
  if (population.length > 1) {
    avg = totalpop / population.length;
  }
  console.log("The average of population is "+avg);
  return avg;
}
