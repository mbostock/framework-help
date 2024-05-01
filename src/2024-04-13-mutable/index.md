# 2024-04-13 Mutable

Ref. https://talk.observablehq.com/t/cant-define-update-a-mutable/9139

Generally speaking, a `Mutable` should be declared in a page, not in a component. All reactive state in Observable lives at the page level. You can pass state values (and mutators) into components when rendering, but components can’t define their own internal reactive state.

So, more commonly you’d declare the Mutable in your page like so:

```js echo
const isLoggedIn = Mutable(false);
const setLoggedIn = (value) => isLoggedIn.value = value;
```

Then you can have components that receive either `isLoggedIn` or `setLoggedIn` as props. For example, this one displays the current status:

```js run=false
import {html} from "npm:htl";

export function UserStatus({isLoggedIn}) {
  return html`You are currently ${isLoggedIn ? "logged in" : "logged out"}.`
}
```

And this one mutates it:

```js run=false
import {html} from "npm:htl";

export function UserActions({setLoggedIn}) {
  return html`<div>
    <button onclick=${() => setLoggedIn(true)}>Sign in</button>
    <button onclick=${() => setLoggedIn(false)}>Sign out</button>
  </div>`;
}
```

To use these components on the page, first import them:

```js echo
import {UserActions} from "./UserActions.js";
import {UserStatus} from "./UserStatus.js";
```

Then say:

```md run=false
${UserStatus({isLoggedIn})}

${UserActions({setLoggedIn})}
```

${UserStatus({isLoggedIn})}

${UserActions({setLoggedIn})}
