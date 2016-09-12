// This file is for configuring the various pieces of the application for working against your server
// Note: you must enable CORS on your Tableau Server:
// tabadmin -c dev set vizportal.rest_api.cors.allow_origin http://localhost:8080
// tabadmin -c dev set vizportal.rest_api.cors.enabled true

window.AppConfig = {
  server_url: "http://tc-tabsrv-01",
  username: "bl",
  site_name: "PerformingArts",
  password: "bl", // Let's be honest, you should never do this.  Get the password from the user.
  team_tag: "Alum"
};