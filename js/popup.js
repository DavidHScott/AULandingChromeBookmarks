/* FIXME: getting the courses to load is spotty and slow. Find a fix. */

document.body.onload = function () {
    chrome.storage.sync.get("user", function (result) {
        landinguser = result.user;
        coursesurl = "https://landing.athabascau.ca/groups/member/" + landinguser + "?view=rss";
    });
};

$.get(coursesurl, function (data) {
    var $XML = $(data);
    $XML.find("item").each(function () {
        var $this = $(this),
            item = {
                title: $this.find("title").text(),
                groupid: $this.find("link").text().split("/")[5],

            };

        $('#courses').append($('<button value=' + item.groupid + '/>').text(item.title));




    });
});


var course = document.getElementById('courses');

if (course) {

    course.onclick = function (e) {
        var courseid = e.target.value;

        chrome.tabs.query({
            'active': true,
            'lastFocusedWindow': true
        }, function (tabs) {
            var activetab = tabs[0].id;
            var pageurl = tabs[0].url;
            var pagetitle = tabs[0].title;
            var coursetarget = 'https://landing.athabascau.ca/bookmarks/add/' + courseid + '?address=' + pageurl + '&title=' + pagetitle;
            //console.log(coursetarget);
            chrome.tabs.create({
                url: coursetarget
            });
        });


    };

};
