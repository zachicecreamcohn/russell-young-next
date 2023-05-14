// apiUtils.js

export function checkLogin() {
    return fetch("/api/userManagement/checkLogin")
      .then((response) => response.json())
      .then((data) => data.loggedIn);
  }
  

  export async function logout() {
    fetch("/api/userManagement/logout")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          window.location.href = "/login";
        }
      });
    }