from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


todos = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/todos', methods=['GET', 'POST'])
def manage_todos():
    if request.method == 'POST':
        todo = request.json.get('todo')
        if todo:
            todos.append(todo)
            return jsonify({'message': 'Todo added successfully!'}), 201
    return jsonify(todos)

@app.route('/api/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    if 0 <= todo_id < len(todos):
        todos.pop(todo_id)
        return jsonify({'message': 'Todo deleted successfully!'}), 200
    return jsonify({'message': 'Todo not found.'}), 404

if __name__ == '__main__':
    app.run(debug=True)