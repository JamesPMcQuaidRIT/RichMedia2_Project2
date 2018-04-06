"use strict";

var token = void 0;

var handleAdventurer = function handleAdventurer(e) {
    e.preventDefault();

    $("#adventurerMessage").animate({ width: 'hide' }, 350);

    if ($("#adventurerName").val() == '' || $("#adventurerAge").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }

    sendAjax('POST', $("#adventurerForm").attr("action"), $("#adventurerForm").serialize(), function () {
        loadAdventurersFromServer(token);
    });

    return false;
};

var handleAgeUp = function handleAgeUp(e) {
    e.preventDefault();

    console.dir(e.target);

    sendAjax('POST', e.target.action, $(e.target).serialize(), function () {
        loadAdventurersFromServer(token);
    });
};

var AdventurerForm = function AdventurerForm(props) {
    return React.createElement(
        "form",
        { id: "adventurerForm",
            onSubmit: handleAdventurer,
            name: "adventurerForm",
            action: "/maker",
            method: "POST",
            className: "adventurerForm"
        },
        React.createElement(
            "label",
            { htmlFor: "name" },
            "Name: "
        ),
        React.createElement("input", { id: "adventurerName", type: "text", name: "name", placeholder: "Adventurer Name" }),
        React.createElement(
            "label",
            { htmlFor: "age" },
            "Age: "
        ),
        React.createElement("input", { id: "adventurerAge", type: "text", name: "age", placeholder: "Adventurer Age" }),
        React.createElement(
            "select",
            { id: "adventurerClass", name: "class" },
            React.createElement(
                "option",
                { value: "Barbarian" },
                "Barbarian"
            ),
            React.createElement(
                "option",
                { value: "Monk" },
                "Monk"
            ),
            React.createElement(
                "option",
                { value: "Paladin" },
                "Paladin"
            ),
            React.createElement(
                "option",
                { value: "Rogue" },
                "Rogue"
            ),
            React.createElement(
                "option",
                { value: "Wizard" },
                "Wizard"
            )
        ),
        React.createElement("input", { id: "csrfValue", type: "hidden", name: "_csrf", value: props.csrf }),
        React.createElement("input", { className: "makeAdventurerSubmit", type: "submit", value: "Make Adventurer" })
    );
};

var AdventurerList = function AdventurerList(props) {
    if (props.adventurers.length === 0) {
        return React.createElement(
            "div",
            { className: "adventurerList" },
            React.createElement(
                "h3",
                { className: "emptyAdventurer" },
                "No Adventurers yet"
            )
        );
    }

    var adventurerNodes = props.adventurers.map(function (adventurer) {
        return React.createElement(
            "div",
            { "data-key": adventurer._id, className: "adventurer" },
            React.createElement("img", { src: "/assets/img/adventurerface.png", alt: "adventurer face", className: "adventurerFace" }),
            React.createElement(
                "h3",
                { className: "adventurerName" },
                "Name: ",
                adventurer.name
            ),
            React.createElement(
                "h3",
                { className: "adventurerAge" },
                "Level: ",
                adventurer.age
            ),
            React.createElement(
                "h3",
                { className: "adventurerClass" },
                "Class: ",
                adventurer.class
            ),
            React.createElement(
                "form",
                { id: "ageForm",
                    onSubmit: handleAgeUp,
                    name: "ageForm",
                    action: "/age",
                    method: "POST",
                    className: "ageForm"
                },
                React.createElement("input", { type: "hidden", name: "_csrf", value: props.csrf }),
                React.createElement("input", { id: "adventurerNameCheck", name: "_id", value: adventurer._id, placeholder: "Adventurer Name" }),
                React.createElement("input", { className: "ageButton", type: "submit", value: "Level Up" })
            )
        );
    });

    return React.createElement(
        "div",
        { className: "adventurerList" },
        adventurerNodes
    );
};

var loadAdventurersFromServer = function loadAdventurersFromServer(csrf) {
    sendAjax('GET', '/getAdventurers', null, function (data) {
        ReactDOM.render(React.createElement(AdventurerList, { adventurers: data.adventurer, csrf: csrf }), document.querySelector("#adventurers"));
    });
};

var setup = function setup(csrf) {
    token = csrf;

    ReactDOM.render(React.createElement(AdventurerForm, { csrf: csrf }), document.querySelector("#makeAdventurer"));

    ReactDOM.render(React.createElement(AdventurerList, { adventurers: [], csrf: csrf }), document.querySelector("#adventurers"));

    loadAdventurersFromServer(token);
};

var getToken = function getToken() {
    sendAjax('GET', '/getToken', null, function (result) {
        setup(result.csrfToken);
    });
};

$(document).ready(function () {
    getToken();
});
"use strict";

var handleError = function handleError(message) {
    $("#errorMessage").text(message);
    $("#adventurerMessage").animate({ width: 'toggle' }, 350);
};

var redirect = function redirect(response) {
    $("#adventurerMessage").animate({ width: 'hide' }, 350);
    window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
    $.ajax({
        cache: false,
        type: type,
        url: action,
        data: data,
        dataType: "json",
        success: success,
        error: function error(xhr, status, _error) {
            var messageObj = JSON.parse(xhr.responseText);
            handleError(messageObj.error);
        }
    });
};
