import { CosmosClient } from '@azure/cosmos';
import Todo from '../models/Todo';

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});

const database = client.database('TodoList');
const container = database.container('Todos');

const todoService = {
  async getTodos() {
    const { resources } = await container.items.readAll().fetchAll();
    return resources;
  },
  async addTodo(newTodo: Todo) {
    const { resource: createdTodo } = await container.items.create(newTodo);
    return createdTodo;
  },
  async deleteTodoById(id: string) {
    const { resource: result } = await container.item(id, undefined).delete();
    return result;
  },
  async updateTodoById(id: string, todoToUpdate: Todo) {
    const { resource: result } = await container
      .item(id, undefined)
      .replace(todoToUpdate);
    return result;
  },
};

export default todoService;
