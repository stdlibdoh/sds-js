# sds-js
A simple implementation of the Stochastic Diffusion Search Algorithm in Javascript

## Overview:


Coded for "Introduction to Programming" module, Year 1, Term 1, in Computer Science, University of Goldsmiths.

Reasoning behind choosing this algorithm was due to my newly found interest in the field of Swarm Intelligence. As such, I applied it to a simple string search problem, where one would attempt to find a word in a sentence. This could obviously be brute forced, however, after running, the target word is found in a very low number of iterations.

The string acting as the search space and word acting as the target is hard coded. Solution is printed to the console. This was due to me being more personally invested in translating an academic paper into workable code rather presenting a finished product with inputs and visualisation.


## Usage:


Open _index.html_ and bring up the console to view the algorithm's solution.

Change following variables to change search space and/or target.
```javascript
var searchSpace = " ";
var tar = " ";
```

Final print will output the search space, the target, the solution found and the number of iterations taken to find the solution.


## Conclusions:

Presently, the program will sometimes output a false positive. This is working as intended. The reason is that the whole ethos of swarm intelligence, and especially with the SDS algorithm, is finding a good solution, given the set of parameters, in a short amount of time, rather than the best possible solution, at any given time.


## Reference:

+ [SDS Academic Paper](http://www.doc.gold.ac.uk/~mas02gw/MSCI11/2010/1/SDS_Review_27%20Sep%202010.pdf)

   Prof Mark Bishop, 1989
