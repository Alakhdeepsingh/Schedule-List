// select element in DOM
//we are selecting the element and taking in different variables
// The querySelector() method returns the first element that matches a CSS selector.
const form = document.querySelector("#itemForm");
// console.log(form);
const inputItem = document.querySelector("#itemInput");
// console.log(inputItem);
const itemsList = document.querySelector("#itemsList");
const filters = document.querySelectorAll(".nav-item");
const alertDiv = document.querySelector("#message")

// The querySelectorAll() method returns all elements that matches a CSS selector(s).

//create an empty items list : basically an empty array
let todoItems = [];
const alertMessage = function (message, className) {
    alertDiv.innerHTML = message;
    alertDiv.classList.add(className, "show");
    alertDiv.classList.remove("hide");
    setTimeout(() => {
        alertDiv.classList.add("hide");
        alertDiv.classList.remove("show");
    }, 3000);
    //3000 means 3 sec rukta hai scrren mai phir gayabh hoo jatta hai 
    return;
};


// create empty item list

// const showAlert = function (message, msgClass) {
//   console.log("msg");
//   messageDiv.innerHTML = message;
//   messageDiv.classList.add(msgClass, "show");
//   messageDiv.classList.remove("hide");
//   setTimeout(() => {
//     messageDiv.classList.remove("show",msgClass);
//     messageDiv.classList.add("hide");
//   }, 3000);
//   return;
// };


//deleteitems
const removeItem = function(item) {
    const removeIndex = todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);
    //this splice will help to remove the one-one item to remove from the list
};


// filter tab items
const getItemsFilter = function(type) {
    let filterItems = [];
    console.log(type);
    switch (type) {
        case "todo":
            filterItems = todoItems.filter((item) => !item.isDone);
            //Out of 10 people , 4 loggo ne black (true) tshirt pheni hai and 6 loggo ne white(false)
            //tshirt phena hai tho agar mujjhe white(false) shirt walle logh chaiye tho vahi logh honghe 
            //jinho ne black(true) shirt nhi pheni hai
            break;
        case "done":
            //here done is basically completed which is printing in the screen
            filterItems = todoItems.filter((item) => item.isDone);
            //Out of 10 people , 4 loggo ne black (true) tshirt pheni hai and 6 loggo ne white(false)
//agar black (true)shirt walle chaiye tho shidha jho black shirt(true) walle hai unko dhundho
            break;
        default:
            filterItems = todoItems;
    }
    // console.log(todoItems);
    // console.log(filterItems);
    getList(filterItems);
};


//update items 
const updateItem = function(currentItemIndex, value) {
    const newItem = todoItems[currentItemIndex];
    newItem.name = value;
    //console.log(todoItems);

    todoItems.splice(currentItemIndex, 1, newItem);
    //1 is telling that we have to replace by 1 element
    console.log(currentItemIndex);
    console.log(todoItems);
    setLocalStorage(todoItems);
};


//handle events on action buttons
const handleItem = function(itemData) {
// console.log(itemData);
    const items = document.querySelectorAll('.list-group-item');
    // console.log(items);
    //we are selecting of this class .list-group-item using querySelectorAll

    items.forEach((item) => {
        //iterating
        if (item.querySelector('.title').getAttribute('data-time') == itemData.addedAt) {
            // console.log(item.querySelector('.title'))
            //if it will equal to the time then statement will proceed

            //done
            //adding an event
            //selecting with attribute-
            item.querySelector("[data-done]").addEventListener('click', function(e) {
                e.preventDefault();
                const itemIndex = todoItems.indexOf(itemData);
                //finding the index of itemData
                const currentItem = todoItems[itemIndex];
                const currentClass = currentItem.isDone ? "bi-check-circle-fill" : "bi-check-circle";
                currentItem.isDone = currentItem.isDone ? false : true;
                todoItems.splice(itemIndex, 1, currentItem);
                setLocalStorage(todoItems);
                const iconClass = currentItem.isDone ? "bi-check-circle-fill" : "bi-check-circle";

                //we are changing the child of first element 
                console.log(this.firstElementChild.classList);
                this.firstElementChild.classList.replace(currentClass, iconClass);
                
                //so here we are replacing itemIndex by 1 element by currentItem 
                //splice(): Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
            });
            //editing the pencil square blue
            item.querySelector("[data-edit]").addEventListener('click', function(e) {
                e.preventDefault();      
                inputItem.value = itemData.name;
                //itemData.name : is the name from where edit event is triggered the name will be added to the placeholder (inputItem.value)
                document.querySelector("#citem").value = todoItems.indexOf(itemData);
            });

            //delete using x-circle red
            item.querySelector("[data-delete]").addEventListener('click', function(e) {
                e.preventDefault();
                //    alert("hi");
                if (confirm("Are you sure you want to remove this item?")) {
                    itemsList.removeChild(item);
                    removeItem(item);
                    setLocalStorage(todoItems);
                    alertMessage("Item has been deleted.", "alert-danger")
                    return todoItems.filter((item) => item != itemData);
                }
            });
        }
    });
}

