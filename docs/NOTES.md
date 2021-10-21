# Notes

A bot will scrape the web for recipes.
Recipes will be observed from the Tinder app.
Redirects traffic to original recipe.
Reviews may include original adjusted recipe.

## Scratchpad

## Priorities

1. Liking a recipe via the heart button will toggle between like/not-like.
2. Swiping right must toggle the heart button to like-status.

## Most recent notes

## Modal upon first open

You'll want users to be instructed on how to use the app upon first open.

https://stackoverflow.com/questions/52651661/react-native-modal-will-be-shown-with-each-users-only-one-time-when-a-user-ope

## User authentication

Set req.session.user_id = user.\_id.

If req.session.user_id isn't defined, then the user wasn't authenticated!

## Signing out

Revoke user's cookie.

Delete session data from store.

## READ SOON

https://benhoyt.com/writings/dont-sanitize-do-escape/

## Collected sources

https://medium.com/javascript-in-plain-english/how-to-implement-passport-js-local-authentication-7617a2ef93e8

- here's a browser API for dealing with cookies: https://github.com/js-cookie/js-cookie
  - here's information about session middleware: https://github.com/jdesboeufs/connect-mongo

https://supertokens.io/blog/all-you-need-to-know-about-user-session-security

https://github.com/expressjs/csurf/issues/204

https://medium.com/hackernoon/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5

https://codepen.io/davidgilbertson/pen/OzdEbL

https://medium.com/hackernoon/part-2-how-to-stop-me-harvesting-credit-card-numbers-and-passwords-from-your-site-844f739659b9

https://medium.com/@jeremenichelli/first-thanks-for-writing-about-this-great-real-case-examples-and-advices-david-b19b19ca9a66

## React

https://github.com/remarkjs/react-markdown
https://stackoverflow.com/questions/42928530/how-do-i-load-a-markdown-file-into-a-react-component
https://swr.vercel.app/getting-started
https://react-hook-form.com/

## React AUTH

https://dennyscott.io/react-hooks-authentication/

https://www.youtube.com/watch?v=YPgMnugXBJo

https://github.com/js-cookie/js-cookie

```html
<div className="md:grid md:grid-cols-3">
  <menu />

  <main className="px-6 py-6 md:col-span-2"></main>
</div>
```

## Chaining requests in Insomnia

https://support.insomnia.rest/article/43-chaining-requests

## React Hooks

Good example of being able to click outside an element and still close the menu:
https://codesandbox.io/s/9o3lw5792w

^ Also demonstrates how to use `useState()` effectively.

https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82

## Accessibility

https://github.com/maximakymenko/react-burger-menu-article-app/pull/2/commits/029973fce6df07a69704e74491d510d0962a00ed

## Tinder-like swipes

https://www.npmjs.com/package/react-swipeable

## PassportJS

https://levelup.gitconnected.com/everything-you-need-to-know-about-the-passport-local-passport-js-strategy-633bbab6195
