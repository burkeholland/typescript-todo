"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cosmos_1 = require("@azure/cosmos");
const client = new cosmos_1.CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT,
    key: process.env.COSMOS_KEY,
});
const database = client.database('TodoList');
const container = database.container('Todos');
const todoService = {
    getTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            const { resources } = yield container.items.readAll().fetchAll();
            return resources;
        });
    },
    addTodo(newTodo) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource: createdTodo } = yield container.items.create(newTodo);
            return createdTodo;
        });
    },
    deleteTodoById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource: result } = yield container.item(id, undefined).delete();
            return result;
        });
    },
    updateTodoById(id, todoToUpdate) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource: result } = yield container
                .item(id, undefined)
                .replace(todoToUpdate);
            return result;
        });
    },
};
exports.default = todoService;
//# sourceMappingURL=todoService.js.map