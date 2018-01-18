(function() {
    var ids = 0;

    function TodoNode() {
        this.todos = new Array(0);
        this.done = new Array(0);
    }

    TodoNode.prototype.editButtonClicked = function (e) {
        //console.log(e.target);
        if (e.target.value === 'Edit') {
            e.target.parentNode.parentNode.children[0].children[0].removeAttribute('disabled');
            e.target.parentNode.parentNode.children[0].children[0].removeAttribute('style');
            e.target.value = 'Done Editing';
            var x = e.target.getAttribute('id').split('-');
            var idx = x[x.length - 1];
            console.log(this.done);
            this.done[idx] = false;
            e.target.parentNode.parentNode.children[3].children[0].setAttribute('disabled', 'true');
        }
        else {
            e.target.parentNode.parentNode.children[0].children[0].setAttribute('disabled', 'true');
            e.target.value = 'Edit';
            outerBox.innerHTML = '';
            outerBox.appendChild(render(todo));
        }
    }


    TodoNode.prototype.deleteButtonClicked = function (e) {
        var toDelete = e.target.parentNode.parentNode.children[0].children[0].value;
        console.log(toDelete);
        var index = this.todos.indexOf(toDelete);
        this.todos.splice(index, 1);
        this.done.splice(index, 1);
        console.log(this.todos);
        e.target.parentNode.parentNode.setAttribute('hidden', 'true');
    }

    TodoNode.prototype.doneButtonClicked = function (e) {
        if (e.target.value === 'Done') {
            this.done[this.todos.indexOf(e.target.parentNode.parentNode.children[0].children[0].value)] = true;
            e.target.parentNode.parentNode.children[0].children[0].setAttribute('style', 'text-decoration: line-through');
            e.target.value = 'Undone';
        }
        else {
            this.done[this.todos.indexOf(e.target.parentNode.parentNode.children[0].children[0].value)] = false;
            e.target.parentNode.parentNode.children[0].children[0].removeAttribute('style');
            e.target.value = 'Done';
        }
    }

    TodoNode.prototype.onKeyUp = function (e) {
        var id = e.target.getAttribute('id');
        id = id.split('-');
        var idx = id[id.length - 1];
        this.done[idx] = false;
        this.todos[idx] = e.target.value;
        console.log(e.target);
    }

    TodoNode.prototype.addSubTodoButtonClicked = function (e) {
        var newTodo = prompt('Enter New Todo');
        //console.log(newTodo);
        if (newTodo !== null) {
            var subTodo = new TodoNode();
            subTodo.todos.push(newTodo);
            subTodo.done.push(false);
            var x = e.target.getAttribute('id').split('-');
            var idx = x[x.length - 1];
            //console.log(this.todos);
            //console.log(idx);
            this.todos.splice(Number(idx) + 1, 0, subTodo);
            //console.log(this.todos);
            //console.log(todo.todos);
            this.done.splice(Number(idx) + 1, 0, false);
            //console.log(this.todos);
        }
        else {
            //console.log('Hi');
        }
        var todoList = render(todo);

        outerBox.innerHTML = '';

        outerBox.appendChild(todoList);
    }

    var outerBox = document.querySelector('.outer-box');

    render = function (x) {
        //console.log(x.todos);
        var wrapper = document.createElement('div');
        for (var i = 0; i < x.todos.length; i++) {
            //console.log(typeof(x.todos[i]) !== 'string');
            if (typeof(x.todos[i]) !== 'string') {
                //console.log('HIII');
                //console.log(render(x.todos[i]));
                wrapper.appendChild(render(x.todos[i]));
                continue;
            }

            ids = ids + 1;

            var innerDiv = document.createElement('div');
            innerDiv.setAttribute('class', 'todo-item');
            //innerDiv.setAttribute('id','todo-item-'+i);

            var todoItem = document.createElement('input');
            todoItem.setAttribute('type', 'form');
            todoItem.setAttribute('disabled', 'true');
            todoItem.setAttribute('value', x.todos[i]);
            todoItem.setAttribute('id', 'form-' + ids + '-' + i);
            todoItem.addEventListener('keyup', x.onKeyUp.bind(x));
            if (x.done[i] === true) {
                todoItem.setAttribute('style', 'text-decoration: line-through');
            }
            var todoItemSpan = document.createElement('span');
            todoItemSpan.appendChild(todoItem);
            innerDiv.appendChild(todoItemSpan);

            var editButton = document.createElement('input');
            editButton.setAttribute('type', 'button');
            editButton.setAttribute('value', 'Edit');
            editButton.setAttribute('id', 'button-' + ids + '-' + i);
            editButton.addEventListener('click', x.editButtonClicked.bind(x));
            var editButtonSpan = document.createElement('span');
            editButtonSpan.setAttribute('class', 'todo-item-edit');
            editButtonSpan.appendChild(editButton);
            innerDiv.appendChild(editButtonSpan);

            var deleteButton = document.createElement('input');
            deleteButton.setAttribute('type', 'button');
            deleteButton.setAttribute('value', 'Delete');
            deleteButton.setAttribute('id', 'delete-' + ids + '-' + i);
            deleteButton.addEventListener('click', x.deleteButtonClicked.bind(x));
            var deleteButtonSpan = document.createElement('span');
            deleteButtonSpan.setAttribute('class', 'todo-item-delete');
            deleteButtonSpan.appendChild(deleteButton);
            //console.log(deleteButtonSpan);
            innerDiv.appendChild(deleteButtonSpan);

            var doneButton = document.createElement('input');
            doneButton.setAttribute('type', 'button');
            doneButton.setAttribute('id', 'done-' + ids + '-' + i);
            if (x.done[i] === false) {
                doneButton.setAttribute('value', 'Done');
            }
            else {
                doneButton.setAttribute('value', 'Undone');
            }
            doneButton.addEventListener('click', x.doneButtonClicked.bind(x));
            var doneButtonSpan = document.createElement('span');
            doneButtonSpan.setAttribute('class', 'todo-item-done-undone');
            doneButtonSpan.appendChild(doneButton);
            //console.log(doneButtonSpan);
            innerDiv.appendChild(doneButtonSpan);

            var addSubTodoButton = document.createElement('input');
            addSubTodoButton.setAttribute('type', 'button');
            addSubTodoButton.setAttribute('value', 'Add Sub-Todo');
            addSubTodoButton.setAttribute('id', 'delete-' + ids + '-' + i);
            addSubTodoButton.addEventListener('click', x.addSubTodoButtonClicked.bind(x));
            var addSubTodoButtonSpan = document.createElement('span');
            addSubTodoButtonSpan.setAttribute('class', 'todo-add-sub-todo');
            addSubTodoButtonSpan.appendChild(addSubTodoButton);
            //console.log(deleteButtonSpan);
            innerDiv.appendChild(addSubTodoButtonSpan);

            wrapper.appendChild(innerDiv);
        }
        return wrapper;
    }

    var addTodoButton = document.getElementById('add-todo-button');
    var todo = new TodoNode();
    addTodoButton.addEventListener('click', addTodoButtonClicked);

    function addTodoButtonClicked(e) {
        var addTodoForm = document.getElementById('add-todo-form');
        var todoItem = addTodoForm.value;
        todo.todos.push(todoItem);
        todo.done.push(false);
        addTodoForm.value = '';
        outerBox.innerHTML = '';
        //console.log(render(todo));
        outerBox.appendChild(render(todo));
    }
})();