let token;

const handleAdventurer = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#adventurerName").val() == '' || $("#adventurerAge").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
       
    console.dir($("#adventurerForm").serialize());
    
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

const handleSpell = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#spellName").val() == '' || $("#spellLevel").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
    
    console.dir($("#spellForm").serialize());
            
    sendAjax('POST', $("#spellForm").attr("action"), $("#spellForm").serialize(), function(){
        loadSpellsFromServer(token);
    });
    
    return false;
};

const handleWeapon = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#weaponName").val() == '' || $("#weaponType").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
    
    console.dir($("#weaponForm").serialize());
            
    sendAjax('POST', $("#weaponForm").attr("action"), $("#weaponForm").serialize(), function(){
        loadWeaponsFromServer(token);
    });
    
    return false;
};

const handlePassword = (e) => {
    e.preventDefault();
    
    $("#adventurerMessage").animate({width: 'hide'}, 350);
    
    if($("#pass").val() == '' || $("#pass2").val() == '') {
        handleError("Dear Adventurer, you must fill all fields");
        return false;
    }
        
    if($("#pass").val() !== $("#pass2").val()) {
        handleError("You passcodes do not match");
        return false;
    }    
    
    sendAjax('POST', $("#passwordForm").attr("action"), $("#passwordForm").serialize(), redirect);
    
    return false;
};

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
    <label htmlFor="age">Level: </label>
    <input id="adventurerAge" type="text" name="age" placeholder="Adventurer Level"/>
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
                <h3 className="empty">No Adventurers yet</h3>
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
                    <input id="adventurerNameCheck" name="_id" type="hidden" value={adventurer._id} placeholder="Adventurer Name"/>
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
            <AdventurerList adventurers={data.adventurer} csrf={csrf} />, document.querySelector("#data")
        );
    });
};

