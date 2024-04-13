# 2024-04-13 Mutables

Ref. https://talk.observablehq.com/t/cant-define-update-a-mutable/9139

```js echo
const isLoggedIn = Mutable(false);
const setLoggedIn = (value) => isLoggedIn.value = value;
```

${UserStatus({isLoggedIn})}

${UserActions({setLoggedIn})}

```js echo
import {UserActions} from "./UserActions.js";
import {UserStatus} from "./UserStatus.js";
```

```js run=false
import {html} from "npm:htl";

export function UserActions({setLoggedIn}) {
  return html`<div>
    <button onclick=${() => setLoggedIn(true)}>Sign in</button>
    <button onclick=${() => setLoggedIn(false)}>Sign out</button>
  </div>`;
}
```

```js run=false
import {html} from "npm:htl";

export function UserStatus({isLoggedIn}) {
  return html`You are currently ${isLoggedIn ? "logged in" : "logged out"}.`
}
```
