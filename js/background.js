/*this file doesn't even get used when there's a popup. It's just here for legacy purposes */
var landinguser;
function findUser() {

    chrome.storage.sync.get("user", function (result) {
        return (result.user);
        landinguser = result.user;
    });
}


var coursesurl;

function getCourseUrl() {
    chrome.storage.sync.get("user", function (result) {
        landinguser = result.user;
        coursesurl = "https://landing.athabascau.ca/groups/member/" + landinguser + "?limit=15&view=rss";
        return coursesurl;
    });
};
coursesurl = getCourseUrl();


chrome.browserAction.onClicked.addListener(function (tab) {
   // alert('working?');
    findUser();
    landinguser = findUser();
    getCourseUrl()
    courseurl = getCourseUrl();
});
