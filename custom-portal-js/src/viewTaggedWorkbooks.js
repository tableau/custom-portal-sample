import {build_element, create_rows, add_to_content} from './utils';
TableauServerClient = TableauServerClient.default || TableauServerClient;

function getWorkbooks(server, tag) {
    server.workbooks.get({
      filter: {
        operator: TableauServerClient.operators.Equal,
        field: TableauServerClient.fields.Tag,
        value: tag
      }
    }).then((value) => {
      const {workbooks} = value;
      return Promise.all(workbooks.map((x) => x.previewImage));
    }).then((values) => {
      const elements = values.map((x) => build_element(x.workbook, x.imageUrl));
      const containers = create_rows(elements, 3);
      add_to_content(containers, 'teamWorkbooksContainer');
  });
}

export default (server, tag) => getWorkbooks(server, tag);