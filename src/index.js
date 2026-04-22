// imports
import initlocalStorageData from "./onPageLoad.js";
import createTodoItem from "./crud-ops/createTodoItem.js";
import createTodoList from "./crud-ops/createTodoList.js";
import addTodoItemToStorage from "./crud-ops/addTodoItemToStorage.js";
import addTodoListToStorage from "./crud-ops/addTodoListToStorage.js";

// check for and initialize app data upon complete page load
window.addEventListener("load", initlocalStorageData);

// manual testing
// console.log(createTodoItem(["kitty", "a meowing cat", "2026-04-17", "high", "defaultList"]));
// console.log(createTodoList(["turkish van toys", "meow, meow, meow! more catnip, please!"]));
// const item = createTodoItem(["kitty", "a meowing cat", "2026-04-17", "high", "defaultList"]);
// const item2 = createTodoItem(["calico", "a frowning cat", "2026-08-21", "medium", "defaultList"]);
// addTodoItemToStorage(item);
// addTodoItemToStorage(item2);
// const list = createTodoList(["tabby cat troubles", "pspspsps! there's not enough laser pens!"]);
// addTodoListToStorage(list);
