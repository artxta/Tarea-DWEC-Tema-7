"use strict";

// funciones para crear y leer cookies
function setCookie(cname, cvalue, exDays) {
  const today = new Date();
  d.setTime(today.getTime() + (exDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

function getCookie(cname) {
  // array de cookies
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === cname) {
      return value;
    }
  }
}

export { setCookie, getCookie };
