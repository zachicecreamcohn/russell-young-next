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

  

  
export class User {
  constructor() {
    this.username = null;
    this.email = null;
    this.firstName = null;
    this.lastName = null;
    this.company = null;
    

  } 

  async isLoggedIn() {
   // use session to check if the user is logged in
    const response = await fetch("/api/userManagement/checkLogin");
    const data = await response.json();
    return data.loggedIn;
  }

  async fetchUser() {
    if (await this.isLoggedIn()) {
      const response = await fetch("/api/userManagement/loggedInUser");
      const data = await response.json();
      if (data.success) {
        this.username = data.user.username;
        this.email = data.user.email;
        this.firstName = data.user.first_name;
        this.lastName = data.user.last_name;
        this.company = data.user.company;
      }
    }
  }
}

