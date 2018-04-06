let token;

const handleAdventurer = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#adventurerName").val() == '' || $("#adventurerAge").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
            
    sendAjax('POST', $("#adventurerForm").attr("action"), $("#adventurerForm").serialize(), function(){
        loadAdventurersFromServer(token);
    });
    
    return false;
};

const handleAgeUp = (e) => {
    e.preventDefault();
    
    console.dir(e.target);
    
    sendAjax('POST', e.target.action, $(e.target).serialize(), function(){
        loadAdventurersFromServer(token);
    });
}

const AdventurerForm = (props) => {
    return (
    <form id="adventurerForm" 
        onSubmit={handleAdventurer}
        name="adventurerForm"
        action="/maker"
        method="POST"
        className="adventurerForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="adventurerName" type="text" name="name" placeholder="Adventurer Name"/>
    <label htmlFor="age">Age: </label>
    <input id="adventurerAge" type="text" name="age" placeholder="Adventurer Age"/>
    <select id="adventurerClass" name="class">
         <option value="Barbarian">Barbarian</option>
         <option value="Monk">Monk</option>  
        <option value="Paladin">Paladin</option>  
        <option value="Rogue">Rogue</option>  
        <option value="Wizard">Wizard</option>  
    </select>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeAdventurerSubmit" type="submit" value="Make Adventurer" />
    </form>
    );
};

const AdventurerList = function(props) {
    if(props.adventurers.length === 0) {
        return (
            <div className="adventurerList">
                <h3 className="emptyAdventurer">No Adventurers yet</h3>
            </div>
        );
    }
    
    const adventurerNodes = props.adventurers.map(function(adventurer) {
        return (
            <div data-key={adventurer._id} className="adventurer">
                <img src="/assets/img/adventurerface.png" alt="adventurer face" className="adventurerFace" />
                <h3 className="adventurerName">Name: {adventurer.name}</h3>
                <h3 className="adventurerAge">Level: {adventurer.age}</h3>
                <h3 className="adventurerClass">Class: {adventurer.class}</h3>

                <form id="ageForm" 
                    onSubmit={handleAgeUp}
                    name="ageForm"
                    action="/age"
                    method="POST"
                    className="ageForm"
                >
                    <input type="hidden" name="_csrf" value={props.csrf}/>
                    <input id="adventurerNameCheck" name="_id" value={adventurer._id} placeholder="Adventurer Name"/>
                    <input className="ageButton" type="submit" value="Level Up"/>
                </form>
            </div>
        );
    });
    
    return (
    <div className="adventurerList">
        {adventurerNodes}
    </div>
    );
};

const loadAdventurersFromServer = (csrf) => {
    sendAjax('GET', '/getAdventurers', null, (data) => {
        ReactDOM.render(
            <AdventurerList adventurers={data.adventurer} csrf={csrf} />, document.querySelector("#adventurers")
        );
    });
};

const setup = function(csrf) {
    token = csrf;
    
    ReactDOM.render(
        <AdventurerForm csrf={csrf} />, document.querySelector("#makeAdventurer")
    );
    
    ReactDOM.render(
        <AdventurerList adventurers={[]} csrf={csrf}/>, document.querySelector("#adventurers")
    );
    
    loadAdventurersFromServer(token);    
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});