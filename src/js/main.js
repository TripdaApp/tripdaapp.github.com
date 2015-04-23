jQuery(document).ready(function($) {
    $.get('https://api.github.com/orgs/tripdaapp/repos', function(data) {
        console.log("Repos", data);
    });

    $.get('https://api.github.com/orgs/tripdaapp/public_members', function(data) {
        console.log("Members", data);
    });
});