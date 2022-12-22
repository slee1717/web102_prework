/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        games.forEach((x) => 
            {var gamecont = document.createElement("div");
             var gameimg = new String("src='" + x.img + "'");
            gamecont.setAttribute("class","game-card");
            gamecont.innerHTML = "<b>"+ new String(x.name) +"</b>" + "<br />"+new String(x.description) 
            + "<img class = 'game-img'" + `${gameimg}`  + "'>";
            document.getElementById("games-container").appendChild(gamecont);
            })



}
addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce( (acc, amount, currentIndex) => {
    return acc + parseInt(GAMES_JSON[currentIndex].backers);
  }, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
const totalRaised = (GAMES_JSON.reduce( (acc, amount, currentIndex) => {
    return acc + parseInt(GAMES_JSON[currentIndex].pledged);
  }, 0)).toLocaleString("en-US");

raisedCard.innerHTML = "$" + totalRaised;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = GAMES_JSON.length;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const listOverGoal = GAMES_JSON.filter ( (elements, index) => {
        return parseInt(GAMES_JSON[index].pledged) < parseInt(GAMES_JSON[index].goal);
      });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOverGoal);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const listUnderGoal = GAMES_JSON.filter ( (elements, index) => {
        return parseInt(GAMES_JSON[index].pledged) >= parseInt(GAMES_JSON[index].goal);
      });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listUnderGoal);
}
// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
document.getElementById("unfunded-btn").addEventListener("click", filterUnfundedOnly);
document.getElementById("funded-btn").addEventListener("click", filterFundedOnly);
document.getElementById("all-btn").addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const CountOverGoal = (GAMES_JSON.filter ( (elements, index) => {
    return parseInt(GAMES_JSON[index].pledged) < parseInt(GAMES_JSON[index].goal); 
  })).length;

// create a string that explains the number of unfunded games using the ternary operator
const FundedGames = GAMES_JSON.length-CountOverGoal;
var FundString = `A total of $${totalRaised} has been raised for ${FundedGames} games. 
Currently, ${CountOverGoal} ` + 
`${FundedGames == 1 ? "game remains" : "games remain"}` + 
" unfunded. We need your help to fund these amazing games!";
// create a new DOM element containing the template string and append it to the description container
var paraDesc = document.createElement("p");
paraDesc.innerHTML = FundString;
descriptionContainer.appendChild(paraDesc);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame,secondGame, ...others] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
var firstTitle = document.createElement("div");
firstTitle.innerHTML = String(firstGame.name);
firstGameContainer.appendChild(firstTitle);
// do the same for the runner up item
var secondTitle = document.createElement("div");
secondTitle.innerHTML = String(secondGame.name);
secondGameContainer.appendChild(secondTitle);