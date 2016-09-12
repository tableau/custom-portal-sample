TableauServerClient = TableauServerClient.default || TableauServerClient;

function get_actionlist() {
  return {
    "Export to PDF": function(viz) { viz.showExportPDFDialog(); },
    "Export Image": function(viz) { viz.showExportImageDialog(); },
    "Export Crosstab": function(viz) { viz.showExportCrossTabDialog(); },
    "Export Data": function(viz) { viz.showExportDataDialog(); },
    "Revert All": function(viz) { viz.getWorkbook().revertAllAsync(); },
    "Download": function(viz) { viz.showDownloadWorkbookDialog(); },
  };
}

function populate_actionmenu(viz) {
  let ul = $("ul#actionmenu");
  ul.empty();
  $.each(get_actionlist(), function(label, action) {
    let button =
      $("<button>" + label + "</button>")
      .on("click", () => { action(viz); })
      .appendTo(ul)
      .wrap("<li/>");
  });
}

function load_viz(view) {
  try {
    const server = view.server;
    let containerDiv = document.getElementById('content');
    const baseUrl = server.baseUrl.replace('http:', '').replace('https:', '');

    // let url = `http:${baseUrl}/views/${view.url}`;
    // let url = `http:${baseUrl}/t/PerformingArts/views/${view.url}`;
    // if (server.contentUrl) {
    //   url = `http:${baseUrl}/t/${server.siteContentUrl}/views/${view.url}`;
    // }

    // hard-coding site -> TODO remove this
    let url = `http:${baseUrl}/t/PerformingArts/views/${view.url}`;

    return new Promise((done, err) => {
      try {
        const options = {hideTabs: true, onFirstInteractive: (e) => done(e), hideToolbar: true};
        let viz = new tableau.Viz(containerDiv, url, options);
      } catch (e) { console.log(e); err(e); }
  });
  } catch (err) {
    return Promise.reject(err);
  }
}

function create_thumbnail(data) {
  console.dir(data);
  const img = `<img src="${data.imageUrl}" alt="${data.view.name} class="img-responsive"> `;
  const tag = `<a href="#" class="viewLink" data-viewname="${data.view.name}">${img}</a>`;
  return $(tag);
}

function set_view(workbook, element) {
  const viewname = element.dataset.viewname;
  console.dir(element.dataset);
  history.pushState({viewname: viewname}, "", `#${viewname}`);
  switch_view(workbook, viewname);
}

function switch_view(workbook, viewname) {
  try {
    workbook.activateSheetAsync(viewname);
  } catch (err) {
    console.log(viewname, err);
  }
}

function handle_state(viewname, workbook) {
  if (viewname !== undefined) {
    switch_view(workbook, viewname);
  }
}

function populate_view_thumbnails(views) {
  let thumbnailContainer = $('#thumbnailContainer');
  const thumbnails = views.map(create_thumbnail);
  thumbnails.map((x) => thumbnailContainer.append(x));
}

function show_workbook(username, password, server_url, siteName) {
  const workbook_id = location.search.substring(1, location.search.length); // Remove the opening '?'
  const auth = TableauServerClient.Auth(username, password, siteName);
  TableauServerClient.sign_in(server_url, auth).then((server) => {
    return server.workbook(workbook_id).populate();
  }).then((value) => {
    return value.views.then((value) => {
      const firstView = value[0];
      let promises = value.map((x) => x.previewImage);
      promises.push(load_viz(firstView));

      return Promise.all(promises);
    });
  }).then((values) => {
    const viewImages = values.filter((x) => x !== undefined && x.imageUrl !== undefined);
    const vizEvent = values.filter((x) => x !== undefined && x.getEventName)[0];
    const viz = vizEvent.getViz();
    const workbook = viz.getWorkbook();
    const stateObj = history.state || {};
    const initialSheet = stateObj.viewname || location.hash.substring(1, location.hash.length);
    if (initialSheet) {
      handle_state(initialSheet, workbook);
    }
    populate_view_thumbnails(viewImages);
    $('.viewLink').on('click', (evt) => {
      evt.preventDefault();
      set_view(workbook, evt.currentTarget);
    });
    window.onpopstate = (evt) => {
      handle_state(evt.state.viewname, workbook);
    };

    populate_actionmenu(viz);

  }).catch((err) => console.dir(err));
}
$(document).ready(() => {
  // Clone our header and footer content into the page
	$("#header").load("-header.html");
	$("#footer").load("-footer.html");
  
  if (window.AppConfig.cors) {
    TableauServerClient.set_cors_proxy(window.AppConfig.cors.ip, window.AppConfig.cors.port);
  }
  try {
    show_workbook(window.AppConfig.username, window.AppConfig.password,
      window.AppConfig.server_url, window.AppConfig.site_name);
  } catch (err) {
    console.log('ERRR!');
    console.dir(err);
  }
});
