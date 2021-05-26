const get = function(query){return document.querySelector(query);}
const getAll = function(query){return document.querySelectorAll(query);}

var postPerPage = 10;
const url = 'http://localhost:3000/post';
var debug;

const app = {
    sendRequest: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onreadystatechange = app.handleResponse;
        xhr.send();
    },
    handleResponse: function () {
        var xhr = this;
        var isReady = (xhr.readyState == 4);
        if(isReady) {
            var res = JSON.parse(xhr.responseText);
            if (xhr.status == 200) {
                console.log(res);
                app.renderPost(res);
            } else {
                console.log(xhr.responseText);
            }
        }
    },
    renderPost: function (postList) {
        var postContainer = get('#post-container');
        var buildPost = function(post) {
            var result = `
            <li class="list-group-item">
                <h6>${post.writer.name} ${post.created}</h6>
                <p class="lead">${post.content}</p>
            </li>
            `;
            return result;
        };
        debug = postList;
        postContainer.innerHTML = postList.reduce((acc, cur, idx) => {
            if (idx == 0) {
                return buildPost(cur);
            }
            return acc + buildPost(cur);
        }, '');
    },
    getPostData: function(pageNum) {

    },
    init: function() {
        app.sendRequest();
    }
};

app.init();