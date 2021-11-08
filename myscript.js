"use strict";

// BANKIST APP

// Data
const account1 = {
  owner: "Chisomebi Onwunyi",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2021-10-17T17:01:17.194Z",
    "2021-10-28T14:11:59.604Z",
    "2021-11-02T20:00:17.929Z",
    "2021-11-05T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-GB", // de-DE
};

const account2 = {
  owner: "Somto Mbamalu",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2021-10-10T17:01:17.194Z",
    "2021-05-05T16:33:06.386Z",
    "2021-09-02T14:43:26.374Z",
    "2021-10-05T18:49:59.371Z",
    "2021-10-20T14:11:59.604Z",
    "2021-11-06T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const account3 = {
  owner: "Joy Onodu",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 3333,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2021-10-17T17:01:17.194Z",
    "2021-10-28T14:11:59.604Z",
    "2021-11-02T20:00:17.929Z",
    "2021-11-05T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "en-US", // de-DE
};

const accounts = [account1, account2, account3];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

function displayMovements(acc, sort = false) {
  let movs = sort
    ? acc.movements.slice().sort(function (a, b) {
        return a - b;
      })
    : acc.movements;
  containerMovements.innerHTML = "";
  movs.forEach(function (mov, i) {
    //
    let date = createDate(acc.movementsDates[i], false);
    let type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${date}</div>
        <div class="movements__value">${formatNumber(mov)}</div>
    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

function calcPrintBalance(acc) {
  acc.balance = acc.movements.reduce(function (ac, cur) {
    return ac + cur;
  }, 0);
  labelBalance.textContent = `${formatNumber(acc.balance)}`;
}

function calcDisplaySummary(acc) {
  let incomes = acc.movements
    .filter((item) => item > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatNumber(incomes);

  let out = acc.movements
    .filter((item) => item < 0)
    .map((num) => Math.abs(num))
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatNumber(out);

  let interest = acc.movements
    .filter((item) => item > 0)
    .map((num) => (num * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatNumber(interest);
}

function createUsernames(accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((e) => e[0])
      .join("");
  });
}

function findUser(username) {
  let user = accounts.find((acc) => acc.username === username);
  return user;
}
createUsernames(accounts);

//Updates UI
function updateUI(acc) {
  calcPrintBalance(acc);
  displayMovements(acc);
  calcDisplaySummary(acc);
}

//Create Date
function createDate(date, bool = true, bool2 = true) {
  let options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "2-digit",
  };
  let currentDate = new Date(date);

  if (bool2) {
    function calcDaysPassed(date1, date2) {
      return Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
    }

    if (calcDaysPassed(new Date(date), new Date()) < 1) {
      return `Today`;
    } else if (calcDaysPassed(new Date(date), new Date()) < 7) {
      return `${calcDaysPassed(new Date(date), new Date())} days ago`;
    } else if (
      calcDaysPassed(new Date(date), new Date()) > 7 &&
      calcDaysPassed(new Date(date), new Date()) < 28
    ) {
      return `${Math.round(
        calcDaysPassed(new Date(date), new Date()) / 7
      )} weeks ago`;
    }
  }
  if (bool) {
    return new Intl.DateTimeFormat(navigator.language, options).format(
      currentDate
    );
  } else {
    return new Intl.DateTimeFormat(navigator.language, options).format(
      currentDate
    );
  }
}

//Formats Number
function formatNumber(num) {
  let options = {
    style: "currency",
    currency: currentAccount.currency,
  };
  return new Intl.NumberFormat(navigator.language, options).format(
    Number(num.toFixed(2))
  );
}

//Logout Timer
function startLogOutTimer() {
  setTimeout(function () {});
}

function startTimer(duration, display) {
  var timer = duration,
    minutes,
    seconds;
  const tick = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);

  return tick;
}
// Event listener
let currentAccount, timer;

//Login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  let currentUser = inputLoginUsername.value.toLowerCase();
  let pin = +inputLoginPin.value;
  labelDate.textContent = createDate(new Date().toISOString(), false, false);

  if (timer) clearInterval(timer);
  timer = startTimer(60 * 5, labelTimer);

  setTimeout(function () {
    containerApp.style.opacity = 0;
    labelWelcome.textContent = "Log in to get started";
  }, 301000);

  // Clear Login Fields
  inputLoginUsername.value = inputLoginPin.value = "";
  inputLoginPin.blur();
  inputLoginUsername.blur();

  currentAccount = accounts.find((acc) => {
    return acc?.username === currentUser && acc?.pin === pin;
  });

  if (currentAccount) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    //Calculate Balance
    updateUI(currentAccount);
    containerApp.style.opacity = 1;
  }
});

//Transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = +inputTransferAmount.value;
  let receiverAcc = inputTransferTo.value;

  inputTransferAmount.value = "";
  inputTransferTo.value = "";

  let receiver = accounts.find(function (acc) {
    return acc.username === receiverAcc;
  });
  //Add transfer to receiver's movements array as deposit
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiver?.username !== currentAccount.username
  ) {
    // Transfer
    receiver?.movements.push(amount);
    receiver?.movementsDates.push(new Date().toISOString());
    //
    currentAccount?.movements.push(-amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }

  if (timer) clearInterval(timer);
  timer = startTimer(60 * 5, labelTimer);
});

//Loan
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  let amount = Math.floor(inputLoanAmount.value);
  inputLoanAmount.value = "";

  let loan = currentAccount.movements.some((mov) => mov >= amount * 0.1);

  if (loan && amount > 0) {
    setTimeout(function () {
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());
      updateUI(currentAccount);
    }, 2500);
  }

  if (timer) clearInterval(timer);
  timer = startTimer(60 * 5, labelTimer);
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  let account = inputCloseUsername.value;
  let accPin = +inputClosePin.value;

  inputCloseUsername.value = "";
  inputClosePin.value = "";

  if (currentAccount.username === account && currentAccount.pin === accPin) {
    let accIndex = accounts.findIndex(function (acc) {
      return acc.username === account && acc.pin === accPin;
    });

    if (accIndex !== -1) {
      accounts.splice(accIndex, 1);
      containerApp.style.opacity = 0;
    }
  }
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

function convertTitleCase(str) {
  let noneCap = ["a", "an", "is", "for", "and"];

  const capitalize = (str) => `${str[0].toUpperCase()}${str.slice(1)}`;

  let newStr = str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      if (!noneCap.includes(word)) {
        return capitalize(word);
      } else {
        return word;
      }
    })
    .join(" ");

  console.log(capitalize(newStr));
}
