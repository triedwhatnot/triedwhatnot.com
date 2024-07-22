# triedwhatnot.com - My Portfolio
Check it out : [Live Demo](https://triedwhatnot.com)


## Description
A portfolio website, built on node-express server, which serves multiple React apps and landing pages like any real-time large scale website.


## Features
1. Server React apps and landing pages through one server.
2. Asset optimisations for:
    - CSS
    - JS
    - Images - compression, resize, format (webp) using [squoosh.app](https://squoosh.app/)


## Deployment related pointers
1. index routes contain a baseUrl key
    - not being used, but still keep in mind
2. .env updates to be added
3. default port is 5173


## Learnings
1. Group views into folders and serve them by updating paths. Eg: views > projects > budgety”.ejs -> “projects/budgety.ejs”
    - Similar thing was done for serving partials : re-usable parts of HTML
2. Contact form - 
    - In-built validation methods : 
        - InputEl.setCustomValidity("custom message") - show custom message in in-built error UI
        - InputEl.validity.valueMissing - check if particular validity check approves
        - dotComWrongPosition.test(value) - use custom regex to test and report validity
        - InputEl.reportValidity() - check if input value is valid
    - Title mentioned in the input field is used by browser to display instructions in case of wrong input is entered
3. Serving react app from node express server
    - Static assets requests are going to wrong path - updates “base” in vite.config.js, so that address of files being requested are updated in index.html
    - Routes not working after base change - as router base path was still configured to “/” only. must be updated to base URL for the app.
4. Running scripts from parent
    - "build": "npm --prefix ./voice2post run build && npm --prefix ./react-testing-suite run build-deploy && npm run start"
        - --prefix ./voice2post -> change folder
        - build -> command to run package.json's script in that sub-directory
5. Order of middleware is important as they perform tasks like, 
    - modifying the request and response objects, ending the request-response cycle, or passing control to the next middleware function.  
    - And any pattern that matches the route, will lead to middleware being added to that request. 
    - And if any middleware completes the req-res cycle by returning some response, following middlewares won't be attached.
