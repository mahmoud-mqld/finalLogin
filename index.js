"use strict";

let registerUsername = document.getElementById("registerUsername");
let registerEmail = document.getElementById("registerEmail");
let registerPassword = document.getElementById("registerPassword");
let loginUsername = document.getElementById("loginUsername");
let loginEmail = document.getElementById("loginEmail");
let loginPassword = document.getElementById("loginPassword");
let signUpBtn = document.getElementById("signUpBtn");
let registrs = [];
let mailAlert = document.getElementById("mailAlert");

const nameRegex = /^[a-zA-Z]{3,60}/;
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passRegex = /.{5,50}/;

if (localStorage.getItem("users") === null) {
  registrs = [];
} else {
  registrs = JSON.parse(localStorage.getItem("users"));
}


if(localStorage.getItem('active')!==null)
{
  let active = localStorage.getItem('active')
  document.getElementById("active").innerText=` ${active}`
}

signUpBtn.addEventListener("click", signup);

function signup() {
  if (
    nameRegex.test(registerUsername.value) &&
    emailRegex.test(registerEmail.value) &&
    passRegex.test(registerPassword) &&
    doesItemExist(registrs, registerEmail.value) == false
  ) {
    let user = {
      name: registerUsername.value,
      mail: registerEmail.value,
      pass: registerPassword.value,
    };
    registrs.push(user);
    console.log("registrs");
    console.log(registrs);
    localStorage.setItem("users", JSON.stringify(registrs));
    resetForm(registerPassword, registerUsername, registerEmail);
    console.log("local ");
    console.log(JSON.parse(localStorage.getItem("users")));
    location.href = "login.html";
    // window.open("../login.html,_self")
  } else if (doesItemExist(registrs, registerEmail.value)) {
    alert("duplicate");
    mailAlert.innerText = "duplicate";
  } else if (
    registerEmail.value == "" ||
    registerPassword.value == "" ||
    registerUsername.value == ""
  ) {
    let msg = document.getElementById("msg");

    msg.innerText = "Please enter all required info";
  } else {
    let msg = document.getElementById("msg");

    msg.innerText = "";
  }
}

function resetForm(input1, input2, input3) {
  input1.value = " ";
  input2.value = " ";
  input3.value = " ";
}

function validate(input, regex) {
  regex.test(input.value);

  console.log(input.value);
  console.log(regex.test(input.value));
  isValid(input, regex);
}

function isValid(input, regex) {
  if (regex.test(input.value)) {
    input.classList.add("is-valid");
    input.classList.remove("is-invalid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
  }
}

function doesItemExist(array, value) {
  return array.some((item) => item.mail === value);
}
console.log(registrs);

function login() {
  for (let i = 0; i < registrs.length; i++) {
    if (
      loginUsername.value == registrs[i].mail ||
      (loginUsername.value == registrs[i].name &&
        loginPassword.value == registrs[i].pass)
    ) {
      let activUser = registrs[i].name;
      console.log(activUser);
      localStorage.setItem("active", activUser);
      console.log(localStorage.getItem("activ"));
      location.href ="welcome.html";
      // window.open("welcome.html,_self")
      console.log(localStorage.getItem("activ"));
      // greet();
    }
      if (loginUsername.value == "" ||
      loginPassword.value == "")
       {
      let msg = document.getElementById("msg");
      msg.innerText = "Please enter all required info";
    } 
    else
     if (
      loginUsername.value !== registrs[i].mail ||
      (loginUsername.value !== registrs[i].name &&
        loginPassword.value !== registrs[i].pass)
    ) {
      let msg = document.getElementById("msg");

      msg.innerText = "you enterd invalid data";
    }
  }
}



function signOut(){
  location.href="login.html"
  // window.open(login.html,_self)
  
  
}