var points = null;
var q_count = 5;
var q_number = null;
var rand_opt = null;

var countries = null;
var c_count = null

function readData(){
    var Connect = new XMLHttpRequest();
    Connect.open("GET", "resources/data.xml", false);
    Connect.setRequestHeader("Content-Type", "text/xml");
    Connect.send(null);
    var xml = Connect.responseXML;
    countries = xml.childNodes[0];
    c_count = countries.getElementsByTagName("country").length;
}

function startTest(){

    readData();

    points = 0;
    q_number = 0;

    document.getElementById("q_form").hidden = false;
    document.getElementById("next_button").hidden = false;
    document.getElementById("country").hidden = false;
    document.getElementById("question").hidden = false;
    document.getElementById("start_button").hidden = true;
    document.getElementById("summary").hidden = true;
    document.getElementById("opt1r").checked = false;
    document.getElementById("opt2r").checked = false;
    document.getElementById("opt3r").checked = false;

    getQuestion();
}

function submitAnswer(){

    q_number = q_number + 1;

    if (document.getElementById("opt" + rand_opt + "r").checked) {
        points = points + 1;
    }

    if(q_number==q_count){

        document.getElementById("q_form").hidden = true;
        document.getElementById("next_button").hidden = true;
        document.getElementById("country").hidden = true;
        document.getElementById("question").hidden = true;
        document.getElementById("start_button").hidden = false;
        document.getElementById("summary").hidden = false;
        document.getElementById("summary").innerHTML = "Koniec testu!</br>Twój wynik: " + points + " / " + q_count;

    } else {

        document.getElementById("opt1r").checked = false;
        document.getElementById("opt2r").checked = false;
        document.getElementById("opt3r").checked = false;
        getQuestion();
    }
}

function getQuestion(){

    var rand_country = Math.floor(Math.random() * c_count);
    var country = countries.children[rand_country];
    var name = country.getElementsByTagName("name")[0].textContent.toString();
    var capital = country.getElementsByTagName("capital")[0].textContent.toString();
    var currency = country.getElementsByTagName("currency")[0].textContent.toString();
    document.getElementById("country").innerHTML = "Kraj: " + name;

    var rand_question = Math.floor(Math.random() * 2);
    var question = null;
    var q_label = null;

    if(rand_question==1){
        question = "capital";
        q_label  = "Jaka jest stolica tego kraju?"
    } else {
        question = "currency";
        q_label  = "Jaka jest waluta tego kraju?"
    }

    document.getElementById("question").innerHTML = q_label;

    rand_country = Math.floor(Math.random() * c_count);
    document.getElementById("opt1").innerHTML
        = countries.children[rand_country].getElementsByTagName(question)[0].textContent.toString();
    rand_country = Math.floor(Math.random() * c_count);
    document.getElementById("opt2").innerHTML
        = countries.children[rand_country].getElementsByTagName(question)[0].textContent.toString();
    rand_country = Math.floor(Math.random() * c_count);
    document.getElementById("opt3").innerHTML
        = countries.children[rand_country].getElementsByTagName(question)[0].textContent.toString();

    rand_opt = Math.floor((Math.random() * 3) + 1);
    document.getElementById("opt" + rand_opt).innerHTML
        = country.getElementsByTagName(question)[0].textContent.toString();
}