var members = '<li>' +
            '<img src="#image" alt="#name" class="photo">' +
            '<a href="#link">@#name</a>' +
            '</li>';

function parseCollection (collection, template) {
    if (!collection.length || !template) {
        return false;
    }

    var length = collection.length;
    var data = '';
    for (var i = 0; i < length; i++) {
        data += parseTemplate(collection[i], template);
    };

    return data;
}

function parseTemplate (data, template) {
    var html;
    if (template === 'members') {
        html = String(members).replace('#image', data.avatar_url)
            .replace('#name', data.login)
            .replace('#link', data.html_url)
            .replace('#name', data.login);
    }

    if (template === 'repos') {

    }

    return html;
}


jQuery(document).ready(function($) {
    $.get('https://api.github.com/orgs/tripdaapp/repos', function(data) {
        console.log("Repos", data);
    });

    $.get('https://api.github.com/orgs/tripdaapp/public_members', function(data) {
        var members = parseCollection(data, 'members');
        var list = $('#team-list');
        list.append(members);
        list.fadeIn(1000);
    });
});