const createAdventurerWindow = (csrf) => {
    ReactDOM.render(
        <AdventurerForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <AdventurerList adventurers={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadAdventurersFromServer(csrf);
}

const SpellForm = (props) => {
    return (
    <form id="spellForm" 
        onSubmit={handleSpell}
        name="spellForm"
        action="/spellMaker"
        method="POST"
        className="spellForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="spellName" type="text" name="name" placeholder="Spell Name"/>
    <label htmlFor="level">Level: </label>
    <input id="spellLevel" type="text" name="level" placeholder="Spell Level"/>
    <label htmlFor="purpose">Purpose: </label>
    <input id="spellPurpose" type="text" name="purpose" placeholder="Spell's Purpose"/>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeSpellSubmit" type="submit" value="Make Spell" />
    </form>
    );
};

const SpellList = function(props) {
    if(props.spells.length === 0) {
        return (
            <div className="spellList">
                <h3 className="empty">No Spells created yet</h3>
            </div>
        );
    }
    
    const spellNodes = props.spells.map(function(spell) {
        return (
            <div data-key={spell._id} className="adventurer">
                <img src="/assets/img/magicIcon.png" alt="adventurer face" className="adventurerFace" />
                <h3 className="adventurerName">Name: {spell.name}</h3>
                <h3 className="adventurerAge">Level: {spell.level}</h3>
                <h3 className="adventurerClass">Purpose: {spell.purpose}</h3>
            </div>
        );
    });
    
    return (
    <div className="spellList">
        {spellNodes}
    </div>
    );
};



const loadSpellsFromServer = (csrf) => {
    sendAjax('GET', '/getSpells', null, (data) => {
        ReactDOM.render(
            <SpellList spells={data.spell} csrf={csrf} />, document.querySelector("#data")
        );
    });
};


const createSpellWindow = (csrf) => {
    ReactDOM.render(
        <SpellForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <SpellList spells={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadSpellsFromServer(csrf);
}

const WeaponForm = (props) => {
    return (
    <form id="weaponForm" 
        onSubmit={handleWeapon}
        name="weaponForm"
        action="/weaponMaker"
        method="POST"
        className="weaponForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="weaponName" type="text" name="name" placeholder="Weapon Name"/>
    <label htmlFor="type">Type: </label>
    <input id="weaponType" type="text" name="type" placeholder="Weapon Type"/>
    <label htmlFor="rarity">Rarity: </label>
    <input id="weaponRarity" type="text" name="rarity" placeholder="Weapon Rarity"/>
    <label htmlFor="damage">Damage: </label>
    <input id="weaponDamage" type="text" name="damage" placeholder="Weapon Damage"/>
    <label htmlFor="description">Description: </label>
    <input id="weaponDescription" type="text" name="description" placeholder="Weapon Description"/>
    <input id="csrfValue" type="hidden" name="_csrf" value={props.csrf}/>
    <input className="makeWeaponSubmit" type="submit" value="Make Weapon" />
    </form>
    );
};

const WeaponList = function(props) {
    if(props.weapons.length === 0) {
        return (
            <div className="weaponList">
                <h3 className="empty">No Weapons created yet</h3>
            </div>
        );
    }
    
    const weaponNodes = props.weapons.map(function(weapon) {
        console.dir(weapon.description);
        return (
            <div data-key={weapon._id} className="adventurer">
                <img src="/assets/img/weaponIcon.png" alt="adventurer face" className="adventurerFace" />
                <h3 className="weaponName">Name: {weapon.name}</h3>
                <h3 className="weaponType">Type: {weapon.type}</h3>
                <h3 className="weaponRarity">Rarity: {weapon.rarity}</h3>
                <h3 className="weaponDamage">Damage: {weapon.damage}</h3>
                <h3 className="weaponDescription">Description: {weapon.description}</h3>
            </div>
        );
    });
    
    return (
    <div className="weaponList">
        {weaponNodes}
    </div>
    );
};



const loadWeaponsFromServer = (csrf) => {
    sendAjax('GET', '/getWeapons', null, (data) => {
        ReactDOM.render(
            <WeaponList weapons={data.weapon} csrf={csrf} />, document.querySelector("#data")
        );
    });
};


const createWeaponWindow = (csrf) => {
    ReactDOM.render(
        <WeaponForm csrf={csrf} />, document.querySelector("#make")
    );
    
    ReactDOM.render(
        <WeaponList weapons={[]} csrf={csrf}/>, document.querySelector("#data")
    );
    
    loadWeaponsFromServer(csrf);
}

const EmptyForm = (props) => {
    return(null);
};

const PasswordWindow = (props) => {
    return (
    <form id="passwordForm" 
        name="passwordForm"
        onSubmit={handlePassword}
        action="/passwordChange"
        method="POST"
        className="mainForm"
    >
    <label for="pass">New Password: </label>
    <input id="pass" type="password" name="pass" placeholder="password"/>
    <label for="pass2">New Password Again: </label>
    <input id="pass2" type="password" name="pass2" placeholder="retype password"/>
    <input type="hidden" name="_csrf" value={props.csrf}/>
    <input className="formSubmit" type="submit" value="Sign Up" />
    </form>
    );
};

const createPasswordWindow = (csrf) => {
    ReactDOM.render(
    <EmptyForm />,
    document.querySelector("#make")
    );
    
    ReactDOM.render(
    <PasswordWindow csrf={csrf} />,
    document.querySelector("#data")
    );
};

const setup = function(csrf) {
    
    token = csrf;
    
    const adventurerButton = document.querySelector("#adventurerButton");
    const spellButton = document.querySelector("#spellButton");
    const weaponButton = document.querySelector("#weaponButton");
    const passwordButton = document.querySelector("#passwordButton");
    
    adventurerButton.addEventListener("click", (e) => {
        e.preventDefault();
        createAdventurerWindow(csrf);
        return false;
    });
    
    spellButton.addEventListener("click", (e) => {
        e.preventDefault();
        createSpellWindow(csrf);
        return false;
    });
    
    weaponButton.addEventListener("click", (e) => {
        e.preventDefault();
        createWeaponWindow(csrf);
        return false;
    });
    
    passwordButton.addEventListener("click", (e) => {
        e.preventDefault();
        createPasswordWindow(csrf);
        return false;
    });
    
    createAdventurerWindow(csrf); 
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});