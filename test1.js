'use strict';

let population = [];
let test = new Array();
let reOrderRm = [];
let totalpop = 0;
let averOfreps;
let input;
let numOfRp;
let repNYet = 0;
let avg = 0;

function readFile() {
  document.querySelector('#submit').addEventListener('click', read);
  
}

function read() {
  let file = document.querySelector('#file').files[0];
  numOfRp = document.getElementById("reps").value;
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
  calculateAvg(totalpop, population)
  calculateReps(population,avg);
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

function calculateAvg(totalpop, population) {
  // to calculate the average of population

  if (population.length > 1) {
    avg = totalpop / numOfRp;
  }
  console.log("The average of population is "+avg);
  return avg;
}

function calculateReps(population, avg){
  // to find the rep that we already have
  let repHave = 0;
  for(let i = 0; i< population.length;i++){
    if( i == 0){
      population[i][2] = "Divide";
      population[i][3] = "Representative";
      population[i][4] = "Rmainer";
    }
    else{
      let reps = population[i][1] / avg;
      population[i][2] = reps;
      let roundDown = Math.floor(population[i][2]);
      population[i][3] = roundDown;
      repHave += roundDown;
      let remainder = reps - roundDown;
      population[i][4] = remainder;
    }
  }

  // to find the rep that we not yet given
  repNYet = numOfRp - repHave;
  for(let i = 0; i< population.length;i++){
    test[i] = population[i].slice(4);
    test[i] = population[i].slice(4);
  }
 
  while(test.length-1 != reOrderRm.length){
    let biggest = 0;
    let biggestID = 0;
    for(let i = 1; i < test.length; i++){
      if(test[i] >= biggest){
        biggest = test[i];
        biggestID = i;
      }
    }
    test[biggestID] = 0;
    reOrderRm.push(biggestID);
  }
  console.log(reOrderRm);
  console.log(test);
  console.log(population);
  //console.log(remainder);
}
