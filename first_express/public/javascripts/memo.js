const get = (query) => document.querySelector(query);
const getAll = (query) => document.querySelectorAll(query);

function main() {
    var data;

    var init = function () {
        getMemo();
        get('#submit').addEventListener('click', postMemo);
    }

    var getMemo = function () {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './memo/list');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = JSON.parse(xhr.responseText);
                render();
            }
        }
        xhr.send();
    }

    var render = function () {
        if (data == undefined) {
            console.log('Failed to render' + data);
        }

        var container = get('#memos');
        var content = '';

        data.forEach(elem => {
            content += `
                <div>
                    <h6>${elem.author} / ${elem.date}</h6>
                    <p>${elem.content}</p>
                    <button class='delete-btn'>삭제</button>
                </div>
                <hr>
            `;
        });

        container.innerHTML = content;
        bindDelete();
    }

    var bindDelete = function() {
        var btnList = getAll('.delete-btn');
        btnList.forEach((btn, idx) => {
            // closure
            var _id = data[idx]._id;
            btn.addEventListener('click', () => {
                deleteMemo(_id);
            });
        });
    }

    var deleteMemo = function (_id) {
        var url = `./memo/${_id}`;
        var xhr = new XMLHttpRequest();
        xhr.open('DELETE', url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText);
                if (res.success) {
                    getMemo();
                } else {
                    console.log('Internal Error');
                    console.log(xhr.responseText);
                }
            }
        }
        xhr.send();
    }

    var postMemo = function () {
        var formData = new FormData(get('#ajax-form'));
        var object = {};
        formData.forEach((value, key) => object[key] = value);
        var json = JSON.stringify(object);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', './memo');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText);
                if (res.success) {
                    getMemo();
                } else {
                    console.log('Internal Error');
                    console.log(xhr.responseText);
                }
            }
        }
        xhr.send(json);

        getAll("input[type='text']").forEach(elem => elem.value = '');
    }

    init();
}

window.onload = main;