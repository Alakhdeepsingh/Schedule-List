// select element in DOM
//we are selecting the element and taking in different variables
// The querySelector() method returns the first element that matches a CSS selector.
const form= document.querySelector("#itemForm"); 
const inputItem= document.querySelector("#itemInput");
const itemsList=document.querySelector("#itemsList");
const filters=document.querySelectorAll(".nav-items");

// The querySelectorAll() method returns all elements that matches a CSS selector(s).

//create an empty items list : basically an empty array
let todoItems=[];

//if we have items in the local storage then we will fetch then list mai list karaiye screen mai
const getList= function(todoItems){
    itemsList.innerHTML="";
    if(todoItems.length>0){
        todoItems.forEach((item)=>{
            //forEach is used to iterate in array 
            itemsList.insertAdjacentHTML(
                //The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
                "beforeend",
                `<li class="list-group-item d-flex justify-content-between align-items-center">
                    <span >${item.name}</span>
                    <span> 
                        <a> <i class="bi bi-check-circle green"></i></a>  
                        <a><i class="bi bi-pencil-square blue"></i></a>
                        <a><i class="bi bi-x-circle red"></i></a>
                    </span>
                  </li>`
                  );
                  handleItem(item);
                });
              } else {
                itemList.insertAdjacentHTML(
                  "beforeend",
                  `<li class="list-group-item d-flex justify-content-between align-items-center">
                    No record found.
                  </li>`
                );
              }
            };
//Object.addEventListner(event,handler,capturePhase);
//event is a string indicating the type of event,handler is the function that should be called when the event occurs.
//eg: btn.addEventListner("click",show,false);


//get local storage from the page
const getLocalStorage = function(){
    const todoStorage=localStorage.getItem("todoItems");
    if(todoStorage==="undefined"||todoStorage===null){
        todoItems=[];
    } 
    else{
        todoItems=JSON.parse(todoStorage);
        // Use the JavaScript function JSON.parse() to convert text into a JavaScript object
    }
    console.log("items",todoItems);
    getList(todoItems);
};


//set in local storage

const setLocalStorage  = function(todoItems){
    localStorage.setItem("todoItems",JSON.stringify(todoItems));

};



document.addEventListener("DOMContentLoaded", ()=>{
// The DOMContentLoaded event fires when the initial HTML document
// has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. 
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
        // The preventDefault() method cancels the event if it is cancelable, 
        //meaning that the default action that belongs to the event will not occur
        const itemName=inputItem.value.trim();
        //line 5 inputItem value will come in itemName 
        if(itemName.length===0){
            alert("Please Enter name.");
        }
        else{
            const itemObj = {
            //in object property has its value
                name : itemName,
                isDone: false,
                addedAt: new Date().getTime()
            };
            todoItems.push(itemObj);
            //pushing the values of itemObj in the empty array that we have created upward let todoItems=[];
            setLocalStorage(todoItems);
            //calling the function, the value of todoItems will go in this function(todoItems) 
        }
        console.log(itemName);
        // The trim() method removes whitespace from both sides of a string.
        // The trim() method does not change the original string.

    });
    //we are retrieving data from the local storage
    getlocalStorage();
});









