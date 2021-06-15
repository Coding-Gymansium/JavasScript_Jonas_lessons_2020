'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////////////////////////////////////
///////////////////////////////////////////////////
// New code:

//------------ Display Movements

const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//------------ Display Balance

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accounts) {
  accounts.forEach(function(acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUsernames(accounts);

const updateUI = function(acc) {
  displayMovements(acc.movements);

  calcDisplayBalance(acc);

  calcDisplaySummary(acc);
};

//Login feature
// Event Handler

let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find( acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

    containerApp.style.opacity = 100;
    
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount); 
  };
});

// Transfers feature
//
btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  inputTransferAmount.value = inputTransferTo.value = '';

  if(
    amount > 0 && 
    receiverAcc &&
    currentAccount.balance >= amount && 
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount) ;
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

// Loan Feature

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  };

  // clear fields
  inputLoanAmount.value = '';
});


// Account Close Feature
btnClose.addEventListener('click', function(e) {
  e.preventDefault();


  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/*
// Sort Method

const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort()); // mutates the original array.

// Numbers
console.log(movements);
console.log(movements.sort()); // it doesn't work with number values. It converts elements to strings before oredering them.

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)
// Ascending:
movements.sort((a, b) => {
  if (a > b)
    return 1;
  if (b > a) 
    return -1;
});
console.log(movements);

//Descending
movements.sort((a, b) => {
  if (a > b)
    return -1;
  if (b > a) 
    return 1;
});
console.log(movements);

// simpler way
movements.sort((a, b) => a - b);
console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);
*/

/*
// Flat Method

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());


const arrDeep = [[[1,2], 3], [4,[5,6]], 7,8];
console.log(arrDeep.flat(2)); // the argument determines the level of depth.

const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

//// chainning the methods

const accountMovements1 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

console.log(accountMovements1);


// Flat Map Method

const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

console.log(overallBalance2);
*/

/*
// Every Method
console.log(movements.every(mov => mov > 0)); // returns false because not all movements are deposits.
console.log(account4.movements.every(mov => mov > 0)); // returns true  because all movements are deposits.

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// Some Method
// Equality
console.log(movements.includes(-130));

//Condition
console.log(movements.some(mov => mov === -130)); // in this case the include method  would be better.

const anyDeposits = movements.some( mov => mov > 1500);

// Find Method
// similar to the filter method BUT find only returns  the first instance of the condition. In additiion unlike the Filter method, the Find method returns the element NOT an array.
*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 
const firstWithdrawl = movements.find(mov => mov < 0);
console.log(firstWithdrawl);

const account = accounts.find(acc => acc.owner === 'Jessica Davis');

console.log(account);
*/

/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// Pipeline. Each method result needs to be an array to chain it like this. One of the problems with this way is that it makes it harder to debug

const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);
*/

/*
// Reduce Method
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// accumulator is like a snowball effect
 const balance = movements.reduce(function(accumulator, currentValue, i, arr) {
   console.log( `Iteration ${i}: ${accumulator}`); // to visualize the snowball effect.
   return accumulator + currentValue;
 }, 0);

console.log(balance);

const balance1 = movements.reduce( (acc, cur) => acc + cur, 0);

console.log(balance1);

let balance2 = 0;
for(const mov of movements) balance2 += mov;
console.log(balance2);

// Getting maximum value with Reduce
const max = movements.reduce((acc, mov) => {
  if (acc > mov) {
    return acc;
  } else {
    return mov;
  }
}, movements[0]); // set up the first instance of the accumulator as the initial value.

console.log(max);
*/

/*
// Filter Method

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const deposits = movements.filter(function(mov, i, arr) {
 return mov > 0; 
});

// the 'i' and 'arr' parameters are available so Jonas shows them there so we know they are but normally you wouldn't type them there unless you are using them. In this case they are not being used. so that could just have been function(mov).

console.log(movements);
console.log(deposits);

const depositsFor = [];

for (const mov of movements) if (mov > 0) depositsFor.push(mov);

console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/

/*
// Map Method
// creates a new array and doesn't modify the original array.

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

const movementsUSD = movements.map((mov) => mov * eurToUsd);

const movementsUSD1 = movements.map(function(mov) {
  return mov * eurToUsd;
});

console.log(movements);
console.log(movementsUSD);
console.log(movementsUSD1);

const movementsDescriptions = movements.map(
  (mov, i) => 
  `Movement ${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
    mov
  )}`
);

console.log(movementsDescriptions);
*/

/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// ForEach with Maps
currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
});

// ForEach with a Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
currenciesUnique.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
}); // due to a design convention value and key are set to the same when using forEach on a set. The key can be set to a 'throwaway value' like '_' but cannot be ommited or called the same (duplicate error)
*/

/*
// For of loop
for (const movement of movements) {
  if(movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
};

// with a counter
for (const [index, movement] of movements.entries()) {
  if(movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
};

// ForEach loop
console.log('-------USING FOREACH--------'); 

movements.forEach(function(movement) {
  if(movement > 0) {
    console.log(`You deposited ${movement}`);
  } else {
    console.log(`You withdrew ${Math.abs(movement)}`);
  }
});
// how it works:
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// with a counter:
movements.forEach(function(movement, index, array) {
  if(movement > 0) {
    console.log(`Movement ${index + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${index + 1}: You withdrew ${Math.abs(movement)}`);
  }
});

// Note: the continue and break statements don't work in a forEach loop. It will just iterate through. 
// When these are needed then the for loop is a better choice.
*/

/*
// Simple Array Methods:

let arr = ['a', 'b', 'c', 'd', 'e'];

// slice method
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
console.log(arr.slice()); // creates a shallow copy of the array. Same as using the spread operator.

// Splice method
// this method mutates the array.
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr); // after using splice the original array changed.

// Reverse method
// it mutates the original array
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2);
console.log(arr2.reverse());

// Concat method
const letters = arr.concat(arr2);
console.log(letters);
// same as doing:
console.log([...arr, ...arr2]);

// Join method
console.log(letters.join(' - '));
*/

// Coding Challenge #1

/*
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);
  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function(dog, i) {
    if(dog >= 3) {
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    } else {
      console.log(`Dog number ${i + 1} is a puppy, and is ${dog} years old`);
    }
  });
};

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
*/

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
/*
const data = [5, 2, 4, 1, 15, 8, 3]
const data1 = [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge = function(ages) {
  const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
  const adults = humanAges.filter(age => age >= 18);

  // const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;;

  const average = adults.reduce((acc, age, i, arr) => acc + age / arr.length, 0);

  return average;
};

const avg1 = calcAverageHumanAge(data);
const avg2 = calcAverageHumanAge(data1); 

console.log(avg1);
console.log(avg2);
*/

///////////////////////////////////////
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

/*
const data = [5, 2, 4, 1, 15, 8, 3]
const data1 = [16, 6, 10, 5, 6, 1, 4]

const calcAverageHumanAge2 = ages => ages
  .map(age => age <= 2? 2 * age : 16 + age * 4)
  .filter(age => age >= 18)
  .reduce((acc, age, i, arr) => acc + age / arr.length, 0)


const avg1 = calcAverageHumanAge2(data);
const avg2 = calcAverageHumanAge2(data1); 

console.log(avg1);
console.log(avg2);
*/
