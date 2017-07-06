/*    Assignment 1

    Implementing Stochastic Diffusion Search Algorithm: Simple search based on strings.
      by Wilson Tolentino da Silva

    Source:
      http://www.doc.gold.ac.uk/~mas02gw/MSCI11/2010/1/SDS_Review_27%20Sep%202010.pdf
        Prof Mark Bishop, 1989
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
