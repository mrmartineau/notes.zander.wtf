---
title: Technical Job Interview Questions
tags:
  - interview
  - questions
date: git Last Modified
---

## JavaScript questions

### What is the difference between functional and object oriented programming?

- Functional
  - emphasises on the use of functions where each function performs a specific task
  - Fundamental elements used are variables and functions. The data in the functions are immutable (cannot be changed after creation)
  - Importance is not given to data but to functions
  - It follows declarative programming model
  - It uses recursion for iteration
  - It is parallel programming supported
  - The statements in this programming paradigm does not need to follow a particular order while execution
- Object oriented
- Follow a simple two-point guideline:[2](http://blog.fogus.me/2013/07/22/fp-vs-oo-from-the-trenches/#fn:gl)
  - Whenever I write some code to deal with data **_about_** people then functional programming seems to work best.
  - Whenever I write some code to **_simulate_** people then object-oriented programming seems[3](http://blog.fogus.me/2013/07/22/fp-vs-oo-from-the-trenches/#fn:actors) to work best.

### What are some javascript design patterns?

- Singleton
  A Singleton only allows for a single instantiation, but many instances of the same object. The Singleton restricts clients from creating multiple objects, after the first object created, it will return instances of itself.
- Module
- Revealing module

### What are promises?

The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### Difference between `var`, `let` and `const`?

- `var` statement declares a function-scoped or globally-scoped variable, optionally initialising it to a value.
- `let` statement declares a block-scoped local variable, optionally initializing it to a value.
- `const` are block-scoped, much like variables declared using the let keyword. The value of a constant can't be changed through reassignment, and it can't be redeclared.

### Difference between `null` and `undefined`?

`undefined` means a variable has been declared but has not yet been assigned a value.
`null` is an assignment value. It can be assigned to a variable as a representation of no value
https://stackoverflow.com/questions/5076944/what-is-the-difference-between-null-and-undefined-in-javascript#5076962

### What is a closure?

A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). **In other words, a closure gives you access to an outer function’s scope from an inner function.** In JavaScript, closures are created every time a function is created, **at function creation time**.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

### What is currying?

Currying is a transformation of functions that translates a function from callable as `f(a, b, c)` into callable as `f(a)(b)(c)`. Currying doesn’t call a function. It just transforms it.
https://javascript.info/currying-partials

### What is a `Map`?

The Map object holds key-value pairs and remembers the original insertion order of the keys. Any value (both objects and primitive values) may be used as either a key or a value.
http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

### What is a `Set`?

The Set object lets you store unique values of any type, whether primitive values or object references. A value in the Set may only occur once; it is unique in the Set's collection.
http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

### What is a Higher order function?

A higher order function is a function that returns another function

### What is destructuring?

The destructuring assignment syntax is a JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

## React questions

### How do you like to style React components?

CSS.. with PostCSS and Tailwind

### What is your preferred state management solution for React?

`useState`, Context, Jotai, Zustand, Recoil, Redux
Correct answer is: it depends?

### Explain Suspense?

`Suspense` lets components “wait” for something before rendering.

### What are ErrorBoundary's used for?

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed.
https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary

### Explain Context?

Context provides a way to pass data through the component tree without having to pass props down manually at every level.
https://react.dev/learn/passing-data-deeply-with-context

### What is the significance of **keys** in React?

Keys help React identify which items have changed, are added, or are removed.
https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318

### When would you use a Class Component over a Functional Component?

Would only use a class component these days when creating a custom error boundary.

### What are refs in React and why are they important?

Refs provide a way to access DOM nodes or React elements created in the render method. - Why would you need to forward ref? If an internal component used refs you might want to be able to access them

### List ways of defining a component in React

- **Function components**
  This should be the default answer for all new components. Function components are more flexible and can use hooks. Class components are more verbose and can't use hooks (not directly, anyhow). Their lifecycle methods are also less flexible. The entirety of [Qualcomm.com](http://qualcomm.com/) is built with function components. Not a single class component exists anymore.
- **Class components**
  Many legacy codebases still use class components, so it's still important for you to understand how they work.

### What are some different types of React Component Patterns?

There are many answers to this question. It's important to have a solid grasp of React's fundamentals before delving into specific design patterns. Read more on these fundamentals here.

- **Compound components**
  Think of compound components like the `<select>` and `<option>` elements in HTML.
- **Higher Order Components**
  A higher-order component is a function that takes a component and returns a new component. HOCs aren't unique to React. In functional programming, a higher order function is a function that returns another function.
  https://reactjs.org/docs/higher-order-components.html
- **Render props**
  With a `render` or other prop that returns a `ReactNode`
- **State initialiser**
  Here we allow you to set the initial value (similar to defaultValue in `<input />`) and then a nice way to expose a reset helper function to allow users of the component to reset the component to its initial state.
- **Prop Collections and Getters**
  Formik and Downshift use these
- **Controlled Components**
  Inputs, Radix Dialogs/Alerts/etc - Provider

Read more about these patterns here: https://kentcdodds.com/blog/advanced-react-component-patterns

### What are Portals?

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
https://reactjs.org/docs/portals.html

### What does it mean to destructure props?

This one is a simple answer but very telling. React is just a JavaScript library. To that end, a React component's props are very similar to a single function parameter with an initial value of `{ }`. You should be able to explain what object destructuring is.

### How Virtual DOM works? Pros and cons

This is important to understand but not critical. The react docs do a good job of explaining this.

### What is React Reconciliation?

React provides a declarative API so that you don’t have to worry about exactly what changes on every update. This makes writing applications a lot easier, but it might not be obvious how this is implemented within React.

### What is `e.target`?

1. If you're ever asked this vague of a question, you should follow up with a question of your own. In what context? I'm assuming this is referring to DOM events.
2. DOM events
3. React events

### What is life cycle of a component?

1. Very important. If a Jr. answered this question properly and had the right attitude/fit for the team, I'd be more inclined to hire them. A correct good answer to this question would involve an overview of class component lifecycle (link below) and examples on some of their use cases. Bonus points for a comparison between function components and class components. Why lifecycle methods are useful: the developer can access class component lifecycle methods to inject custom logic at specific stages of a component's rendering process. Function components don't have these same methods (they technically still do under the hood, but it's moot). However, function components can tap into Hooks which provide similar functionality to the lifecycle methods of class components.
2. Class component lifecycle methods
3. From lifecycle methods to hooks

