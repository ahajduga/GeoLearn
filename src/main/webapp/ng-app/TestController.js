var points = null;
var q_count = 5;
var q_number = null;
var question;
var rand_opt = null;

var countries = null;
var c_count = null;
var name;

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

    document.getElementById("q_box").hidden = false;
    document.getElementById("q_form").hidden = false;
    document.getElementById("next_button").hidden = false;
    document.getElementById("country").hidden = false;
    document.getElementById("question").hidden = false;
    document.getElementById("start_button").hidden = true;
    document.getElementById("flag").hidden = true;
    document.getElementById("photo").hidden = true;
    document.getElementById("summary").hidden = true;
    document.getElementById("opt1r").checked = false;
    document.getElementById("opt2r").checked = false;
    document.getElementById("opt3r").checked = false;

    getQuestion();
}

function submitAnswer(){

    q_number = q_number + 1;

    if(question == "capital" || question == "currency") {
        if (document.getElementById("opt" + rand_opt + "r").checked) {
            points = points + 1;
        }
        deselectCountry(name);
    } else if(question == "flag" || question == "photo") {
        if(answerResult){
            points = points + 1;
        }
    }

    if(q_number==q_count){

        document.getElementById("q_form").hidden = true;
        document.getElementById("next_button").hidden = true;
        document.getElementById("question").hidden = true;
        document.getElementById("flag").hidden = true;
        document.getElementById("photo").hidden = true;
        document.getElementById("start_button").hidden = false;
        document.getElementById("summary").hidden = false;
        document.getElementById("summary").innerHTML = "Koniec testu!</br>Twój wynik: " + points + " / " + q_count;
        document.getElementById("country").innerHTML = "Podsumowanie";

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
    name = country.getElementsByTagName("name")[0].textContent.toString();
    var capital = country.getElementsByTagName("capital")[0].textContent.toString();
    var currency = country.getElementsByTagName("currency")[0].textContent.toString();
    document.getElementById("country").innerHTML = "Kraj: " + name;

    var rand_question = Math.floor(Math.random() * 4);
    question = null;
    var q_label = null;

    if(rand_question==1){
        question = "capital";
        q_label  = "Jaka jest stolica tego kraju?"
    } else if(rand_question==2){
        question = "flag";
        q_label  = "Wskaż na mapie kraj posiadający flagę:"
    } else if(rand_question==3){
        question = "photo";
        q_label  = "Wskaż na mapie kraj z poniższej fotografii:"
    } else {
        question = "currency";
        q_label  = "Jaka jest waluta tego kraju?"
    }

    document.getElementById("question").innerHTML = q_label;

    if(question == "capital" || question == "currency"){

        document.getElementById("country").hidden = false;
        document.getElementById("q_form").hidden = false;
        document.getElementById("flag").hidden = true;
        document.getElementById("photo").hidden = true;

        var answer = country.getElementsByTagName(question)[0].textContent.toString();
        var temp = answer;

        rand_country = Math.floor(Math.random() * c_count);
        while(temp == answer){
            rand_country = Math.floor(Math.random() * c_count);
            temp = countries.children[rand_country].getElementsByTagName(question)[0].textContent.toString();
        }
        var answer1 = temp;
        document.getElementById("opt1").innerHTML = temp;

        rand_country = Math.floor(Math.random() * c_count);
        while(temp == answer || temp == answer1){
            rand_country = Math.floor(Math.random() * c_count);
            temp = countries.children[rand_country].getElementsByTagName(question)[0].textContent.toString();
        }
        var answer2 = temp;
        document.getElementById("opt2").innerHTML = temp;

        rand_country = Math.floor(Math.random() * c_count);
        while(temp == answer || temp == answer1 || temp == answer2){
            rand_country = Math.floor(Math.random() * c_count);
            temp = countries.children[rand_country].getElementsByTagName(question)[0].textContent.toString();
        }
        document.getElementById("opt3").innerHTML = temp;

        rand_opt = Math.floor((Math.random() * 3) + 1);
        document.getElementById("opt" + rand_opt).innerHTML = answer;

        selectCountry(name);

    } else if(question == "flag"){

        correctAnswer = name;

        document.getElementById("country").innerHTML = "Flaga";
        document.getElementById("q_form").hidden = true;
        document.getElementById("photo").hidden = true;
        document.getElementById("flag").hidden = false;

        document.getElementById("flag_country").setAttribute("class", "phoca-flag " + name);

    } else if(question == "photo"){

        correctAnswer = name;

        document.getElementById("country").innerHTML = "Fotografia";
        document.getElementById("q_form").hidden = true;
        document.getElementById("flag").hidden = true;
        document.getElementById("photo").hidden = false;

        var rand_photo = Math.floor((Math.random() * 4) + 1);
        document.getElementById("photo").setAttribute("src", "map/countries/" + name + "/photo" + rand_photo + ".jpg");
    }
}