//get list of items

//if we have items in the local storage then we will fetch then list mai list karaiye screen mai
const getList = function(todoItems) {
    itemsList.innerHTML = "";
    if (todoItems.length > 0) {
        todoItems.forEach((item) => {
            //forEach is used to iterate in array 
            const iconClass = item.isDone ? "bi-check-circle-fill" : "bi-check-circle";
            //this is checking that if the item is done than when clicking on check icon it will fill with green if it is true otherwise it will not fill
            itemsList.insertAdjacentHTML(
                //The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
                "beforeend",
                //beforeend : list mai item end mai aati hai jabh bhi ham new item dalte hai
                `<li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="title" data-time="${item.addedAt}">${item.name}</span>
                    <span> 
                        <a href="#" data-done> <i class="bi ${iconClass} green"></i></a>  
                        <a href="#" data-edit><i class="bi bi-pencil-square blue"></i></a>
                        <a href="#" data-delete><i class="bi bi-x-circle red"></i></a>
                    </span> 
                  </li>`
                  // attriute : ,eans its description like data edit,data-delete,data-done etc are all attribute
            );
            //handling event with this function
            handleItem(item);
        });
    } else {
        itemsList.insertAdjacentHTML(
            "beforeend",
            `<li class="list-group-item d-flex justify-content-between align-items-center">
                        No record found.
                      </li>`
        );

    }
}

//Object.addEventListner(event,handler,capturePhase);
//event is a string indicating the type of event,handler is the function that should be called when the event occurs.
//eg: btn.addEventListner("click",show,false);


//get local storage from the page
const getLocalStorage = function() {
    const todoStorage = localStorage.getItem("todoItems");
    if (todoStorage === "undefined" || todoStorage === null) {
        todoItems = [];
    } else {
        todoItems = JSON.parse(todoStorage);
        // Use the JavaScript function JSON.parse() to convert into JavaScript object from string or text 
    }
    // console.log("items",todoItems);
    getList(todoItems);

};


//set in local storage

const setLocalStorage = function(todoItems) {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
                         // key      ,  //value
    //stringify : convert json object to string 
//object
//{ 
//    x: 5, 
//    y: 6 
//}

//console.log(JSON.stringify({ x: 5, y: 6 }));
// expected output: "{"x":5,"y":6}"

};



document.addEventListener("DOMContentLoaded", () => {
    //Object.addEventListner(event,handler,capturePhase);
//event is a string indicating the type of event,handler is the function that should be called when the event occurs.
//eg: btn.addEventListner("click",show,false);

    // The DOMContentLoaded event fires when the initial HTML document
    // has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading. 
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // The preventDefault() method cancels the event if it is cancelable, 
        //meaning that the default action that belongs to the event will not occur
        const itemName = inputItem.value.trim();
        //line 5 inputItem value will come in itemName 
        if (itemName.length === 0) {
            alertMessage("Please Enter name.", "alert-danger");
        } else {

            //const currentItemIndex = document.querySelector("#citem").value;

            const currentItemIndex = document.querySelector("#citem").value;
            if (currentItemIndex) { 
                //update
                updateItem(currentItemIndex, itemName);
                document.querySelector("#citem").value = "";
                alertMessage("Item has been updated.", "alert-success");
            } else {
                const itemObj = {
                    //in object property has its value
                    name: itemName,
                    isDone: false,
                    addedAt: new Date().getTime()
                };
                todoItems.push(itemObj);
                setLocalStorage(todoItems);
                alertMessage("New item has been added.", "alert-success");
            }
            getList(todoItems);
        }
        itemInput.value = "";
        //pushing the values of itemObj in the empty array that we have created upward let todoItems=[];

        //calling the function, the value of todoItems will go in this function(todoItems) 
    });

    // The trim() method removes whitespace from both sides of a string.
    // The trim() method does not change the original string.

    // filters tabs
    filters.forEach((tab) => {
        tab.addEventListener("click", function(e) {
            e.preventDefault();
            const tabType = this.getAttribute("data-type");
            document.querySelectorAll(".nav-link").forEach((nav) => {
                nav.classList.remove("active");
            });
            this.firstElementChild.classList.add("active");
            //console.log(this.firstElementChild);
            document.querySelector("#filterType").value = tabType;
            getItemsFilter(tabType);
            
        });
    });

    //we are retrieving data from the local storage
    //load items
    getLocalStorage();
});