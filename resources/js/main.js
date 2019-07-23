 	show()
  create()
  destroy()
  edit()

  $("#add").click(function(){
    $('.overlay').show()
    $('#addTitle').show()
    $('#editTitle').hide()
    $('#addForm').show()
    $('#applyForm').hide()
  })

  $('.popup-close').on("click", function(){
    $('.overlay').hide()
    $("#name").val("")
    $("#author").val("")
    $("#category").val("")
    $("#year").val("")
  });

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
  });


	function show(){
	  $.ajax({
		url:'/show',
		method: 'GET',
		dataType: 'JSON',
		success: function(data){
		  data.forEach(function(data) {

			let tr = document.createElement("tr")
			$("#tbody").append(tr)
			let td = []
			for(i=0; i<5; i++){
			td[i] = document.createElement("td")
			}

			$(td[0]).text(data.name)
			$(td[1]).text(data.author)
			$(td[2]).text(data.category)
			$(td[3]).text(data.year)
			$(td[4]).html("<button class='editBtn btn btn-warning' id="+data.id+"><img src='edit.png'></button> " + "<button class='deleteBtn btn btn-danger' id="+data.id+"><img src='delete.png'></button>")

			td.forEach(function(td) {
			  tr.append(td)
			});

		  });
		}
	  })
	}

	function create(){
	  $("#addForm").click(function(){
		$('input').css("border-color","#ced4da")
		$('.validation').text('')
		let name = $("#name").val()
		let author = $("#author").val()
		let category = $("#category").val()
		let year = $("#year").val()

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
		  success: function(data){
			let tr = document.createElement("tr")
			$("#tbody").append(tr)
			let td = []
			for(i=0; i<5; i++){
			td[i] = document.createElement("td")
			}
			$(td[0]).text(name)
			$(td[1]).text(author)
			$(td[2]).text(category)
			$(td[3]).text(year)
			$(td[4]).html("<button class='editBtn btn btn-warning' id="+data+"><img src='edit.png'></button> <button class='deleteBtn btn btn-danger' id="+data+"><img src='delete.png'></button>")
			td.forEach(function(td){
			  tr.append(td)
			});

			$("#name").val("")
			$("#author").val("")
			$("#category").val("")
			$("#year").val("")
			$('.overlay').hide()

		  },
		  error: function(data){
			let errors = data.responseJSON.errors
			if(errors.name){
			  $('#name').css("border-color","red")
			  $('#nameValid').text(errors.name[0])
			}
			if(errors.author){
			 $('#author').css("border-color","red")
			  $('#authorValid').text(errors.author[0])
			}
			if(errors.category){
			 $('#category').css("border-color","red")
			  $('#categoryValid').text(errors.category[0])
			}
			if(errors.year){
			 $('#year').css("border-color","red")
			  $('#yearValid').text(errors.year[0])
			}

		  }
		})
	  })
	}

	function destroy(){
		$("#tbody").on("click", ".deleteBtn",function(){
			let btn = $(this)
			let id = btn.attr("id")
			$.ajax({
			  url: '/destroy',
			  method: 'POST',
			  data:{id: id},
			  success: function(){
				let parents = btn.parents()
				parents[1].remove()
			  }
			})
		})
	}

	function edit(){
	  let id
	  let tr
	  let td
	  $("#tbody").on("click", ".editBtn",function(){
		$('#addTitle').hide()
		$('#editTitle').show()
		$('.overlay').show()
		$('#addForm').hide()
		$('#applyForm').show()
		let btn = $(this)
		id = btn.attr("id")
		tr = $(this).parents()[1]
		td = $(tr).children()
		$("#name").val($(td[0]).text())
		$("#author").val($(td[1]).text())
		$("#category").val($(td[2]).text())
		$("#year").val($(td[3]).text())

	  })
	  $("#applyForm").click(function(){
		$('input').css("border-color","#ced4da")
		$('.validation').text('')
		let name = $("#name").val()
		let author = $("#author").val()
		let category = $("#category").val()
		let year = $("#year").val()

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
		  success: function(){

			$(td[0]).text($("#name").val())
			$(td[1]).text($("#author").val())
			$(td[2]).text($("#category").val())
			$(td[3]).text($("#year").val())

			$("#name").val("")
			$("#author").val("")
			$("#category").val("")
			$("#year").val("")
			$('.overlay').hide()
		  },
		  error: function(data){
			let errors = data.responseJSON.errors
			if(errors.name){
			  $('#name').css("border-color","red")
			  $('#nameValid').text(errors.name[0])
			}
			if(errors.author){
			 $('#author').css("border-color","red")
			  $('#authorValid').text(errors.author[0])
			}
			if(errors.category){
			 $('#category').css("border-color","red")
			  $('#categoryValid').text(errors.category[0])
			}
			if(errors.year){
			 $('#year').css("border-color","red")
			  $('#yearValid').text(errors.year[0])
			}
		  }
		})
	  })
	}