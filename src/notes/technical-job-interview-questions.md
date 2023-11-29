---
title: Technical Job Interview Questions
tags:
  - interview
  - questions
date: git Last Modified
---

## JavaScript questions

### What is the difference between functional and object oriented programming?

#### Functional

- emphasises on the use of functions where each function performs a specific task
- Fundamental elements used are variables and functions. The data in the functions are immutable (cannot be changed after creation)
- Importance is not given to data but to functions
- It follows declarative programming model
- It uses recursion for iteration
- It is parallel programming supported
- The statements in this programming paradigm does not need to follow a particular order while execution

#### Object oriented

OOP (Object-Oriented Programming) is an approach in programming in which data is encapsulated within objects and the object itself is operated on, rather than its component parts.

JavaScript is heavily object-oriented. It follows a [prototype-based model](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain), but it also offers a [class syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_classes) to enable typical OOP paradigms.

Follow a simple two-point guideline:[2](http://blog.fogus.me/2013/07/22/fp-vs-oo-from-the-trenches/#fn:gl)

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

## Web performance questions

### How would you use critical rendering path optimization to improve the performance of a web page?

The critical rendering path is the sequence of steps the browser takes to convert the HTML, CSS, and JavaScript into pixels on the screen. Optimizing the critical rendering path can improve the performance of a web page by reducing the time it takes for the content to be visible to the user.

- Deferring the loading of non-critical JavaScript
- Code-Splitting
- Inlining Critical CSS

### What are some common performance bottlenecks in web applications?

- Slow server response time: The time it takes for the server to process a request and send back a response can be a bottleneck if the server is not optimized or is overloaded with requests.
- Unoptimized database queries: Poorly written or numerous database queries can slow down the performance of a web application by causing delays in retrieving data.
- Slow page load time: If a web page takes too long to load, it can lead to a poor user experience and negatively impact the performance of the web application.
- Large or numerous JavaScript files: Loading and executing large or numerous JavaScript files can slow down the performance of a web application, especially on slower devices or network connections.
- Unoptimized images: Large or unoptimized images can slow down the performance of a web page by taking longer to load.
- Bloated and complex CSS: Web pages with complex CSS can slow down the performance of a web application, especially when the browser has to spend more time parsing and rendering the styles.
- Lack of browser caching: Not utilizing browser caching can result in a slower experience for returning users as the browser will have to download resources again.

### Explain how service workers can be used to improve the performance of a web page

Service workers are a type of script that can run in the background of a web page, separate from the main JavaScript thread. They are used to handle network requests, cache resources, and provide offline functionality to web pages. Service workers can be used to improve the performance of a web page in several ways:

- Offline caching: Service workers can be used to cache resources, such as HTML, CSS, and JavaScript files, so that they can be accessed offline. This means that if a user visits a page again when they are offline, they will still be able to access the page's content.
- Background synchronization: Service workers can be used to send data from a web page to a server even when the user is offline. This means that when the user comes back online, the data can be sent to the server and the user will not lose any data.
- Push notifications: Service workers can be used to receive push notifications even when a web page is closed. This means that users can receive notifications even when they are not actively using the web page.
- Performance optimization: Service workers can be used to handle network requests, such as fetching resources or sending data to a server. By handling these requests in the background, service workers can improve the performance of a web page by reducing the load on the main JavaScript thread.

### How would you use browser developer tools to analyze and improve the performance of a web page?

Browser developer tools are a powerful tool for analyzing and improving the performance of a web page. Here are the steps that can be taken to use browser developer tools to analyze and improve the performance of a web page:

1. Open the developer tools by pressing F12 or Ctrl+Shift+I in your browser.
1. Once the developer tools are open, select the "Performance" tab. This will open a timeline of the browser's activity during the loading of the web page.
1. Click on the "Record" button to start recording the performance of the web page. Interact with the web page to simulate the actions of a user.
1. Once you've finished interacting with the web page, click on the "Stop" button to stop the recording. The timeline will now show a detailed breakdown of the browser's activity during the recording.
1. Analyze the timeline by looking for any performance bottlenecks or issues. Some common issues to look for include:
1. Long or blocked main thread: If the main thread is blocked for long periods of time, the browser may not be able to respond to user input or update the screen.
1. Long or blocked rendering: If the rendering is blocked for long periods of time, the browser may not be able to display the web page.
1. Long load time: If the web page takes a long time to load, the user may experience a delay before they can interact with the web page.
1. Once you've identified the issue, use the other tools available in the developer tools to identify the cause of the issue, such as the network tab to see the resources loaded and their size, time taken to load and other details.
1. Once you've identified the cause of the issue, use the optimization techniques to improve the performance of the web page, for example, minifying and compressing resources, using browser caching, or optimizing images.
1. Repeat steps 3-7 to see if the performance has improved after making the changes.

### How would you optimize the load time of a web page?

There are many techniques that can be used to optimize the load time of a web page, some include:

- Minimize the number of HTTP requests: The more resources a web page has to load, the longer it will take. Minimizing the number of resources (such as images, stylesheets, and scripts) can help reduce the number of HTTP requests, and therefore speed up the load time of a web page.
- Minify and compress resources: Minifying resources means removing unnecessary characters and whitespace from code, while compressing resources means reducing their file size. Both of these techniques can help reduce the size of resources and therefore speed up their download time.
- Use a content delivery network (CDN): A CDN can help speed up the load time of a web page by distributing resources across multiple servers in different locations. This means that resources are loaded from a server that is geographically closer to the user, which can help reduce the download time.
- Use browser caching: By utilizing browser caching, the browser will save certain resources on the user's device and not have to re-download it on subsequent visits.
- Defer the loading of non-critical resources: Some resources on a web page might not be needed right away, such as analytics tracking scripts, or ads. By deferring the loading of these non-critical resources, the web page can load faster.
- Optimize images: Large, unoptimized images can significantly slow down the load time of a web page. Optimizing images can help reduce their file size, making them faster to download.

### Explain the difference between layout, painting, and compositing in relation to web page performance

Layout, painting, and compositing are all processes that are performed by the browser when rendering a web page. These processes work together to create the final image that the user sees on their screen.

- **Layout**: The layout process is responsible for calculating the position and size of all elements on the web page. This includes calculating the dimensions of elements, such as width, height, and position, and determining how elements are laid out on the screen.
- **Painting**: The painting process is responsible for filling in the pixels of the elements on the screen. This includes applying color, images, and other visual styles to elements.
- **Compositing**: The compositing process is responsible for combining all of the elements on the screen into a single image. This includes combining elements that are layered on top of each other, such as drop-down menus or modal dialogs, and applying visual effects, such as transparency or 3D transforms.

Optimizing the performance of these three processes can improve the overall performance of a web page. For example, minimizing layout changes can help to reduce the number of paint operations required, and reducing the number of compositing layers can improve the performance of visual effects.

These processes can be profiled using browser developer tools such as chrome dev tools to understand where the performance bottlenecks are and optimize the page for better performance.

### Explain the concept of caching and how to use it to enhance the performance of a web page.

Caching is the process of storing frequently-used data in a temporary storage area so that it can be quickly retrieved without the need to fetch it from its original source. Caching can be used to improve the performance of a web page in several ways:

- Browser caching: By using HTTP headers, the browser can be instructed to cache certain resources on the client-side, such as images, CSS, and JavaScript. This means that when the user visits the page again, they do not need to download these resources again, resulting in faster page load times.
- Server caching: Server-side caching can be used to store frequently requested data, such as the results of a database query, in memory. This means that the data can be quickly retrieved without the need to execute the query again, resulting in faster page load times.
- CDN caching: By using a Content Delivery Network (CDN), the resources of a web page can be cached on servers located close to the user, resulting in faster page load times.

Cache-control headers: By setting cache-control headers, web developers can specify how long resources should be cached for and when they should be revalidated.

### Can you explain what web workers are and give some examples of when you'd use them?

Web workers are a JavaScript feature that allows developers to run scripts in the background, separate from the main thread. This can improve the performance of a web page by allowing the main thread to continue executing other scripts and responding to user input.

One common use case for web workers is offloading heavy computations, such as image processing or data manipulation, from the main thread. By running these tasks in the background using web workers, the main thread can continue to respond to user input and maintain a smooth user experience.

Another use case is to improve the responsiveness of the user interface. For example, when validating a form, the web worker can perform the validation in the background while the main thread is free to continue handling user input. This can make the form validation process feel more responsive to the user.

In Single-page Applications (SPAs), web workers can be used to handle complex logic or data manipulation in the background while the user interacts with the page. This can improve the performance of the SPA by reducing the amount of work the main thread needs to do and allowing the application to respond more quickly to user input.

In Progressive Web Applications (PWAs), web workers can be used to handle background tasks such as caching and background synchronization while the user interacts with the page. This can improve the performance of the PWA by reducing the amount of work the main thread needs to do, and allowing the application to respond more quickly to user input.

By using web workers, developers can improve the performance of a web page by running heavy computations and tasks in the background, resulting in a smooth and responsive user experience. It's important to note that web workers are not supported in all browsers, and developers should ensure that the web application can gracefully degrade in browsers that do not support web workers.

### What are some ways you may improve your website's scrolling performance?

- Use `requestAnimationFrame` to synchronize scrolling with the browser's repaint cycle.
- Debounce scroll events to reduce the number of times the event handler is called.
- Use `translate3d` or `will-change` properties to promote elements to their own compositing layer, this reduces the amount of repainting required.
- Use fixed position elements when possible, as they are composited separately from the rest of the page.
- Use `overflow: hidden` or `overflow: scroll` on parent elements to improve performance of child elements.
- Use CSS transitions and animations instead of JavaScript to animate elements during scrolling.
- Use hardware accelerated transforms and animations, such as `translate3d`, `scale`, and `rotate`.
- Use a virtual scrolling technique for large lists of items to only render the items currently visible on the viewport.

### How would you measure the performance of a web page?

- Use browser developer tools: Most modern web browsers come with built-in developer tools that can be used to measure the performance of a web page. These tools can provide information on page load times, resource loading times, and more. These tools can be accessed by pressing F12 or Ctrl+Shift+I and provide a set of features for web developers to inspect, debug, and optimize the web pages. Some of the common features that browser developer tools provide to measure the performance of a web page include:
  - Network tab: This tab allows you to view the requests and responses made by the browser to load the web page, and their corresponding timing information like time to first byte, download time, and total time.
  - Performance tab: This tab provides a timeline of the browser's activity during the loading of the web page, including metrics like time to first paint, time to first contentful paint, and time to interactive.
  - Audits tab: This tab allows you to run an automated performance audit of the web page and provide recommendations to improve the performance, accessibility, best practices, and SEO of the web page.
- Use web page performance testing tools: There are many online tools available that can be used to test the performance of a web page. Some examples include Google PageSpeed Insights, GTmetrix, and WebPageTest. These tools can provide detailed information on page load times, resource loading times, and more.
- Use browser performance APIs: Browsers also provide performance API like Navigation Timing API and User Timing API, that can be used to get performance metrics like time to first paint, time to first contentful paint, time to first input delay etc.
- Monitor real-user performance: Tools like Google Analytics, or browser extensions like SpeedTracker, can provide real-user performance data. This can give you a good idea of how your web page is performing for your users.
- Use synthetic monitoring: Synthetic monitoring allows you to simulate a user visiting your website from different locations and on different devices, this way you can monitor the performance of your website from various conditions.

### How would you use a performance budget to ensure that a web page performs well on different devices and network conditions?

A performance budget is a set of guidelines and constraints that are put in place to ensure that a web page performs well on different devices and network conditions. Here are the steps that can be taken to use a performance budget to ensure that a web page performs well:

- Identify the key performance metrics that are important for the web page, such as load time, time to first paint, and time to interactive.
- Set realistic and achievable targets for each of the key performance metrics based on the devices and network conditions that the web page will be accessed from.
- Use tools such as Lighthouse or WebPageTest to measure the current performance of the web page and compare it to the targets set in the performance budget.
- Identify any areas where the web page is not meeting the targets set in the performance budget.
- Use optimization techniques to improve the performance of the web page, such as minifying and compressing resources, using browser caching, or optimizing images.
- Continuously monitor the performance of the web page and make adjustments as needed to ensure that it meets the targets set in the performance budget.
- Use the budget to track the performance of the website through the development and deployment process, and to make informed decisions about what resources should be loaded and when.
- Use the budget to evaluate the performance of the website after it is deployed, and to make adjustments as needed to ensure that it continues to meet the targets set in the performance budget.
- Using a performance budget in this way helps to ensure that the web page will perform well on different devices and network conditions, providing a better experience for users.

### How would you optimize the performance of a web page for different network conditions?

Optimizing the performance of a web page for different network conditions involves considering the types of resources that are loaded on the page, the size of those resources, and how they are loaded.

- Resource optimization: Reduce the size of resources, such as images and JavaScript files, by compressing them and using appropriate image formats like JPEG2000, JPEG XR, and WebP.
- Code splitting: Use code splitting to load only the necessary resources for a specific page, this will not only reduce the time to load the resources but also reduces the data usage.
- Minimize the number of HTTP requests: Minimize the number of HTTP requests by combining multiple files into one and using browser caching.
- Use a Content Delivery Network (CDN): A CDN can help to distribute resources to users based on their geographic location, which can help to improve the performance of a web page for users with slower network connections.
- Progressive loading: Use progressive loading techniques, such as lazy loading, to load only the necessary resources for the user.
- Optimize for offline: Use service workers to cache resources, so that they can be accessed offline. This means that if a user visits a page again when they are offline, they will still be able to access the page's content.

### Explain the concept of code splitting and its impact on enhancing the performance of a web page.

Code splitting is a technique that allows you to divide your codebase into smaller chunks that can be loaded on-demand as the user navigates through your web page. This can improve the performance of your web page by reducing the amount of code that needs to be loaded and parsed on initial load.

Here are the steps that can be taken to use code splitting to improve the performance of a web page:

- Use a bundler such as Webpack or Rollup to create multiple chunks of your codebase.
- Use dynamic imports to load chunks of code as they are needed, rather than loading all code up front.
- Use the `preload` and `prefetch` resource hints to tell the browser which chunks of code are likely to be needed next, so that they can be loaded in advance.
- Use the `import()` function to load chunks of code on-demand.
- Use the `splitChunks` option in _webpack_ to automatically split your code into chunks based on usage.

By splitting your codebase into smaller chunks, code splitting can greatly improve the performance of your web page, especially for users on slower network connections. Code splitting can also help to reduce the amount of code that needs to be loaded and parsed on initial load, which can help to improve the time-to-interactive of your web page.

### How would you use lazy loading to improve the performance of a web page?

Lazy loading is a technique that can be used to improve the performance of a web page by only loading resources when they are needed. Here are the steps that can be taken to use lazy loading to improve the performance of a web page:

- Identify the resources on the web page that can be lazily loaded, such as images, videos, or other heavy resources.
- Use a library or framework such as IntersectionObserver or LazyLoad to implement lazy loading for these resources.
- Use the `loading` attribute to specify how the browser should treat images that are lazily loaded. For example, setting the attribute to `lazy` will tell the browser to only load the image when it is visible in the viewport.
- Use the `data-src` attribute instead of the src attribute for images that are lazily loaded. This allows the browser to load the image when it is scrolled into view.
- Use the `data-srcset` attribute instead of the srcset attribute for images that are lazily loaded. This allows the browser to load the correct size image based on the device and viewport.
- Use the `data-background` attribute instead of the background attribute for elements that are lazily loaded. This allows the browser to load the background image when the element is scrolled into view.
- Use the `data-background-set` attribute instead of the background-set attribute for elements that are lazily loaded. This allows the browser to load the correct background image based on the device and viewport.

By only loading resources when they are needed, lazy loading can greatly improve the performance of a web page, especially for users on slower network connections. Lazy loading can also help to reduce the amount of data that needs to be loaded, which can help to reduce the cost of data usage for users.

### Do you know of any tools that help with performance budgeting?

Yes, there are several tools that can help with performance budgeting. Some popular ones include:

Lighthouse: This is an open-source tool that is built into the Chrome Developer Tools and can be used to audit the performance of a web page. It provides detailed information about the performance of a web page and includes a performance budget feature that allows you to set targets for key performance metrics.

- [WebPageTest](https://www.webpagetest.org/): This is an open-source tool that allows you to test the performance of a web page on different devices and network conditions. It provides detailed information about the performance of a web page and includes a performance budget feature that allows you to set targets for key performance metrics.
- [SpeedCurve](https://www.speedcurve.com/): This is a paid tool that allows you to monitor the performance of a web page over time. It provides detailed information about the performance of a web page and includes a performance budget feature that allows you to set targets for key performance metrics.
- [Calibre](https://calibreapp.com/): This is a paid tool that allows you to create and manage performance budgets for your web pages. It provides detailed information about the performance of a web page and includes a performance budget feature that allows you to set targets for key performance metrics.
- [SpeedKit](https://www.speedkit.com/): This is a paid tool that allows you to improve the performance of a web page by optimizing the delivery of resources. It provides detailed information about the performance of a web page and includes a performance budget feature that allows you to set targets for key performance metrics.

These tools can help you to identify performance bottlenecks, set performance budgets, and monitor the performance of your web pages over time.

### Explain how you would use the RAIL performance model to improve the performance of a web page.

**RAIL** is a performance model that stands for Response, Animation, Idle, Load. It is a user-centric performance model that helps developers understand how to create fast and smooth user experiences.

- **Response**: The browser should respond to user input in under 100ms. This means that when a user interacts with the page, such as clicking a button, the browser should respond quickly.
- **Animation**: Animations should run at 60 frames per second (fps). This means that animations should be smooth and not janky.
- **Idle**: The browser should use idle time to perform background tasks and prepare for the next user interaction.
- **Load**: The page should be fully loaded in under 1000ms. This means that the page should be visible and usable in under 1 second.

To improve the performance of a web page using the RAIL model, developers should focus on minimizing the time it takes to respond to user input, ensuring animations run smoothly, making use of idle time, and reducing the time it takes to fully load the page.

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
