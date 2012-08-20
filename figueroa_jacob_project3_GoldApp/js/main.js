// Project 3 MIU 1208
// Jacob Figueroa

// handle data
var parseAddItemForm = function(data){
    //uses form data here;
    console.log(data);
    
};
// jquery dom ready call
$(document).ready(function(){
    
    var aiform = $('#additemform');
        aierrorslink = $('#aierrorslink')
    ;
    
    aiform.validate({
        invalidHandler: function(form, validator){
            aierrorslink.click();
            var html = '';
            for(var key in validator.submitted){
                var label = $('label[for^="' + key + '"]').not('[generated]');
                var legend = label.closest('fieldset').find('.ui-controlgroup-label');
                // tertiary statement - condition ? true : false
                var fieldName = legend.length ? legend.text() : label.text();
                html += '<li>' + fieldName + '</li>';
            };    
            $('#additemerrors ul').html(html);            
        },
        submitHandler: function(){
            var data = aiform.serializeArray();
            parseAddItemForm(data);
            storeData();
        }
        
        
    });
    
});

 //getElementById Function
    function ge(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
 // storeData
    function storeData(key){
         var id;
        //If there is no key, this means this is a brand new item and we need a new key.
        if(!key){
            id                     = Math.floor(Math.random()*10000001);
        }else{
            //Set the id to the existing key we're editing so that it will save over the data.
            //The key is the same key that's been passed along from the editSubmit event handler.
            //To the validate function, and then passed here, into the storeData function.
            id = key;
        }
        //Gather up all our form field values and store in an object.
        //Object properties are going to contain array with the form label and input value
        //getSelectedRadio();
        var item                       = {};
            item.group              = ["Wish List Entry: ", $("#entries").value];
            item.quantity             = ["Number of Items I would like: ", $("#quantity").value];
            item.firstname             = ["First Name: ", $("#firstname").value];
            item.lastname             = ["Last Name: ", $("#lastname").value];
            item.username             = ["Username: ", $("#username").value];
            item.password             = ["Password: ", $("#password").value];
            item.confirmpw             = ["Password Confirmed: ", $("#confirmpw").value];
            item.email                 = ["Email: ", $("#email").value];
            item.mydate             = ["Date: ", $("#mydate").value];
            item.slider             = ["Gift for a Friend? ", $("#slider").value];
            item.comments             = ["Comments: ", $("#comments").value];
        //Save data into Local Storage: Use Stringify to convert our object to a string. Local storage only stores strings.
        //Save form elements into LS
        localStorage.setItem(id, JSON.stringify(item));
        alert("Item added to Wish List!");
    }
    
    // getData
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
        $('#display').append(makeDiv);
        //document.body.appendChild(makeDiv);
        ge("items").style.display = "block";
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
            //getImage(dataobj.group[1], makeSubList); // this may need to be commented out? //create function to display image per item.
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
    
    //Auto Populate Local Storage
    function autoFillData(){
        //The actual JSON Object data required for this to work is coming from our json.js file, which is loaded from our HTML page.
        //Store JSON Object into Local Storage.
        for(var n in json){
            var id                 = Math.floor(Math.random()*10000001);
            localStorage.setItem(id, JSON.stringify(json[n]));
        }
        
    }
    
    //Make Item Links
    //These create edit and delete links for each stored item when displayed.
    function makeItemLinks(key, linksLi){
        //add edit single item link
        var editLink 			= document.createElement('n');
        editLink.href 			= "#";
        editLink.key 			= key;
        var editText 			= "Edit Entry";
        editLink.addEventListener("click", editItem);
        //editLink.click();
        editLink.innerHTML 		= editText;
        linksLi.appendChild(editLink);
        
        //add line break
        var breakTag 			= document.createElement("br");
        linksLi.appendChild(breakTag);
        
        //add delete single item link 
        //var deleteLink 			= $('#delete');
        var deleteLink 			= document.createElement('n');
        deleteLink.href 		= "#";
        deleteLink.key 			= key;
        var deleteText 			= "Delete Entry";
        //deleteLink.click();
        deleteLink.innerHTML 	= deleteText;
        linksLi.appendChild(deleteLink);  
    }
    
    
   /* 
     //Get image per item saved. THIS MAY NEED TO BE COMMENTED OUT.
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
    */
    
    function editItem(){
        //Grab data from our item from Local Storage.
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        
        //show form and hide display
        toggleControls("off");

        //populate form fields with current localStorage values.
        $("#entries").val = item.entries[1];
        $("#quantity").val = item.quantity[1];
        $("#firstname").val = item.firstname[1];
        $("#lastname").val = item.lastname[1];
        $("#username").val = item.username[1];
        $("#password").val = item.password[1];
        $("#confirmpw").val = item.confirmpw[1];
        $("#email").val = item.email[1];
        $("#mydate").val = item.mydate[1];
        var slider = document.forms[0].slider;
        for(var i=0; i<slider.length; i++){
            if(slider[i].val == "No" && item.slider[1] == "No"){
                slider[i].setAttribute("checked", "checked");                
            }else if(slider[i].val == "Yes" && item.slider[1] == "Yes"){
                slider[i].setAttribute("checked", "checked");
            }
        }
        $("#comments").val = item.comments[1];
        
        //remove initial listener from the input "save item" button.
        //submitLink.removeEventListener("click", storeData);
        //change submit button value to edit button
        //$("#edit").value = "Edit Entry";
        //var editSubmit = $("#submitData");
        //Save the key value established in this function as a property of the editSubmit event
        //That way we can use that value when we save the data we edited.
        //editSubmit.click();
        //editSubmit.key = this.key;
     
    }
    
    function deleteItem(){
        var ask = confirm("Are you sure you want to delete this entry?");
        if(ask){
            localStorage.removeItem(this.key);
            alert("Entry was deleted!");
            window.location.reload();
        }else if(ask){
            alert("Entry was not deleted.");
        }
    }
    
    function toggleControls(n){
        switch(n){
            case "on": // display data on 
                $("#additemform").toggle("hide");
                //$("clearButton").style.display = "inline";
                $("#display").toggle("hide");
                $("#additem").removeClass("ui-disabled");
                break;
                
            case "off": // not looking at our data, want to see form
                $("#additemform").toggle("show");
                //$("clearButton").style.display = "inline";
                $("#display").toggle("show");
                $("#additem").addClass("ui-disabled");
                $("#items").toggle("hide");
                break;
            default:
                return false;
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
    
    function windowReload(){
        window.location.reload();
        return false;
    }
    
    //Click Events
    $("#display").on("click", getData);

    $("#clearData").on("click", clearLocal);

    $("#additem").on("click", windowReload); 
    
    
    