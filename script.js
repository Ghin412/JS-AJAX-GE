// AJAX load text using JavaScript
function loadText() {
    //XMLHttpRequest object
    let req = new XMLHttpRequest();

    //Loading "Getting" a file from server, in this example just local file
    req.open("GET", "loadJS.txt", true);

    //Ckecking state and status
    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            //Process response
            document.getElementById('textLoader').innerHTML = req.responseText;
        }
    };
    //Sending request to the server
    req.send();
}

//AJAX load text using jQuery

$(document).ready(function () {
    $("#buttonLoadTwo").click(function () {
        $("#jQLoader").load("loadJS.txt");
    });
});

//AJAX load text using fetch

function loadTextFetch() {
    // ES5
    // fetch('loadJS.txt')
    // .then(function(res) {
    //     return res.text();
    // })
    // .then(function(data) {
    //     console.log(data);
    // })

    //ES6 with arrow functions
    fetch('loadJS.txt')
        .then((res) => res.text())
        .then((data) => {
            document.getElementById('fetchOutput').innerHTML = data;
        })
        .catch((err) => console.log(err));
}

//AJAX load JSON using JavaScript

function loadJSON() {
    let req = new XMLHttpRequest();

    req.open('GET', 'loadJSON.json', true);

    req.onreadystatechange = () => {
        if (req.readyState == 4 && req.status == 200) {
            document.getElementById('JSONLoader').innerHTML = req.responseText;
            responseObject = JSON.parse(req.responseText);
            let html = `
                <table class='table'>
                    <tr><th scope='col'> # </th> 
                    <th scope='col'> Name </th>
                    <th scope='col'> Price </th>
                `
            for (let i = 0; i < responseObject["fruits"].length; i++) {
                html += `
                    <tr>
                        <th scope='row'> ${i} </th> 
                        <td scope='col'> ${responseObject.fruits[i].name} </td> 
                        <td> ${responseObject.fruits[i].price} </td>
                    <tr>
                    `
            }
            html += "</table>";
            document.getElementById('JSONLoader').innerHTML = html;
        }
    };

    req.send();
}

//AJAX load JSON using jQuery

$(document).ready(() => {
    $("#buttonLoadFive").click(function (event) {
        $.getJSON('loadJSON.json', function (data) {
            //Old way, table making error can occur
            /*$('#jqJSONLoader').html('<table id="newTable" class="table"><tr>' +
            '<th scope="col"> # </th>' +
            '<th scope="col"> Name </th>' +
            '<th scope="col"> Image </th></tr>')

            for (let i = 0; i < data.fruits.length; i++) {
                $('#newTable tr:last').after('<tr><td>' + i + '</td>');
                $('#newTable td:last').after('<td>' + data.fruits[i].name + '</td>');
                $('#newTable td:last').after('<td>' + data.fruits[i].image + '</td></tr>');
            }
            $('#newTable tr:last').after('</table>')

            console.log($('#jqJSONLoader'));*/

            //New and better way, with chances of table making error occurring are slim to none
            let defaultColumns = ["#", "Name", "Image"];
            let rows = [];
            let $container = $("#jqJSONLoader");
            let $table = $("<table />", {
                id: "newTable",
                class: "table"
            });
            let $header = $("<tr />");
            let columns = $.map(defaultColumns, function (col) {
                let $th = $("<th />", {
                    scope: "col"
                });
                $th.html(col);
                return $th;
            });

            for (let i = 0, length = data.fruits.length; i < length; i++) {
                let $tr = $("<tr />");
                $tr.append([
                    $("<td />").text(i),
                    $("<td />").text(data.fruits[i].name),
                    $("<td />").text(data.fruits[i].image)
                ]);
                rows.push($tr);
            }

            $header.append(columns);
            $table.append(columns, rows);
            $container.append($table);
        });
    });
});

//AJAX load JSON using fetch

function loadJSONFetch() {
    fetch('loadJSON.json')
        .then((res) => res.json())
        .then((data) => {
            let output = `
            <table class="table"><tr>
                <th scope="col"> # </th>
                <th scope="col"> Name </th>
                <th scope="col"> Price </th> 
                <th scope="col"> Image </th></tr>
        `
            console.log(data.fruits.length);
            for (let i = 0; i < data.fruits.length; i++) {
                output += `
                <tr>
                    <th scope="row"> ${i} </td>
                    <td> ${data.fruits[i].name} </td>
                    <td> ${data.fruits[i].price} </td>
                    <td> ${data.fruits[i].image} </td>
                </tr>
            `
            }
            document.getElementById('JSONFetch').innerHTML = output;
        })
        .catch((err) => console.log(err));
};
