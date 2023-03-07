import express, { Router } from 'express';
import Todo from '../models/Todo';
import todoService from '../services/todoService';

const router: Router = express.Router();

// write a route for every method in the todoService

router.get('/', async (req, res) => {
  const todos = await todoService.getTodos();
  res.render('index', { todos });
});

router.post('/', async (req, res) => {
  const newTodo: Todo = {
    title: req.body.title,
    isCompleted: false,
  };
  await todoService.addTodo(newTodo);
  res.redirect('/');
});

router.post('/delete/:id', async (req, res) => {
  await todoService.deleteTodoById(req.params.id);
  res.redirect('/');
});

router.post('/update/:id', async (req, res) => {
  const todoToUpdate: Todo = {
    id: req.params.id,
    title: req.body.title,
    isCompleted: req.body.isCompleted === 'on',
  };
  await todoService.updateTodoById(req.params.id, todoToUpdate);
  res.redirect('/');
});

export default router;
