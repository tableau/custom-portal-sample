# custom-portal-sample

Shows how Tableau's APIs can be used to integrate and embed analytics within a custom portal.

# One Time Set-up
Currently, running this sample requires using CORS Proxy to broker calls from the browser to the Tableau REST API.

To set things up:

1. Clone this repository (`custom-portal-sample`).
2. From your terminal, go to the `custom-portal-js` directory and run `npm install`.
3. Configure the sample (see below).
4. Publish the included workbook ('ArtistFinder.twbx') to your Tableau Server. Use the same site you used in step 3.
5. From the 'custom-portal-sample\custom-portal-js' folder, run 'npm run build'. This will create a 'dist' directory which contains all the files needed for the web portal.

# Configure the Sample

Inside of `custom-portal-sample/custom-portal-js/pages/js/configure_app.js`, you will need to make sure changes.

1. Set `server_url` to be the url of your tableau server.
2. Set `username` and `password` to the username and password of an interactor on the server.
3. Set `site_name` to the name of the site you want to use.  This is the site name that appears in the URL when you visit your tableau server (also sometimes refered to as site id).
4. Set `team_tag` to be a tag that you have on your server.  This will be used to pull workbooks as part of the sample.
5. If you are not going to run the CORS Proxy on your local machine, you'll need to update the `cors` entries to point to where you are running the CORS Proxy.
6. Change the url on line 7 in CustomVizInteraction.js (in custom-portal-js/pages/js directory) to point to your Tableau Server.

# Why do I need the CORS Proxy

[CORS](https://www.html5rocks.com/en/tutorials/cors/) is a technology that allows you to get around the same-origin policy by specifically allowing certain origins to request from your server.

Tableau Server does not currently support configuring CORS, so you will need to use the CORS proxy to test this sample.

# Running the app
You will need to run two things: the CORS Proxy and a local webserver:
* Start CORS Proxy -> From your terminal in the `custom-portal-js` directory, run `npm run cors`.
* Start webserver -> From your terminal in the `custom-portal-js` directory run, `npm start` to use the webpack dev server.

This will start a `webpack-dev-server`, which you can hit using the URL that it outputs (most likely `http://localhost:8080/`).

If you want to serve up the files from a static web server, you can also run `npm run build` which will create the `dist` directory under custom-portal-js.  Then you can copy the contents of the `dist` directory and serve it from a static web server, or if you have python, go into the `dist` directory and run `python -m SimpleHTTPServer` which will start a web server that can serve the files.

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

