import { test, expect } from '@playwright/test';

// test that the page loads and has the correct title
test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Todo List/);
});

let todoName = `${Date.now()}`;

// test that we are able to create a new todo item in the input named newTodo
test('create new todo', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.fill('input[name="newTodo"]', todoName);
  await page.press('input[name="newTodo"]', 'Enter');

  // find the input on the page with the value of todoName
  let todoInput = await page.locator(`input[value="${todoName}"]`);

  // expect that this input exists
  await expect(todoInput).toBeTruthy();
});

// test the update method by updating the value of todoInput to the current date and time stamp and then press enter
test('update todo', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // find the input on the page with the value of todoName
  let todoInput = await page.locator(`input[value="${todoName}"`);

  // save the current date and time stamp to a variable
  todoName = `${Date.now()}`;
  await todoInput.fill(todoName);
  await todoInput.press('Enter');

  // expect that todoInput now has the value of todoName
  await expect(todoInput).toHaveValue(todoName);
});

// test the delete method by clicking on the delete button that is next to the todoInput
test('delete todo', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // click on the last instance of the element with name deleteButton in the index.hbs file
  await page.locator('button[name="deleteButton"]').last().click();

  // set todoInput to the input with the value of todoName
  let todoInput = await page.locator(`input[value="${todoName}"]`);

  // expect that the todoInput does not exist
  await expect(todoInput).toBeFalsy();
});
