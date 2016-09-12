# custom-portal-sample

Shows how Tableau's APIs can be used to integrate and embed analytics within a custom portal.

# One Time Set-up
Currently, running this sample requires using CORS Proxy to broker calls from the browser to the Tableau REST API.

To set things up:

1. Clone this repository (`custom-portal-sample`)
2. From your terminal, go to the `custom-portal-js` directory and run `npm install`
3. In `configure_app.js` (found in `custom-portal-sample\custom-portal-js\pages\js\`) -> set the IP to point to the CORS Proxy machine (see below in "Running the app"), set the tag, set user name/password/IP for Tableau Server
4. From the 'custom-portal-sample\custom-portal-js' folder, run 'npm run build'. This will create a 'dist' directory which contains all the files needed for the web portal.

# Running the app
You will need to run two things: the CORS Proxy and a local webserver:
* Start CORS Proxy -> From your terminal in the `custom-portal-js` directory, run `npm run cors`.
* Start webserver -> From your terminal in the `custom-portal-js` directory run, `npm start` to use the webpack dev server.

Note: You need to pack up all the files (and re-pack them after any edits). To do this you simply run `npm run build`. Then you copy everything from the `dist` directory to your webserver (or just run a webserver in that directory).

# Pre-Release Software
This project currently includes an unsupported, pre-release version of the forthcoming server client library (SCL) for JavaScript (called 'scl-alpha.js') which enables the browser to fetch objects from Tableau Server. Once the SCL for JS is released, this sample will be updated to use the released version.

Additionally, because the Tableau Server REST API does not yet support CORS, we are using the CORS Anywhere module.


# License and Credits
This portal uses a [web template created by W3 layouts](https://w3layouts.com/learn-a-educational-guidance-flat-bootstrap-responsive-web-template/). The template is in the learn-web folder and is licensed by W3 layouts under the [Creative Commons Attribution 3.0 Unported license](https://creativecommons.org/licenses/by/3.0/).

The Artist Finder network diagram is based on [the force diagram](https://github.com/sathomas/jsDataV.is-source/tree/master/ch7/force) from "Data Visualization with JavaScript" by Stephen A. Thomas.

All other content in this repository is licensed under the MIT license.

Changes to Learn Template
* Removed some pages
* Added page for Tableau analytics
* Put headers and footers into separate files (-header.html and -footer.html respectively)
* Simplified menu options

