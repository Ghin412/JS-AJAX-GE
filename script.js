// AJAX using JavaScript
function loadText () {
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if(req.readyState == 4 && req.status == 200) {
            document.getElementById('textLoader').innerHTML = req.responseText;
            result = req.responseText;
            console.log(result);
        }
    };
    req.open("GET", "loadJS.txt", true);
    req.send();
}

//AJAX using jQuery

$(document).ready(function () {
    $("#buttonLoadTwo").click(function () {
        $("#imageLoader").load("loadJS.txt");
    });
});

