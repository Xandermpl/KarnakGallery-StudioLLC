// Project 2 MIU 1208
// Jacob Figueroa
//Copied from Week 1 Project's JS because it should not be broken in any way!
// write your javascript in here

//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){

    //getElementById Function
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    //Create select field element and populate with options.
    function itemOpt(){
        var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
            selectList = $("select"),
            makeSelect = document.createElement("select");
            makeSelect.setAttribute("id", "entries");
        for(var i=0, j=wishLists.length; i<j; i++){
            var makeOption = document.createElement("option");
            var optText = wishLists[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectList.appendChild(makeSelect);
    }
        
    //Find value of selected Radio Button.
    function getSelectedRadio(){
        var radios = document.forms[0].answer;
        for (var i=0; i<radios.length; i++){
            if(radios[i].checked){
                answerValue = radios[i].value;
            }
        }
    }
    
    
    function toggleControls(n){
        switch(n){
            case "on": // display data on
                $("wishLists").style.display = "none";
                $("clearButton").style.display = "inline";
                $("displayButton").style.display = "none";
                $("addNew").style.display = "inline";
                break;
            case "off": // not looking at our data, want to see form
                $("wishLists").style.display = "block";
                $("clearButton").style.display = "inline";
                $("displayButton").style.display = "inline";
                $("addNew").style.display = "none";
                $("items").style.display = "none";
                break;
            default:
                return false;
        }
    }
    
    function storeData(key){
     //If there is no key, this means this is a brand new item and we need a new key.
     if(!key){
var id = Math.floor(Math.random()*10000001);
     }else{
//Set the id to the existing key we're editing so that it will save over the data.
//The key is the same key that's been passed along from the editSubmit event handler.
//To the validate function, and then passed here, into the storeData function.
id = key;
     }
        //Gather up all our form field values and store in an object.
        //Object properties are going to contain array with the form label and input value
        getSelectedRadio();
        var item = {};
            item.group = ["Wish List Entry: ", $("entries").value];
            item.quantity = ["Number of Items I would like: ", $("itemQuantity").value];
            item.firstname = ["First Name: ", $("firstname").value];
            item.lastname = ["Last Name: ", $("lastname").value];
            item.username = ["Username: ", $("username").value];
            item.password = ["Password: ", $("password").value];
            item.confirmpw = ["Password Confirmed: ", $("confirmpw").value];
            item.email = ["Email: ", $("email").value];
            item.date = ["Date: ", $("date").value];
            item.gift = ["Gift for a Friend? ", answerValue];
            item.comment = ["Comments: ", $("comments").value];
        //Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
        //Save form elements into LS
        localStorage.setItem(id, JSON.stringify(item));
        alert("Item added to Wish List!");
    }
   
    //Let's get the data we've stored.
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
alert("There are no items in your Wish List so default data was added.");
autoFillData();
        }
        //Write Data from Local Storage to the browser.
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $("items").style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement("li");
            var linksLi = document.createElement("li");
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            //convert the string from local storage value back to an object by using JSON.parse()
            var dataobj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            getImage(dataobj.group[1], makeSubList); //create function to display image per item.
            for(var n in dataobj){
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var subText = dataobj[n][0]+" "+dataobj[n][1];
                makeSubli.innerHTML = subText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    
    //Get image per item saved.
    function getImage(entryName, makeSubList){
var imageLi = document.createElement("li");
makeSubList.appendChild(imageLi);
var newImage = document.createElement("img");
if(entryName === "Album: 2205 (2010/2011)"){
var image = "Album";
}else if(entryName === "Album: Sick of Sarah (2008)"){
var image = "Album2";
}else if(entryName === "Autographed Print: SOS Live"){
var image = "Print";
}else if(entryName === "Autographed Print: SOS In Studio"){
var image = "Print2";
}else if(entryName === "Sick of Sarah V-Neck T-Shirt"){
var image = "Shirt";
}else if(entryName === "Tank Top Muscle Tee"){
var image = "Shirt2";
}else if(entryName === "Long Key Necklace"){
var image = "Key";
}else if(entryName === "Key Necklace Choker"){
var image = "Key2";
}
var setSrc = newImage.setAttribute("src", "img/" + image + ".png");
imageLi.appendChild(newImage);
    }
    
    //Auto Populate Local Storage
    function autoFillData(){
//The actual JSON Object data required for this to work is coming from our json.js file, which is loaded from our HTML page.
//Store JSON Object into Local Storage.
for(var n in json){
var id = Math.floor(Math.random()*10000001);
localStorage.setItem(id, JSON.stringify(json[n]));
}

    }
    
    //Make Item Links
    //These create edit and delete links for each stored item when displayed.
    function makeItemLinks(key, linksLi){
//add edit single item link
var editLink = document.createElement("a");
editLink.href = "#";
editLink.key = key;
var editText = "Edit Entry";
editLink.addEventListener("click", editItem); //need editItem function
editLink.innerHTML = editText;
linksLi.appendChild(editLink);

//add line break
var breakTag = document.createElement("br");
linksLi.appendChild(breakTag);

//add delete single item link
var deleteLink = document.createElement("a");
deleteLink.href = "#";
deleteLink.key = key;
var deleteText = "Delete Entry";
deleteLink.addEventListener("click", deleteItem);
deleteLink.innerHTML = deleteText;
linksLi.appendChild(deleteLink);
    }
    
    function editItem(){
//Grab data from our item from Local Storage.
var value = localStorage.getItem(this.key);
var item = JSON.parse(value);

//show form and hide display
toggleControls("off");

//populate form fields with current localStorage values.
$("entries").value = item.group[1];
$("itemQuantity").value = item.quantity[1];
$("firstname").value = item.firstname[1];
$("lastname").value = item.lastname[1];
$("username").value = item.username[1];
$("password").value = item.password[1];
$("confirmpw").value = item.confirmpw[1];
$("email").value = item.email[1];
$("date").value = item.date[1];
var radios = document.forms[0].answer;
for(var i=0; i<radios.length; i++){
if(radios[i].value == "No" && item.gift[1] == "No"){
radios[i].setAttribute("checked", "checked");	
}else if(radios[i].value == "Yes" && item.gift[1] == "Yes"){
radios[i].setAttribute("checked", "checked");
}
}
$("comments").value = item.comment[1];

//remove initial listener from the input "save item" button.
submitLink.removeEventListener("click", storeData);
//change submit button value to edit button
$("submitData").value = "Edit Entry";
var editSubmit = $("submitData");
//Save the key value established in this function as a property of the editSubmit event
//That way we can use that value when we save the data we edited.
editSubmit.addEventListener("click", validate);
editSubmit.key = this.key;

    }
    
    function deleteItem(){
var ask = confirm("Are you sure you want to delete this entry?");
if(ask){
localStorage.removeItem(this.key);
alert("Entry was deleted!");
window.location.reload();
}else{
alert("Entry was not deleted.");
}
    }
    
    function clearLocal(){
        if(localStorage.length === 0){
            alert("There is no data to clear.");
        }else{
            localStorage.clear();
            alert("All items have been removed from your Wish List.");
            window.location.reload();
            return false;
        }
    }
    
    function validate(e){
//define the elements we want to check
var getItem = $("entries");
//Not doing quantity, because default is 1 item.
var getFirstName = $("firstname");
var getLastName = $("lastname");
var getUsername = $("username");
var getPassword = $("password");
var getConfirmPW = $("confirmpw");
var getEmail = $("email");

//reset error messages
errorMessage.innerHTML = "";
getItem.style.border = "1px solid black";
getFirstName.style.border = "1px solid black";
getLastName.style.border = "1px solid black";
getUsername.style.border = "1px solid black";
getPassword.style.border = "1px solid black";
getConfirmPW.style.border = "1px solid black";
getEmail.style.border = "1px solid black";

//get error messages
var messageOpt = [];

//group validation
if(getItem.value === "--Please Select an Item--"){
var itemError = "Please select an item.";
getItem.style.border = "2px solid purple";
messageOpt.push(itemError);
}

//first name validation
if(getFirstName.value === ""){
var firstNameError = "Please enter a first name.";
getFirstName.style.border = "2px solid purple";
messageOpt.push(firstNameError);
}

//last name validation
if(getLastName.value === ""){
var lastNameError = "Please enter a last name.";
getLastName.style.border = "2px solid purple";
messageOpt.push(lastNameError);
}

//username validation
var re = /^[A-Za-z0-9_]{3,20}$/;
if(!(re.exec(getUsername.value))){
     var usernameError = "Username must contain between 6-15 characters. Letters, numbers, and underscores accepted values.";
     getUsername.style.border = "2px solid purple";
     messageOpt.push(usernameError);
}else if(getUsername.value === ""){
var usernameError2 = "Please enter a username.";
getUsername.style.border = "2px solid purple";
messageOpt.push(usernameError2);
}

//get password validation
var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/;
if(!(re.exec(getPassword.value))){
     var passwordError = "Password must contain at least six characters (letters, numbers, and underscore allowed). Must contain at least one number, one lowercase and one uppercase letter.";
     getPassword.style.border = "2px solid purple";
     messageOpt.push(passwordError);
     }else if(getPassword.value.length < 6){
var passwordError2 = "Password must contain at least six characters.";
getPassword.style.border = "2px solid purple";
messageOpt.push(passwordError2);
getPassword.focus();
     }else if(getPassword.value.length >10){
var passwordError3 = "Password may not contain more than ten characters. Please try again.";
getPassword.style.border = "2px solid purple";
messageOpt.push(passwordError3);
getPassword.focus();
     }
    
     //get confirmpw validation
     if(getPassword.value != getConfirmPW.value){
var confirmpwError = "Passwords do not match. Please make sure you confirm your password.";
getConfirmPW.style.border = "2px solid purple";
messageOpt.push(confirmpwError);
}


//get email validation
     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
     if(!(re.exec(getEmail.value))){
     var emailError = "Please enter a valid email address.";
     getEmail.style.border = "2px solid purple";
     messageOpt.push(emailError);
     }
    
     //if there were errors, display them on the screen.
     if(messageOpt.length >= 1){
     alert("Please fix your errors, then try again.");
for(var i=0, j=messageOpt.length; i<j; i++){
var text = document.createElement("li");
text.innerHTML = messageOpt[i];
errorMessage.appendChild(text);
}
e.preventDefault();
return false;	
     }else{
//if all is OK, save our data. Send key value (which came from editData function)
//remember this key value was passed through the editSubmit event listener as a property.
storeData(this.key);
     }
    
    }
    
    //Default Variables
    
    var wishLists = ["--Please Select an Item--", "Album: 2205 (2010/2011)", "Album: Sick of Sarah (2008)", "Autographed Print: SOS Live", "Autographed Print: SOS In Studio", "Sick of Sarah V-Neck T-Shirt", "Tank Top Muscle Tee", "Long Key Necklace", "Key Necklace Choker"], answerValue, errorMessage = $("errors");
    itemOpt();

    //Set Link & Submit Click Events
    var displayLink = $("displayButton");
    displayLink.addEventListener("click", getData);

    var clearLink = $("clearButton");
    clearLink.addEventListener("click", clearLocal);

    var submitLink = $("submitData");
    submitLink.addEventListener("click", validate);
    

    
}); 