var searchInput = $('.user-input').val().trim();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchInput + "&api-key=IfMcgXr3RfvsvakXz3vGIDxGP3FV9MVj";


function displayNews() {
    var searchInput = $('.user-input').val().trim();
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchInput + "&api-key=IfMcgXr3RfvsvakXz3vGIDxGP3FV9MVj";
}

function clearInput() {
    var userInput = $('.user-input');
    userInput = "";
}

$('.searchBtn').on('click', function(event) {
    event.preventDefault();

    var searchInput = $('.user-input').val().trim();
    console.log(searchInput);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $('#card-text').text(JSON.stringify(response));
    })

    displayNews();
    clearInput();
})

