// function is an object in JS
function Person(id, name, url) {
  this.id = id;
  this.name = name;
  this.url = url;
  this.talk = function (id, name, url) {
    return $.ajax(url)
    .done(function() {
      console.log(`Current call of talk() is finished with success callback. \nPerson has id ${id} and name ${name}. \nExecuted at: ${Date.now()}.`);
    })
    .fail(function() {
      console.log(`Current call of talk() is finished with error callback. \nPerson has id ${id} and name ${name}. \nExecuted at: ${Date.now()}. \nExecution will be stopped.`);
    })
  };
}

// example of Person arguments in array
let persons = [
  new Person(1, "Jack", "favicon.ico"), 
  new Person(2, "Jerom", "favicon.ico"), 
  new Person(3, "Jim", "favicon.html"), 
  new Person(4, "John", "favicon.ico")
];

// have to use async/await since there is a need of sequential calls
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function for reference
(async () => { 
  for (let person of persons) {
    await person.talk(person.id, person.name, person.url);
    console.log("Call execution finished at: " + Date.now());
  }
})()

// OUTPUT explanation: 
// the first element of persons array will pass since the URL is correct (there is a file "favicon.ico" in the directory)
// the second element will pass since the URL is correct and first element was succeed
// the third element will fail since the URL is incorrect
// the fourth element will not run since the third was failed, even the URL was correct
// 
// there could be error handler which can continue run the sequential calls after a failed one, but it is out of the task