### How does Redux work?

The way Redux works is simple. There is a central store that holds the entire state of the application. Each component can access the stored state without having to send down props from one component to another.

If you plan on working with Redux, Redux toolkit simplifies the setup and usage. I'd recommend it.

### How to manage events in React?

Refer to "What is e.target?"

### Difference: component and element

A React Component is a function or class that accepts an input and returns a React element. ReactDOM renders DOM `elements` backed by instances of their `components`. An element is simply an instance of a React component. The clue here is that every JSX tag gets translated to a `React.createElement` call.

### What is React Fiber?

Don't spend a lot of time on this one: https://github.com/acdlite/react-fiber-architecture.

### How child component can change state in parent component?

Callbacks, Context, etc... There are lots of ways to do this and it's important to know some of them.

### Methods of debugging an app that uses framework.

- This question is vague. You should understand how to debug JavaScript, and popular IDEs can provide this functionality for you. Acceptable answer: "Look at what the framework's dev community is using."

### What does the deps array in useEffect() do?

Very important to know. https://reactjs.org/docs/hooks-reference.html#useeffect

### What is React?

React is a JavaScript library for building websites. React's purpose is to let you easily create a view that automatically updates itself based on your application's data. In React, you write the view once as a function of your data. This view automatically updates when the data changes.

Other useful articles:Examples of what to do:
https://kentcdodds.com/blog/making-your-ui-tests-resilient-to-changehttps://qvault.io/clean-code/dry-code/
Examples of what NOT to do:
https://medium.com/@joshsaintjacque/reacting-to-code-smells-bloaters-3e452d0c01bhttps://jsmanifest.com/10-things-not-to-do-when-building-react-apps/

## Typescript questions

### Do you like TypeScript? If so, why? If not, why not?

### What are some of your favourite features?

Type checking,

### What does the `Partial` utility type do?

Make all properties in `T` optional

### What does the built-in `Record` type do?

Construct a type with a set of properties `K` of type `T`

### What is a generic and how might you use one?

Used to pass a type into another type/interface. Like when you need to specify the return type of a a generic function.

## Other questions

- Are there any other technologies that you are interested in?
- How do you keep up to date with web trends?
- Are you working on any side-projects?

## Practical Coding questions

### Write a `mul` function which will produce the following outputs when invoked:

```jsx
console.log(mul(2)(3)(4)) // output : 24
console.log(mul(4)(3)(4)) // output : 48
```

Below is the answer followed by an explanation to how it works:

```js
function mul(x) {
  return function (y) {
    // anonymous function
    return function (z) {
      // anonymous function
      return x * y * z
    }
  }
}
```

### How to empty an array in JavaScript?

```js
var arrayList = ['a', 'b', 'c', 'd', 'e', 'f']

// 1.
arrayList = []

// 2.
arrayList.length = 0

// 3.
arrayList.splice(0, arrayList.length)

// 4.
while (arrayList.length) {
  arrayList.pop()
}
```

### Different ways to declare a function

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions

```js
// function declaration
function name([param[, param[, ... param]]]) {
   statements
}

// function expression
function [name]([param[, param[, ... param]]]) {
   statements
}

// generator function
function* name([param[, param[, ... param]]]) {
   statements
}

// generator function expression
function* [name]([param[, param[, ... param]]]) {
   statements
}

// arrow function expression
([param[, param]]) => {
   statements
}
param => expression

// `Function` constructor
new Function (arg1, arg2, ... argN, functionBody)

// generator function constructor
new GeneratorFunction (arg1, arg2, ... argN, functionBody)
```

### Constructor vs. declaration vs. expression

```js
// A function defined with the Function constructor assigned to the variable multiply:
var multiply = new Function('x', 'y', 'return x * y')

// A function declaration of a function named multiply:
function multiply(x, y) {
  return x * y
} // there is no semicolon here

// A function expression of an anonymous function assigned to the variable multiply:
var multiply = function (x, y) {
  return x * y
}

// A function expression of a function named func_name assigned to the variable multiply:
var multiply = function func_name(x, y) {
  return x * y
}
```
