function create_link_to_workbook(workbookId) {
  return $(`<a href="workbook.html?${workbookId}"/>`);
}

function create_tags_element(tagList) {
  const tagListString = tagList.join(', ');
  return $(`<p> Tags: ${tagListString}</p><p></p>`);
}

export function build_element(workbook, previewImageUrl) {
  let retval = $('<div />');
  retval.addClass("col-md-4").addClass("faculty_grid");

  let figure = $('<figure />').addClass("team_member").addClass('viz'); // FIXME not a team member
  let img = $('<img />');
  img.addClass('img-responsive')
    .attr('alt', '').attr('src', previewImageUrl);

  let title = $('<h3 class="person-title"/>');
  title.text(workbook.name);

  let caption = $('<figcaption />');
  figure.append(img);
  figure.append('<div />');
  caption.append(title);
  caption.append(create_tags_element(workbook.tags));
  figure.append(caption);
  
  let titleLink = create_link_to_workbook(workbook.id);
  figure.wrapInner(titleLink);
  
  retval.append(figure);
  return retval;
}

export function create_rows(elements, size) {
  let retval = [];
  for(var i=0; i<elements.length; i+=size) {
    retval.push(elements.slice(i, i+size));
  }

  return retval;
}

function wrap_in_container(elements) {
  let container = $(document.createElement('div'));
  container.addClass('faculty_top');
  elements.map((x) => container.append(x));
  container.append($('<div class="clearfix"> </div>'));

  return container;
}

export function add_to_content(containers, element_name) {
  let content = $(document.getElementById(element_name));
  containers.map((x) => wrap_in_container(x)).map((x) => content.append(x));
}