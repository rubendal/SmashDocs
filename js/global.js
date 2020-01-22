function LoadPage(e) {
    var page = $(e).data('page');

    $.ajax({
        'url': `./pages/${page}.html`,
        'dataType': 'html',
        'success': function (data) {
            $('#content').html(data);
            $('html, body').animate({ scrollTop: 0 }, 1);
        },
        'cache': true,
        'headers': {
            'Cache-Control': 'max-age=600'
        }
    });
}

function GoToPage(page) {
    $.ajax({
        'url': `./pages/${page}.html`,
        'dataType': 'html',
        'success': function (data) {
            $('#content').html(data);
            $('html, body').animate({ scrollTop: 0 }, 1);
        },
        'cache': true,
        'headers': {
            'Cache-Control': 'max-age=600'
        }
    });
}

function ShowImage(e) {
    $('#imageViewer').attr('src', $(e).attr('src'));
    $('#imgViewer').css('display', 'block');
}

function HideImage(e) {
    $('#imgViewer').css('display', 'none');
}

function ShowSidebar() {
    $('#openSidebar').css('display', 'none');
    $('#closeSidebar').css('display', 'block');

    $('#sidebarContent').css('display', 'block');

    $('#sidebar').css('width', "140px");
    $('#content').css('margin-left', "140px");
}

function CollapseSidebar() {
    $('#openSidebar').css('display', 'block');
    $('#closeSidebar').css('display', 'none');

    $('#sidebarContent').css('display', 'none');

    $('#sidebar').css('width', "40px");
    $('#content').css('margin-left', "40px");
}

var sidebarLinks = [];

class PageLink {
    constructor(page, name) {
        this.page = page;
        this.name = name;

        this.GetLink = function () {
            return `<a data-page="${this.page}" onclick="LoadPage(this)">${this.name}</a>`;
        }
    }
}