### 1. What is the difference between Component and PureComponent? give an example where it might break my app.

Back in the day React only had class components, meaning that components were literally javascript classes, with constructors and etc, 
that was fine at the time, but it had a lot of boilerplat, so later on Pure Components or aka Functional components were introduced in react,
allowing us to declare components using a simple JS function.

Pure components behave very much the same as class components, aside from a few things, they for example have hooks to control component state and other
more advanced behaviors, that require more attention because a component's _function_ is executed every time it renders, and everything that's inside, 
not only the _render_ part. This also brings a different render life-cycle with useEffect hook for example, with might destroy your app if not used properly.

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
Well, I've never had a problem with this before because I don't use ShouldComponentUpdate anymore, but since ShouldComponentUpdate has the power to cancel 
component renders, it might lead to components not updating properly when used together with Context because it injects state updates in the component without
using its props, what could lead to the interpretation that the component should not update.

### 3. Describe 3 ways to pass information from a component to its PARENT.
- We can have callbacks as props for a component, that executes it when necessary, passing some data back to its parent component.
- We can use global states like redux to trigger updates that will be passed down in render three, reaching our parent component. (It uses Context API under the hood)
- We could use render props and expose to the parent component some private data back, so it can render other children using it

### 4. Give 2 ways to prevent components from re-rendering.
- The first option is always to compose the application wisely in order to not re-render unnecssary sections of the app, but another important tool is to know 
how to properly use the component life-cycle in your favor with hooks like useEffect and strict dependencies, making sure that a re-render will only be triggered when necessary.
- Another more drastic way, is to use React.memo and enforce from the top, that it won't be re-render from above if the props don't change

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
React fragments is a development tool in order to work around the problem that react only allows a component to return a single jsx node, meaning that we can't 
have a component that returns two <p> nodes. 
  
So if we don't want to add extra markup to the component like:
```jsx
return (
  <div>
    <p />
    <p />
  </div>
)
```
We can use react fragments, it will comply to the only 1 node, but in the generated HTML output, no node will be rendered:
```jsx
return (
  <>
    <p />
    <p />
  </>
)
```
Outputs: 
```html
<p />
<p />
```

### 6. Give 3 examples of the HOC pattern.
- Hoc were used before hooks to inject redux store into components.
- React router also has the option to use a HOC to enhance a component with current route props
- And one example of some thing I made myself is a HOC gate nestjs pages, which renders a not found page instead if the user is not authorized. This centralizes
the authorization logic, while making it completely transparent for whom is using the page component is like it's not even there.

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.
Promises callbacks don't need to be waited, allowing the runtime to continue and executing the `catch` if the promise is rejected. On the other side, `async...await` 
requires its scope to be async, and pauses the runtime execution, and you also need to use `try...catches` to capture exceptions.

### 8. How many arguments does setState take and why is it async.
I don't remember what's its API, this is from class components right? I would had to google it.

### 9. List the steps needed to migrate a Class to Function Component.
I would start identifying the places a component is consuming data from outside, like props, context and etc, convert it to function equivalent using hooks,
then I would go and check the class methods, convert them to inline methods on the functional component, and use `useCallback` when needed to not redeclare expensive methods.
Then I would check the component life-cycle, and adapt it using useEffect if needed. And lastly make sure the contexts of the render method are alright, and return the JSX.

### 10. List a few ways styles can be used with components.
- You can easily use inline styles with the prop `styles={{ fontSize: 16 }}`, react automatically converts camelCase attributes to kebab case used in css, plus 
you can set units without the px string.
- You can have css/scss/sass files used as css modules, and use the generated classes in your components, with the advantage that it generates exclusive classes,
meaning that we don't need to worry about a style change affecting other components.
- We can use JSS or styled-components to simply set a component styles direct in the javascript.

### 11. How to render an HTML string coming from the server.
If I remember well, react has a property called something like `dangerousInlineHTML`, that renders raw HTML, but ... it's daangerous because this can easily break the app.
