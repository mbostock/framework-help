import {html} from "npm:htl";

export function UserActions({setLoggedIn}) {
  return html`<div>
    <button onclick=${() => setLoggedIn(true)}>Sign in</button>
    <button onclick=${() => setLoggedIn(false)}>Sign out</button>
  </div>`;
}
