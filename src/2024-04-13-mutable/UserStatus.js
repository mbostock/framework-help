import {html} from "npm:htl";

export function UserStatus({isLoggedIn}) {
  return html`You are currently ${isLoggedIn ? "logged in" : "logged out"}.`
}
