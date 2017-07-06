/*    Assignment 1

    Implementing Stochastic Diffusion Search Algorithm
      by Wilson Tolentino da Silva

    Source:
      http://www.doc.gold.ac.uk/~mas02gw/MSCI11/2010/1/SDS_Review_27%20Sep%202010.pdf
        Prof Mark Bishop, 1989

    Simple Search Space based on a string.
*/

/* 
      Basics:

    Program will currently only PRINT TO CONSOLE. No GUI has been implemented. Refresh for a new test.
    Console will show the number of iterations needed to find the solution, and the solution found.
    The Stochastic Diffusion Search Algorithm (SDS) is in a constructor function because I plan on expanding it by
  having multiple tests running concurrently, perhaps wrapped in a probabilistic swarm intelligence algorithm, 
  to find the best solution over time, rather than a good immediate solution.
    Currently, the target is the string "kittens", which will sometimes give a false
  positive under "mittens". This is working as intended. The reason is that the whole
  ethos of swarm intelligence, and especially with the SDS algorithm, is finding a good solution, given the set of parameters,
  rather than the best possible solution, at any given time. 
    This could be solved by forcing a static number of iterations on the algorithm, however, I'm inclined to
  leave it as is, exactly to show what is meant to happen on a singular test.

*/

// String to search
var searchSpace = "Raindrops on roses and whiskers on kittens, Bright copper kettles and warm woollen mittens, Brown paper packages tied up with strings, These are a few of my favorite things. Cream colored ponies and crisp apple strudels, Doorbells and sleigh bells and schnitzel with noodles, Wild geese that fly with the moon on their wings, These are a few of my favorite things.";
// Target word
var tar = "kittens";

var agents = [];
var numAgents = 20;
var newTest;

function setup() {
  createCanvas(710, 400);
  for(var i=0; i<numAgents; i++) {
    agents.push(new Agent(i));
  }
  newTest = new SDS();
  newTest.mainLoop();
}

function draw() {

}

function SDS() {

  // Diffusion Phase
  this.comm = function() {
    var firstAgent;
    var secondAgent;

    for(var i=0; i<agents.length/2; i++) {
      firstAgent = this.findFreeAgent();
      secondAgent = this.findFreeAgent();

      if (agents[firstAgent].status && agents[secondAgent].status) {
        agents[firstAgent].deployAgent(agents[firstAgent].hyp, Math.floor(Math.random()*tar.length));
        agents[secondAgent].deployAgent(agents[secondAgent].hyp, Math.floor(Math.random()*tar.length));
      }
      else if (agents[firstAgent].status !== agents[secondAgent].status) {
        if (agents[firstAgent].status) {
            agents[firstAgent].deployAgent(agents[firstAgent].hyp, Math.floor(Math.random()*tar.length));
            agents[secondAgent].deployAgent(agents[firstAgent].hyp, Math.floor(Math.random()*tar.length));
          }
        else {
            agents[firstAgent].deployAgent(agents[secondAgent].hyp, Math.floor(Math.random()*tar.length));
            agents[secondAgent].deployAgent(agents[secondAgent].hyp, Math.floor(Math.random()*tar.length));
          }
      }
      else {
        agents[firstAgent].deployAgent(Math.floor(Math.random()*searchSpace.length), Math.floor(Math.random()*tar.length));
        agents[secondAgent].deployAgent(Math.floor(Math.random()*searchSpace.length), Math.floor(Math.random()*tar.length));
      }
    }
  }

  // Finds an agent that hasn't communicated with anyone yet
  this.findFreeAgent = function() {
    var freeAgent = Math.floor(Math.random()*agents.length);
    if(!agents[freeAgent].talkedTo) {
      agents[freeAgent].talkedTo = true;
      return freeAgent;
    }
    else {
      return this.findFreeAgent();
    }

  }

  // Tests all the agents in the array for their hypothesis
  this.testing = function() {
    for(var i=0; i<agents.length; i++) {
      agents[i].testingAgent();
    }
  }

  // Deploys all agents to a random location.
  this.deploy = function() {
    for(var i=0; i<agents.length; i++) {
      agents[i].deployAgent(Math.floor(Math.random()*searchSpace.length), Math.floor(Math.random()*tar.length));
    }
  }

  // Checks fitness of the SDS. Ending condition
  this.checkFitness = function() {
    for(var i=0; i<agents.length-1; i++) {
      if(agents[i].status && agents[i].hyp === agents[i+1].hyp)
        continue;
      else break;
    }
    if (i === agents.length-1 && agents[agents.length-1].status)
      return true;
    else
      return false;
  }

  // Main Body of the SDS Algorithm
  this.mainLoop = function() {
    var counter = 1;
    this.deploy();
    while(!this.checkFitness()) {
      this.testing();
      this.comm();
      counter++;
    }
    console.log("Search Space: "+searchSpace);
    console.log("Target Word: "+tar)
    console.log("Solution found: "+searchSpace.slice(agents[0].hyp, agents[0].hyp+tar.length));
    console.log("Number of iterations: "+counter);
    
  }
}

function Agent(n) {
  this.status = false;
  this.hyp;
  this.mod;
  this.talkedTo = false;

  // Deploys agent
  this.deployAgent = function(tempHyp, tempMod) {
    this.hyp = tempHyp;
    this.mod = tempMod;
  }

  // Function to determine Agent's activity
  this.testingAgent = function() {
    this.talkedTo = false;
    if(searchSpace[this.hyp+this.mod] === tar[this.mod]) {
      this.status = true;
    }
    else {
      this.status = false;
    }
  }
}
