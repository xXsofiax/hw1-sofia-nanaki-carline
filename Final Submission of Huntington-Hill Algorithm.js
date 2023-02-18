'use strict';

let population = [];
let test = new Array();
let input;
let numOfRp;
let repNYet = 0;

// runs after click the submit button
function readFile() {
  population = [];
  document.querySelector('#submit').addEventListener('click', read);

}

// to read the CSV file
function read() {
  let file = document.querySelector('#file').files[0];
  numOfRp = document.getElementById("reps").value;
  let reader = new FileReader();
  reader.addEventListener('load', function(e) {
    let text = e.target.result;
    loadArr(text.trim(), ',');
  });
  reader.readAsText(file);
}

// to store the CSV file info into the 2D array
function loadArr(info, delimiter) {
  test = info.split('\r');
  for (let row = 0; row < test.length; row++) {
    let rowArray = test[row].split(delimiter);
    population.push(rowArray);
  }
  // to call other function
  allocateRep();
  }
  
// to calculate the priority of each states
function priorityScoreCalc(input,numOfRp){
    let output = Math.floor(input / Math.sqrt(numOfRp*(numOfRp + 1)))
    return output;
}

// to allocate representatives to each 
function allocateRep(){

    //give each states one representative
    for(let i=0; i < population.length; i++){
        if( i == 0){
            population[i][2]= "Priority";
            population[i][3]= "Representative";
        }
        else{
            population[i][3] = 1;
            population[i][2] = priorityScoreCalc(population[i][1],1);
            
        }
    }

    //if we still have extra representative
    if (numOfRp > population.length){
        repNYet = numOfRp-population.length;
        while(repNYet >= 0){
            let biggest = 0;
            let biggestID = 0;
            for(let i = 1; i <population.length;i++){
                if(population[i][2] > biggest){
                    biggest = population[i][2];
                    biggestID = i;
                }
            }
            population[biggestID][3] +=1;
            repNYet -=1;
            population[biggestID][2] = priorityScoreCalc(population[biggestID][1],population[biggestID][3]);

        }
    }

    // print the result in the website
    let output="";
    for(let i = 1; i< population.length;i++){
        output += population[i][0]+"\t"+population[i][3]+"\n";
    }
    document.getElementById("result").innerHTML = output;
    }

