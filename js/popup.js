var course = document.getElementById('courses');

if (course) {

    course.onclick = function (e) {
        var courseid = e.target.value;

        /*console.log("button clicked " + courseid);
        chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
       
        chrome.tabs.executeScript({
            active: true,
            lastFocusedWindow: true
        }, {
            file: courseid+ ".js"
        })
         */
        var coursefile= "js/" + courseid + ".js";
        console.log(coursefile);
        chrome.tabs.query({ active: true, lastFocusedWindow:true }, function (activeTabs) {
        activeTabs.map(function (tab) {
            chrome.tabs.executeScript(tab.id, { file: coursefile, allFrames: false });
        });
    });
    };

};
