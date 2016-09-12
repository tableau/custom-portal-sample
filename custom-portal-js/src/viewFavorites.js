import {build_element, create_rows, add_to_content} from './utils';

TableauServerClient = TableauServerClient.default || TableauServerClient;



function getFavorites(server) {
    server.favorites.get()
    .then((value) => {
      const {favorites} = value;
      return Promise.all(favorites.map((x) => x.populate().then((x) => x.previewImage)));
    }).then((values) => {
      const elements = values.map((x) => build_element(x.workbook, x.imageUrl));
      const containers = create_rows(elements, 3);
      add_to_content(containers, 'myFavoritesContainer');
  });
}

export default (server) => getFavorites(server);