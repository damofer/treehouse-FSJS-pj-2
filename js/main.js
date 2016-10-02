//David Mogollon - FSJS pj2

//The page has no pagination
//Add Pagination to the page and show students by 10.

//Create search interface

(function(){
	//create a div
	var container = document.createElement("div");
	//create input textbox

	var textbox = document.createElement("input");
	//create search Button.
	var searchButton = document.createElement("button");
	container.className= "student-search";

	textbox.type = "text";
	textbox.placeholder="Search for students..."
	//filter when typing on  input textfield (EXTRA CREDIT)
	textbox.addEventListener("keydown",function(){
		filter(textbox.value);
	})
	searchButton.innerText = "Search";
	//filter when click on button
	searchButton.addEventListener("click",function(){

		filter(textbox.value);

	});

	//append textbox and searchButton to the container
	container.appendChild(textbox);
	container.appendChild(searchButton);

	//append the container to the page header
	var pageHeader = document.getElementsByClassName("page-header")[0];
	pageHeader.appendChild(container);

})();

//Pagination

	//Get the complete list of students
	var getStudents=function(){
		var ul = document.getElementsByClassName("student-list")[0];
		var list = Array.prototype.slice.call(ul.children);

		return list;
	}


	//Show 10 students by page
	var loadPage = function( page , list){
		var ul = document.getElementsByClassName("student-list")[0];
		//remove the  all children of the  ul from the DOM
		while (ul.firstChild) {
  			ul.removeChild(ul.firstChild);
		}
		//add only the children that correspond to the selected page.
		if(list.length >0){
		for (var i = (page-1)*10; i<page*10; i++){
			if(list[i]){
			ul.appendChild(list[i]);
			}
		}
		}
		else{
			//if there are no matches then shows a message to the user. (EXTRA CREDIT)
			var noMatch = document.createElement("p");
			noMatch.innerText = "No matches";
			ul.appendChild(noMatch);
		}
		$(".student-item").hide();
		$(".student-item").show("slow");

	}
	//add page links
	var indexing = function(list){
		var oldPagination =document.getElementsByClassName("pagination")[0];
		if(oldPagination != undefined){
			oldPagination.remove();
		}
		var num = list.length;
		var page = document.getElementsByClassName("page")[0];
		var numPages = Math.floor(num/10)+1;
		var indexContainer =document.createElement("div");
		indexContainer.classList.add("pagination");
		page.appendChild(indexContainer);
		for(var i = 1; i <= numPages; i++){
			var li =document.createElement("li");
			var anchor =document.createElement("a");
			anchor.innerText=""+i;
			anchor.value = i;
			anchor.addEventListener("click",function(){
				loadPage(this.value, list);
			});
			li.appendChild(anchor);
			indexContainer.appendChild(li);
		}
	}

		//filter elements
	var filter =function(param){

		var student;
		//creating an array that will hold the matched items
		var matchList =[];
		for(student in studentList){
			var name = studentList[student].children[0].children[1].innerText.toUpperCase();
			var email =studentList[student].children[0].children[2].innerText.toUpperCase();
			var match = param.toUpperCase()
				if(name.indexOf(match) !=-1 || email.indexOf(match) !=-1){

					matchList.push(studentList[student]);

				}

		}
		loadPage(1,matchList);
		indexing(matchList);
	}


	//a var that holds the whole list of the students
	var studentList;
//initialize student list
	studentList = getStudents();
//first load of the  site
loadPage(1 , studentList);
indexing(studentList);
