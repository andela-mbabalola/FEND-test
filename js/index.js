(function(){
  'use strict';

  function fn() {

    var $el = document.querySelector('#myContent');
      fetchData().then(function(res) {
        res.files.map(function(response) {
            var temporaryElement = document.createElement("div");
            temporaryElement.setAttribute('class', 'content');
            temporaryElement.innerHTML = buildHtmlElement(response);
            $el.appendChild(temporaryElement);
        });
    });
  }

  /**
   * [function to group data gotten from JSON file]
   * @param  {[response]} response [data gotten from the JSON file]
   * @return {[object]}          [response grouped in a spcified manner]
   */

  function buildVariables(response) {
    var data = {
      name: response.name,
      date: buildDateString(response.last_modified),
      collaboration: isCollaboration(response.collaborative),
      imageType: documentType(response.file_type)
    };
    return data;
  }

  /**
   * [function to return a specified datew format]
   * @param  {[date]} date [the date]
   * @return {[string]}          [formatted date string]
   */

  function buildDateString(date) {
    date = new Date(date);
    return date.toDateString().substring(4,15);
  }

  /**
   * [function to test for a condition based on its collaboration]
   * @param  {[isCollaborative]} isCollaborative [condition to be checked for]
   * @return {[string]}          [a 'has-collaboration' or an empty string]
   */

  function isCollaboration(isCollaborative) {
    return isCollaborative ? "has-collaboration" : "";
  }

  /**
   * [function to determine the file type]
   * @param  {[fileTypeString]} fileTypeString [the type of file to be checked]
   * @return {[string]}          [a text or a spreadsheet]
   */

  function documentType(fileTypeString) {
    return fileTypeString === "text" ? "text" : "spreadsheet";
  }

  /**
   * [function to build HTML in Js]
   * @param  {[response]} response [the data gotten from reading the JSON file]
   * @return {[array]}          [the content of the JSON file + the HTML element]
   */

  function buildHtmlElement(response) {
    var data = buildVariables(response);
    return ["<div class='main-img'>",
          "<div class='image " + data.imageType + "'> </div></div>",
          "<div class='info'>", "<div class='name'>",
          "<h4 class='name-list'>" + data.name + "</h4>",
          "<p class='description " + data.collaboration + "'> Modified: " + data.date + " </p> </div>",
          "<span class='info-icon'></span> </div>"
      ].join("\n");
  }

  /**
   * [function to read a JSON file]
   * @return {[object]}          [content of the file read]
   */

  function fetchData() {
      return fetch('/data.json', {
          method: 'get'
      }).then(function(response) {
          return response.json();
      }).catch(function(err) {
          console.log(error);
      });
  }

  document.addEventListener('DOMContentLoaded', fn, false);

}());
