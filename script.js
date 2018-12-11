var address;

$('form').on('click', function (event) {
    address = $(event.target).text();
});

function filmCase(result) {
    $(result.results).each(function (index, element) {
        var wrapper = $('<div class="wrapper"></div>');
        wrapper.append(
            $('<h1>' + element.title + '</h1>' +
                '<h2>' + 'Episode: ' + element.episode_id + '</h2>' +
                '<p>' + 'Director: ' + element.director + '</p>' +
                '<p>' + 'Producer: ' + element.producer + '</p>' +
                '<p>' + 'Releaze Date: ' + element.release_date + '</p>' +
                '<p class = "description">' + element.opening_crawl + '</p>'+
            '<form><button>Characters</button></form>')
        );
        // $(element.characters).each(function (i, item) {
        //     console.log(item);
        // });

        $('.star-wars').append(wrapper);
    });
}

function peopleCase(result) {
    $(result.results).each(function (index, element) {
        var wrapper = $('<div class="wrapper"></div>');
        wrapper.append(
            $('<h1>' + element.name + '</h1>' +
                '<p>' + 'Gender: ' + element.gender + '</p>' +
                '<p>' + 'Birth Year: ' + element.birth_year + '</p>' +
                '<p>' + 'Height: ' + element.height + '</p>' +
                '<p>' + 'Mass: ' + element.mass + '</p>'+
                '<p>' + 'Skin Color: ' + element.skin_color + '</p>'+
                '<p>' + 'Hair Color: ' + element.hair_color + '</p>'+
                '<p>' + 'Eye Color: ' + element.eye_color + '</p>'+
                '<p>' + 'Homeworld: - '+ '</p>')
        );
        $('.star-wars').append(wrapper);
    });
}


$('form').on('submit', function (event) {
    event.preventDefault();

    $.ajax('https://swapi.co/api/' + address + '/', {
        dataType: 'json',
        beforeSend: function () {
            $('.star-wars').children().remove();
            $('.main-info').addClass('loading');
            $('.star-wars').hide();
            $('.loader').show();
        },

        success: function (result) {
            $('.star-wars').children().remove();
            switch (address) {
                case 'films' :
                    filmCase(result);
                    break;
                case 'people' :
                    peopleCase(result);
                    break;
            }

        },
        complete: function () {
            $('.main-info').removeClass('loading');
            $('.star-wars').show();
            $('.loader').hide();
        },
    });
});