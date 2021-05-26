var get = function(query){return document.querySelector(query);}
var getAll = function(query){return document.querySelectorAll(query);}

const signInURL = './users/auth';
const signUpURL = './users/new';

const app = {
    form: {
        action: signInURL,
        data: {}
    },
    init: function() {
        app.bindEventListeners();
    },
    bindEventListeners: function() {
        get('#to-signin').addEventListener('click', (event) => app.toggleFormAction(event.target, signInURL));
        get('#to-signup').addEventListener('click', (event) => app.toggleFormAction(event.target, signUpURL));

        get("#submit-btn").addEventListener('click', () => {
            var object = {};
            new FormData(get('form')).forEach((value, key) => object[key] = value);
            app.form.data = JSON.stringify(object);
            switch (app.form.action){
                case signInURL:
                    app.handleSignIn();
                    break;
                case signUpURL:
                    app.handleSignUp();
                    break;
                default:
                    console.error('formAction is empty');
            }
        });
    },
    toggleFormAction: function(activeBtn, URL) {
        app.form.action = URL;
        getAll('.nav-link').forEach(elem => elem.classList.remove('active'));
        activeBtn.classList.add('active');
    },
    handleSignUp: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', app.form.action);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            var isReady = (xhr.readyState == 4);
            if(isReady) {
                console.log(xhr.responseText);
                var res = JSON.parse(xhr.responseText);
                alert(res.message);
            }
        }
        xhr.send(app.form.data);
    },
    handleSignIn: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', app.form.action);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            var isReady = (xhr.readyState == 4);
            if(isReady) {
                var res = JSON.parse(xhr.responseText);
                alert(res.message);
                if(xhr.status == 200) {
                    deleteCookie('a_token');
                    setCookie('a_token', res.token, 7);
                    window.location.href = './home';
                }
            }
        }
        xhr.send(app.form.data);
    }
}

app.init();