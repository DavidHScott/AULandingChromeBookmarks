
var coursesurl;

function getCourseUrl() {
    chrome.storage.sync.get("user", function (result) {
        landinguser = result.user;
        coursesurl = "https://landing.athabascau.ca/groups/member/" + landinguser + "?limit=15&view=rss";
        return coursesurl;
    });
};
coursesurl = getCourseUrl();

