/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/js/javascript.js":
/*!************************************!*\
  !*** ./resources/js/javascript.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

show();
create();
destroy();
edit();
$("#add").click(function () {
  $('.overlay').show();
  $('#addTitle').show();
  $('#editTitle').hide();
  $('#addForm').show();
  $('#applyForm').hide();
});
$('.popup-close').on("click", function () {
  $('.overlay').hide();
  $("#name").val("");
  $("#author").val("");
  $("#category").val("");
  $("#year").val("");
});
$.ajaxSetup({
  headers: {
    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  }
});

function show() {
  $.ajax({
    url: '/show',
    method: 'GET',
    dataType: 'JSON',
    success: function success(data) {
      data.forEach(function (data) {
        var tr = document.createElement("tr");
        $("#tbody").append(tr);
        var td = [];

        for (i = 0; i < 5; i++) {
          td[i] = document.createElement("td");
        }

        $(td[0]).text(data.name);
        $(td[1]).text(data.author);
        $(td[2]).text(data.category);
        $(td[3]).text(data.year);
        $(td[4]).html("<button class='editBtn btn btn-warning' id=" + data.id + "><img src='edit.png'></button> " + "<button class='deleteBtn btn btn-danger' id=" + data.id + "><img src='delete.png'></button>");
        td.forEach(function (td) {
          tr.append(td);
        });
      });
    }
  });
}

function create() {
  $("#addForm").click(function () {
    $('input').css("border-color", "#ced4da");
    $('.validation').text('');
    var name = $("#name").val();
    var author = $("#author").val();
    var category = $("#category").val();
    var year = $("#year").val();
    $.ajax({
      method: 'POST',
      url: '/create',
      dataType: 'JSON',
      data: {
        name: name,
        author: author,
        category: category,
        year: year
      },
      success: function success(data) {
        var tr = document.createElement("tr");
        $("#tbody").append(tr);
        var td = [];

        for (i = 0; i < 5; i++) {
          td[i] = document.createElement("td");
        }

        $(td[0]).text(name);
        $(td[1]).text(author);
        $(td[2]).text(category);
        $(td[3]).text(year);
        $(td[4]).html("<button class='editBtn btn btn-warning' id=" + data + "><img src='edit.png'></button> <button class='deleteBtn btn btn-danger' id=" + data + "><img src='delete.png'></button>");
        td.forEach(function (td) {
          tr.append(td);
        });
        $("#name").val("");
        $("#author").val("");
        $("#category").val("");
        $("#year").val("");
        $('.overlay').hide();
      },
      error: function error(data) {
        var errors = data.responseJSON.errors;

        if (errors.name) {
          $('#name').css("border-color", "red");
          $('#nameValid').text(errors.name[0]);
        }

        if (errors.author) {
          $('#author').css("border-color", "red");
          $('#authorValid').text(errors.author[0]);
        }

        if (errors.category) {
          $('#category').css("border-color", "red");
          $('#categoryValid').text(errors.category[0]);
        }

        if (errors.year) {
          $('#year').css("border-color", "red");
          $('#yearValid').text(errors.year[0]);
        }
      }
    });
  });
}

function destroy() {
  $("#tbody").on("click", ".deleteBtn", function () {
    var btn = $(this);
    var id = btn.attr("id");
    $.ajax({
      url: '/destroy',
      method: 'POST',
      data: {
        id: id
      },
      success: function success() {
        var parents = btn.parents();
        parents[1].remove();
      }
    });
  });
}

function edit() {
  var id;
  var tr;
  var td;
  $("#tbody").on("click", ".editBtn", function () {
    $('#addTitle').hide();
    $('#editTitle').show();
    $('.overlay').show();
    $('#addForm').hide();
    $('#applyForm').show();
    var btn = $(this);
    id = btn.attr("id");
    tr = $(this).parents()[1];
    td = $(tr).children();
    $("#name").val($(td[0]).text());
    $("#author").val($(td[1]).text());
    $("#category").val($(td[2]).text());
    $("#year").val($(td[3]).text());
  });
  $("#applyForm").click(function () {
    $('input').css("border-color", "#ced4da");
    $('.validation').text('');
    var name = $("#name").val();
    var author = $("#author").val();
    var category = $("#category").val();
    var year = $("#year").val();
    $.ajax({
      method: 'POST',
      url: '/edit',
      data: {
        id: id,
        name: name,
        author: author,
        category: category,
        year: year
      },
      success: function success() {
        $(td[0]).text($("#name").val());
        $(td[1]).text($("#author").val());
        $(td[2]).text($("#category").val());
        $(td[3]).text($("#year").val());
        $("#name").val("");
        $("#author").val("");
        $("#category").val("");
        $("#year").val("");
        $('.overlay').hide();
      },
      error: function error(data) {
        var errors = data.responseJSON.errors;

        if (errors.name) {
          $('#name').css("border-color", "red");
          $('#nameValid').text(errors.name[0]);
        }

        if (errors.author) {
          $('#author').css("border-color", "red");
          $('#authorValid').text(errors.author[0]);
        }

        if (errors.category) {
          $('#category').css("border-color", "red");
          $('#categoryValid').text(errors.category[0]);
        }

        if (errors.year) {
          $('#year').css("border-color", "red");
          $('#yearValid').text(errors.year[0]);
        }
      }
    });
  });
}

/***/ }),

/***/ "./resources/sass/style.scss":
/*!***********************************!*\
  !*** ./resources/sass/style.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!**********************************************************************!*\
  !*** multi ./resources/js/javascript.js ./resources/sass/style.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\MAMP\htdocs\bookCatalog\resources\js\javascript.js */"./resources/js/javascript.js");
module.exports = __webpack_require__(/*! C:\MAMP\htdocs\bookCatalog\resources\sass\style.scss */"./resources/sass/style.scss");


/***/ })

/******/ });