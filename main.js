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



// create empty item list

const showAlert = function (message, msgClass) {
  console.log("msg");
  messageDiv.innerHTML = message;
  messageDiv.classList.add(msgClass, "show");
  messageDiv.classList.remove("hide");
  setTimeout(() => {
    messageDiv.classList.remove("show",msgClass);
    messageDiv.classList.add("hide");
  }, 3000);
  return;
};




//deleteitems
const removeItem=function(item){
    const removeIndex= todoItems.indexOf(item);
    todoItems.splice(removeIndex, 1);
    //this splice will help to remove the one-one item to remove from the list
};


// filter tab items
const getItemsFilter = function (type) {
    let filterItems = [];
    console.log(type);
    switch (type) {
      case "todo":
        filterItems = todoItems.filter((item) => !item.isDone);
        break;
      case "done":
        filterItems = todoItems.filter((item) => item.isDone);
        break;
      default:
        filterItems = todoItems;
    }
    getList(filterItems);
  };
  



//update items 
const updateItem=function(currentItemIndex,value){
    const newItem=todoItems[currentItemIndex];
    newItem.name=value;
    todoItems.splice(currentItemIndex,1,newItem);
    setLocalStorage(todoItems);
};



//handle events on action buttons
const handle=function(itemData){

const items=document.querySelectorAll('.list-group-item');
    //we are selcting of this class .list-group-item using querySelectorAll

    items.forEach((item)=>{
        //iterating
        if(item.querySelector('.title').getAttribute('data-time')== itemData.addedAt){
            //if it will equal to the time then statement will proceed

            //done
            //adding an event
            //selecting with attribute-
            item.querySelector("[data-done]").addEventListener('click',function(e){
                e.preventDefault();
                const itemIndex=todoItems.indexOf(itemData);
                //finding the index of itemData
                const currentItem=todoItems[itemIndex];
                const currentClass=currentItem.isDone  ? "bi-check-circle-fill" : "bi-check-circle";
                currentItem.isDone=currentItem.isDone ? false : true;
                todoItems.splice(itemIndex, 1,currentItem);
                setLocalStorage(todoItems);
                const iconClass=currentItem.isDone  ? "bi-check-circle-fill" : "bi-check-circle";

                //we are changing the child of first element 
                this.firstElemetChild.classList.replace(currentClass,iconClass);


                //so here we are replacing itemIndex by 1 element by currentItem 
               //splice(): Removes elements from an array and, if necessary, inserts new elements in their place, returning the deleted elements.
            });

            //editing the pencil square blue

            item.querySelector("[data-edit]").addEventListener('click',function(e){
                e.preventDefault();
                inputItem.value=itemData.name;
                document.querySelector('#objIndex').value=todoItems.indexOf(itemData);

            });


            //delete using x-circle red
            item.querySelector("[data-delete]").addEventListener('click',function(e){
                e.preventDefault();
               alert("hi");
               if(confirm("Are you sure you want to remove this item?")){
                   itemsList.removeChild(item);
                   removeItem(item);
                   setLocalStorage(todoItems);
                   return todoItems.filter((item)=> item!= itemData);

               }

            });
        }
    });
}
//get list of items



//if we have items in the local storage then we will fetch then list mai list karaiye screen mai
const getList= function(todoItems){
    itemsList.innerHTML="";
    if(todoItems.length>0){
        todoItems.forEach((item)=>{
            //forEach is used to iterate in array 
            const iconClass=item.isDone ? "bi-check-circle-fill" : "bi-check-circle";
            //this is checking that if the item is done than when clicking on check icon it will fill with green if it is true otherwise it will not fill
            itemsList.insertAdjacentHTML(
                //The insertAdjacentHTML() method inserts a text as HTML, into a specified position.
                "beforeend",
                `<li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="title" data-time="${item.addedAt}">${item.name}</span>
                    <span> 
                        <a href="#" data-done> <i class="bi ${iconClass}green"></i></a>  
                        <a href="#" data-edit><i class="bi bi-pencil-square blue"></i></a>
                        <a href="#" data-delete><i class="bi bi-x-circle red"></i></a>
                    </span>
                  </li>`
                  );
                  //handling event with this function
                  handleItem(item);
                });
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

            const currentItemIndex = document.querySelectorinputItem.value

            currentItemIndex=document.querySelector('"#objIndex').value;
            if(currentItemIndex){
                //update
                updateItem(currentItemIndex,itemName);
                document.querySelector('"#objIndex').value="";
            }
            else{
                const itemObj = {
                    //in object property has its value
                        name : itemName,
                        isDone: false,
                        addedAt: new Date().getTime()
                    };
                    todoItems.push(itemObj);
                    setLocalStorage(todoItems);
                }
                getList(todoItems);
            }
            itemIndex.value="";
            //pushing the values of itemObj in the empty array that we have created upward let todoItems=[];
          
            //calling the function, the value of todoItems will go in this function(todoItems) 
        }
     
        // The trim() method removes whitespace from both sides of a string.
        // The trim() method does not change the original string.

      // filters
    filters.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      e.preventDefault();
      const tabType = this.getAttribute("data-type");
      document.querySelectorAll(".nav-link").forEach((nav) => {
        nav.classList.remove("active");
      });
      this.firstElementChild.classList.add("active");
      document.querySelector("#filterType").value = tabType;
      getItemsFilter(tabType);
    });
  });


    });
    //we are retrieving data from the local storage
    getLocalStorage();
});
