$(document).ready(function () {
  $(".searchBtn").on("click", function (event) {
    event.preventDefault();

    var dateStart = $("#from").val().trim();
    var dateEnd = $("#to").val().trim();

    console.log("this is the date start: ", dateStart);
    console.log("this is the date end: ", dateEnd);

    var startDate = moment(dateStart).format("YYYYMMDD");
    var endDate = moment(dateEnd).format("YYYYMMDD");

    if (dateStart === "" || dateEnd === "") {
      noDate();
    } else if (dateStart !== "" || dateEnd !== "") {
      withDate();
    }
  });

  function noDate() {
    var searchInput = $(".user-input").val().trim();
    var recordsNo = $("#records-number").val().trim();

    if (searchInput === "" || recordsNo === "") {
      $(".modal").modal("show");
      return;
    }

    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      searchInput +
      "&api-key=GHY8uw0sGJ4z9D1MzxegFasENQRvcsnt";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var theNews = [];
      theNews = response.response.docs;

      for (i = 0; i < recordsNo; i++) {
        var theMain = theNews[i].headline.main;
        var theAbstract = theNews[i].abstract;
        var pubDate = moment(theNews[i].pub_date).format("DD MMM YYYY");
        var webLink = theNews[i].web_url;
        var source = theNews[i].source;

        //   console.log("pub date:", pubDate);
        //   console.log("the source:", source);
        //   console.log("the weblink:", webLink);

        h5 = $("<h5>");
        h5.addClass("newsTitle");
        h5.text(theMain);

        abstract = $("<p>");
        published = $("<p>");
        link = $("<a>");

        abstract.addClass("newsText abstract");
        published.addClass("newsText published");
        link.addClass("newsText link");
        link.attr("href", webLink);

        abstract.text(theAbstract);
        published.text(pubDate);
        link.text("Read more");

        $("#card-body").append(h5);
        $("#card-body").append(abstract);
        $("#card-body").append(published);
        $("#card-body").append(link);
      }
    });

    $("#card-body").empty();
  }

  function withDate() {
    var searchInput = $(".user-input").val().trim();
    var recordsNo = $("#records-number").val().trim();

    if (searchInput === "" || recordsNo === "") {
      $(".modal").modal("show");
      return;
    }

    var dateStart = $("#from").val().trim();
    var dateEnd = $("#to").val().trim();

    var startDate = moment(dateStart).format("YYYYMMDD");
    var endDate = moment(dateEnd).format("YYYYMMDD");

    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      searchInput +
      "&facet_fields=source&facet=true&begin_date=" +
      startDate +
      "&end_date=" +
      endDate +
      "&api-key=GHY8uw0sGJ4z9D1MzxegFasENQRvcsnt";

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var theNews = [];
      theNews = response.response.docs;

      for (i = 0; i < recordsNo; i++) {
        var theMain = theNews[i].headline.main;
        var theAbstract = theNews[i].abstract;
        var pubDate = moment(theNews[i].pub_date).format("DD MMM YYYY");
        var webLink = theNews[i].web_url;
        var source = theNews[i].source;

        h5 = $("<h5>");
        h5.addClass("newsTitle");
        h5.text(theMain);

        abstract = $("<p>");
        published = $("<p>");
        link = $("<a>");

        abstract.addClass("newsText abstract");
        published.addClass("newsText published");
        link.addClass("newsText link");
        link.attr("href", webLink);

        abstract.text(theAbstract);
        published.text(pubDate);
        link.text("Read more");

        $("#card-body").append(h5);
        $("#card-body").append(abstract);
        $("#card-body").append(published);
        $("#card-body").append(link);
      }
    });

    $("#card-body").empty();
  }
});
