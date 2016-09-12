import getFavorites from './viewFavorites';
import getTaggedWorkbooks from './viewTaggedWorkbooks';
TableauServerClient = TableauServerClient.default || TableauServerClient;

$(document).ready(() => {
  if (window.AppConfig.cors) {
    TableauServerClient.set_cors_proxy(window.AppConfig.cors.ip, window.AppConfig.cors.port);
  }

  const auth = TableauServerClient.Auth(window.AppConfig.username, window.AppConfig.password,
    window.AppConfig.site_name);
  TableauServerClient.sign_in(window.AppConfig.server_url, auth)
    .then((server) => {
      getFavorites(server);
      getTaggedWorkbooks(server, window.AppConfig.team_tag);
    });
});
