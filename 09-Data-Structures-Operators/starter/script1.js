'use strict';

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0,
      close: 24,
    },
  },

  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //orderDelivery: function (obj) {
  //  console.log(obj);
  //},
  orderDelivery: function ({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(`Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`);
  },

  orderPasta: function(ing1, ing2, ing3) {
    console.log(ing1, ing2, ing3)
  },
};
///////////////////////////////////////////
///////////////////////////////////////////

// Spread Operator
const arr = [7, 9, 9];

const arrArr = [1, 2, arr] // returns arr inside the new array.
const newArr = [1, 2, ...arr] // spreads arr into the new array. [1,2,7,8,9]
console.log(newArr);

console.log(...newArr); // 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

// Join two arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables are arrays, strings, maps, sets, NOT objects.
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);

// const ingredients =  [prompt(`Let's make pasta!  Ingredient 1?`),
// prompt('Ingredient 2?'),
// prompt('Ingredient 3?'),
// ]; 
// 
// restaurant.orderPasta(...ingredients);

// Objects
// Spread operators works on objects too. Eventhough they are not iterable

const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };

console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

/*
// Destructuring Objects
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  startIndex: 1,
  address: 'Via del sole, 21',
});

const { name, openingHours, categories } = restaurant;

const { name: restaurantName, openingHours: hours, categories: tags } = restaurant;


// console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;

// console.log(menu, starters);

// Mutating variables
let a = 111;
let b = 999;
const obj = { a: 23, b:7, c: 14 };
({a, b} = obj); // must wrap between parenthesis
// console.log(a, b); // changes to 23, 7

//nested object
const { fri: { open, close } } = openingHours
// console.log(open, close)
*/

/*
const arr = [2,3,4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);

// const [first, second] = restaurant.categories;
// console.log(first, second);

const [first, , second] = restaurant.categories;// to hit the third item add empty space between commas.
console.log(first, second);

let [main, secondary] = restaurant.categories;
console.log(main, secondary);

// Switching variables
[main, secondary] = [secondary, main]
console.log(main, secondary);

// Recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, ,j] = nested;
// console.log(i, j);

const [i, ,[j, k]] = nested;
console.log(i,j,k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
*/


