"use strict";

const id = document.querySelector("#id");
const name = document.querySelector("#name");
const psword = document.querySelector("#psword");
const cofirmPsword = document.querySelector("#cofirm-psword");
const registerBtn = document.querySelector("#button");

registerBtn.addEventListener("click", register);

function register() {
  const req = {
    id: id.value,
    name: name.value,
    psword: psword.value,
    cofirmPsword: cofirmPsword.value,
  };
  console.log(req);
  fetch("/register", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(req),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        location.href = "/login";
      } else {
        alert(res.msg);
      }
    })
    .catch((err) => {
      console.error(new Error(err));
    });
}
