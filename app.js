$(document).ready(function() {
	$('#task-result').hide();
	fetchTasks();
	let edit = false;


	$('#search').keyup(function(e){
		let search = $('#search').val();
		if(search){
			$.ajax({
			url: 'task-search.php',
			type: 'POST',
			data: { search },
			success: function(response) {
				let tasks = JSON.parse(response);
				let template = ``;
				tasks.forEach(task =>{
					template += `<li>
						${task.name}
					</li>
					`;
				});

				$('#container').html(template)
				$('#task-result').show();
				}
			});
		}
	})
	$('#task-form').submit(function(e){
		const postData = {
			id: $('#taskId').val(),
			name: $('#name').val(),
			description: $('#description').val()
			
		};

		let url = edit === false ? 'task-add.php' : 'task-edit.php';
		e.preventDefault();
		$.post(url, postData, function(response){
			fetchTasks();
			$('#task-form').trigger('reset');
			console.log(response);
		})
		edit = false;
	});

	function fetchTasks() {
		$.ajax({
		url: 'task-list.php',
		type: 'GET',
		success: function(response){
			let template = ``;
			let tasks = JSON.parse(response);
			tasks.forEach(task => {
				template += `<tr taskId="${task.id}">
					<td> ${task.id} </td>
					<td> 
						<a class="task-item pointer">${task.name}</a> 
					</td>
					<td> ${task.description} </td>
					<td>
						<button type="button" onclick="" class="btn btn-danger task-delete">
							Delete
						</button>
					</td>
				</tr>
				`;
			});
			$('#tasks').html(template);
			}
		})
	}
	$(document).on('click', '.task-delete', function(){
		const element = $(this)[0].parentElement.parentElement;
		if(confirm("Are you sure you want to delete it?")){
			let id = $(element).attr('taskId');
			$.post('task-delete.php', {id}, function(response) {
				console.log(response);
				fetchTasks();
			})
		}
	})

	$(document).on('click', '.task-item', function(){
		const element = $(this)[0].parentElement.parentElement;
		const id = $(element).attr('taskId');
		$.post('task-single.php', {id}, function(response){
			const task = JSON.parse(response);
			$('#name').val(task.name);
			$('#description').val(task.description);
			$('#taskId').val(task.id);
			edit = true;
		});
	});



});