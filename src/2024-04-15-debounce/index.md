# 2024-04-15 Debounce


_Debouncing_ is a technique to delay and coalesce time-consuming tasks in response to events that occur frequently. For example, by debouncing input into a search box, instead of sending a request on every keystroke you can wait until the user stops typing. This reduces load on the server and may improve the user experience.

Framework doesn’t have a built-in function to debounce input, but you can implement one by writing a [generator](https://observablehq.com/framework/reactivity#generators). Here we’ll use `Generators.observe` to listen to *input* events on the given input element, emitting the new value no more than once a second.

```js echo
const input = debounce(display(Inputs.text({placeholder: "Type some text…"})));
```

```js echo
input // the current value; note that it updates slowly
```

The `debounce` helper is imported from a `debounce.js` file which contains:

```js run=false
import {Generators} from "npm:@observablehq/stdlib";

export function debounce(input, delay = 1000) {
  return Generators.observe((notify) => {
    let timer = null;
    let value;

    // On input, check if we recently reported a value. If we did, do nothing and wait for a delay;
    // otherwise, report the current value and set a timeout.
    function inputted() {
      if (timer !== null) return;
      notify(value = input.value);
      timer = setTimeout(delayed, delay);
    }

    // After a delay, check if the last-reported value is the current value. If it’s not, report
    // the new value.
    function delayed() {
      timer = null;
      if (value === input.value) return;
      notify(value = input.value);
    }

    input.addEventListener("input", inputted), inputted();
    return () => input.removeEventListener("input", inputted);
  });
}
```

It can be imported like so:

```js echo
import {debounce} from "./debounce.js";
```

If you’d prefer to use [lodash](https://lodash.com/docs#debounce) instead, you could implement `debounce` like so:

```js run=false
function debounce(input, delay = 1000) {
  return Generators.observe((notify) => {
    notify = _.debounce(notify, delay);
    const inputted = () => notify(input.value);
    input.addEventListener("input", inputted), inputted();
    return () => input.removeEventListener("input", inputted);
  });
}
```
