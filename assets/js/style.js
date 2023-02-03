$( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } );


// var searchInput = $('.user-input').val().trim();
//     var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchInput + "&api-key=IfMcgXr3RfvsvakXz3vGIDxGP3FV9MVj";

// function displayNews() {
//     var searchInput = $('.user-input').val().trim();
//     var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchInput + "&api-key=IfMcgXr3RfvsvakXz3vGIDxGP3FV9MVj";
// }

// function clearInput() {
//     var userInput = $('.user-input');
//     userInput = "";
// }



$('.searchBtn').on('click', function(event) {
    event.preventDefault();

    // var searchInput = $('.user-input').val().trim();
    // console.log('searchinput: ' + searchInput);

    var searchInput = $('.user-input').val().trim();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchInput + "&api-key=IfMcgXr3RfvsvakXz3vGIDxGP3FV9MVj";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log('headline: ' + response.response.docs[0].headline.main);
        // $('#card-text').text(JSON.stringify(response));

        var theNews = [];
        theNews = response.response.docs;
        // console.log('this is theNews: ' + JSON.stringify(theNews));

        var recordsNo = $('#records-number').val().trim();
        // console.log('Number of articles: ' + recordsNo);

        for (i = 0; i < recordsNo; i++) {
            var theMain = theNews[i].headline.main;
            var theAbstract = theNews[i].abstract;
            // var theImage = theNews[i].multimedia.url;

            // console.log(theMain);
            // console.log(theAbstract);

            h5 = $('<h5>');
            h5.attr("class=newsTitle");
            h5.text(theMain);

            p = $('<p>');
            p.attr("class=newsAbstract");
            p.text(theAbstract);

            // newsImage = $('<img>');
            // newsImage.attr('src', theNews[i].multimedia[3].url);

            $('#card-body').append(h5);
            $('#card-body').append(p);
            // $('#card-body').append(newsImage);

            if (searchInput === "" && recordsNo === "") {
                alert('Search term and number of records cannot be blank.')
                return;
            }

            
        }

    })

    $('#card-body').empty();
    // preventBlank();
   
})

// function preventBlank() {
//     if (searchInput === '' || recordsNo === '') {
//         alert('Search term and number of records cannot be blank.')
//         return;
//     }
// }