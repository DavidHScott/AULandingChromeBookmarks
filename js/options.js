/* with help from https://stackoverflow.com/questions/10943544/how-to-parse-an-rss-feed-using-javascript  and https://www.htmlgoodies.com/beyond/javascript/stips/displaying-feed-content-using-jquery.html 
 */
document.body.onload = function () {
    chrome.storage.sync.get("user", function (result) {
        document.querySelector("#username").value = result.user;
        landinguser = result.user;

    });
       chrome.storage.sync.get("guid", function (result) {
        document.querySelector("#uid").value = result.guid;
        landinguser = result.guid;

    }); 
};

//var landinguser;


$.get("https://landing.athabascau.ca/bookmarks/owner/" + landinguser + "?view=rss&bmfolder_guid=0", function (data) {
    var $XML = $(data);
    $XML.find("item").each(function () {
        var $this = $(this),
            item = {
                title: $this.find("title").text(),
                description: $this.find("description").text(),
                link: $this.find("link").text(),
            };
        $('#rss-feed').append('<h5>' +
            '<a href="' +
            item.link +
            '">' +
            item.title +
            '</a>' +
            '</h5>' +
            '<p>' +
            item.description +
            '</p>'
        );


    });
});



/*
had issues with namespaces. found answer here: https://www.daniweb.com/programming/web-development/threads/451799/xml-parsing-with-namespaces
*/

/* FUTURE: Show all groups (?limit=100) and add select checkboxes */
/* FUTURE: Save group selection in chrome.storage.sync */

$.get("https://landing.athabascau.ca/groups/member/" + landinguser + "?view=rss", function (data) {
    var $XML = $(data);
    $XML.find("item").each(function () {
        var $this = $(this),
            item = {
                title: $this.find("title").text(),
                groupid: $this.find("link").text().split("/")[5],
                prof: $this.find('dc\\:creator').text(),
            };


        $('#courselist tbody').append($('<tr id=' + item.groupid + '/>'));


        $('#courselist tbody tr#' + item.groupid).append($('<td/>').text(item.groupid));
        $('#courselist tbody tr#' + item.groupid).append($('<td/>').text(item.title));
        $('#courselist tbody tr#' + item.groupid).append($('<td/>').text(item.prof));



    });
});

const SUBMIT = document.querySelector("#submit");
const GUID = document.querySelector("#guid");

document.querySelector("#submit").onclick = function (e) {
    var d = document.querySelector("#username").value;
    chrome.storage.sync.set({
        "user": d
    }, function () {
        alert("Username is set to " + d);
        window.location.reload(true);

    });
    e.preventDefault();
}

document.querySelector("#guid").onclick = function (e) {
    var g = document.querySelector("#uid").value;
    chrome.storage.sync.set({
        "guid": g
    }, function () {
        alert("guid is set to " + g);
        window.location.reload(true);

    });
    e.preventDefault();
}
