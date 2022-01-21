setTimeout(() => {
    var link = window.location.pathname.replace(/\/[^\/]+\/manual/, '/###VERSION###/manual');
    // relative path to versions file
    var versionsPath = link.substr(0, link.indexOf('###VERSION###')) + 'versions.json';
    
    // generate the version links
    $.ajax({
        url: versionsPath,
        success: function (data) {
            if (data && data.versions) {
                var html = $('.rst-other-versions > dl > dt')[0].outerHTML;
    
    
                data.versions.forEach(function (ver) {
                    var parts = ver.split("|");
                    var version = parts.shift();
                    var path = (parts.length > 0) ? parts.shift() : version;
                    html += '<dd><a href="' + link.replace('###VERSION###', path) + '">' + version + '</a>';
                });
                $('.rst-other-versions > dl').html(html);
            }
        },
        dataType: 'json'
    });
}, 100);