var members = '<li>' +
            '<img src="#image" alt="#name" class="photo">' +
            '<a href="#link">@#name</a>' +
            '</li>';

var repos = '<li class="#language">' +
            '<h2>#title</h2>' +
            '<small>#language</small>' +
            '<p class="description">#description</p>' +
            '<a href="#link">View project</a>' +
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
        html = String(repos).replace('#title', data.name)
            .replace('#language', data.language)
            .replace('#description', data.description)
            .replace('#link', data.html_url)
            .replace('#language', data.language);
    }

    return html;
}


jQuery(document).ready(function($) {
    $.get('https://api.github.com/orgs/tripdaapp/repos', function(data) {
        var repos = parseCollection(data, 'repos');
        var list = $('#projects-list');
        list.append(repos);
        list.fadeIn(1000);
    });

    $.get('https://api.github.com/orgs/tripdaapp/public_members', function(data) {
        var members = parseCollection(data, 'members');
        var list = $('#team-list');
        list.append(members);
        list.fadeIn(1000);
    });
});