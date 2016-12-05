//This files contains most of the logic for tableau viz and d3 viz integration
var tableauViz, worksheet, networkDiagram, getDataOptions;
var initialFestival = null;

function initTableauViz() {
    var containerDiv = document.getElementById("vizContainer"),
        url = "http://tc-tabsrv-01/t/PerformingArts/views/ArtistFinder/TrackAudioFeatures?:embed=y&:showShareOptions=true&:display_count=no&:showVizHome=no",
        options = {
            hideTabs: true,
            hideToolbar: true,
            allowFullScreen: false,
            onFirstInteractive: function () {
                worksheet = viz.getWorkbook().getActiveSheet();
                //Ideally we would want an option to ignore filters when using Get Data.
                //This is a work around, we get the filters store them, clear filters to get the full Data-set
                // And reply the filter afterwards
                worksheet.getFiltersAsync().then(function(filters){
                    if (filters !== null && filters !== undefined &&
                        filters[0].getAppliedValues().length === 1) {
                        initialFestival = filters[0].getAppliedValues()[0].value;
                    }
                    return worksheet.clearFilterAsync('Festival');
                }).then(getDataAndConstructGraph);

                viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, handleSelectionEvent);
                viz.addEventListener(tableau.TableauEventName.FILTER_CHANGE, handleFilterEvent);
            }
        };

    viz = new tableau.Viz(containerDiv, url, options);
}

//Uses the Get Data API to extract Data from Viz, parse Data and Construct D3 Diagram
function getDataAndConstructGraph() {
    getDataOptions = {
    	maxRows: 0,
    	ignoreAliases: false,
    	ignoreSelection: true,
    	includeAllColumns: true
    };
    worksheet.getUnderlyingDataAsync(getDataOptions).then(function(dataTable){
            if (initialFestival !== null) {
                worksheet.applyFilterAsync('Festival', initialFestival, tableau.FilterUpdateType.REPLACE);
            }
            constructGraph(parseTableauData(dataTable));
    }, function(error) {console.log(error);});
}

//Set up the d3 diagram
function constructGraph(data) {
	var defaultLinkField = "Danceability";
	var graphContainer = d3.select('#graph');
	var notesContainer = d3.select('#notes')
		.style({
			'width': 140 + 'px',
			'height': 600 + 'px'
		});
	networkDiagram = new NetworkDiagram(data, graphContainer, notesContainer);
}

//Parse the Data into the format expected
function parseTableauData(dataTable) {
    var columns = dataTable.getColumns();
    var data = dataTable.getData();
    var fieldNamesNeeded = ["Festival", "Artist Name", "PAUAffiliate?", "Track Preview URL",
                            "Album Name", "Album Image URL"];
    var fieldNamesRetrieved = [];
    var fieldNamesIndexMap = {};
    columns.forEach(function(column) {
        if (fieldNamesNeeded.includes(column.getFieldName())) {
            fieldNamesIndexMap[column.getFieldName()] = column.getIndex();
            fieldNamesRetrieved.push(column.getFieldName());
        }
    });

    var fieldNamesNotRetrieved = _.difference(fieldNamesNeeded, fieldNamesRetrieved);
    if (fieldNamesNotRetrieved.length > 0) {
        console.error("The following field names are missing: " + fieldNamesNotRetrieved);
        console.log("Is the underlying data schema modified?");
    }

    var artistsMap = {};
    data.forEach(function(rowEntry) {
        var artistName = rowEntry[fieldNamesIndexMap["Artist Name"]].value;
        var affliated = rowEntry[fieldNamesIndexMap["PAUAffiliate?"]].value;
        var festival = rowEntry[fieldNamesIndexMap["Festival"]].value;
        var trackPreviewUrl = rowEntry[fieldNamesIndexMap["Track Preview URL"]].value;
        var trackAlbum = rowEntry[fieldNamesIndexMap["Album Name"]].value;
        var imageURL = rowEntry[fieldNamesIndexMap["Album Image URL"]].value;
        var festivalInfo = {};
        festivalInfo.trackPreviewUrl = trackPreviewUrl;
        festivalInfo.trackAlbum = trackAlbum;
        festivalInfo.imageUrl = imageURL;

        var artistNode;
        if (artistName in artistsMap) {
            artistNode = artistsMap[artistName];
            if (!artistNode.festivals.includes(festival)) {
                artistNode.festivals.push(festival);
                artistNode.festivalInfoMap[festival] = festivalInfo;
            }
        } else {
            festivalInfoMap = {};
            festivalInfoMap[festival] = festivalInfo;
            artistNode = {
                name : artistName,
                affliated : (affliated === "Yes"),
                festivals : [festival],
                festivalInfoMap : festivalInfoMap
            }
            artistsMap[artistName] = artistNode;
        }
    });

    var artists = [];
    for (var artistName in artistsMap) {
        artists.push(artistsMap[artistName]);
    }
    return artists;
}

//tableau event handlers
//Update the network with selected artist and current festival.
function handleSelectionEvent(selectionEvent) {
    selectionEvent.getMarksAsync().then(function(marks) {
        var pairs = marks[0].getPairs();
        var artistName;
        pairs.forEach(function(pair) {
            if (pair.fieldName === "Artist Name") {
                artistName = pair.value;
            }
        });

        //For artists that have attended multiple festivals, we want to match the sound track to the festival
        worksheet.getFiltersAsync().then(function (filters) {
            try {
             if (filters !== undefined && filters !== null && filters[0].getAppliedValues().length === 1) {
                var currFestival = filters[0].getAppliedValues()[0].value;
                networkDiagram.renderNetWork(artistName, currFestival);
             } else {
                networkDiagram.renderNetWork(artistName);
             }
            } catch (err) { console.dir(err); }
        });
    });
}

//Clear the D3 Diagram whenever filter is changed
function handleFilterEvent(filterEvent) {
    $('#graph').empty();
    $('#notes').empty();
}