import * as todosServices from "../services/todos.js";

export async function createTodo(req, res) {
  const user = res.locals.user;
  const payload = {
    ...req.body,
    userId: user.id,
  };
  const data = await todosServices.createTodo(payload);

  res.status(201).json({
    message: "Todo Created Successfully",
    data,
  });
}

export async function getTodoByUserId(_req, res) {
  const user = res.locals.user;

  const todos = await todosServices.getTodoByUserId(user.id);

  res.status(200).json({
    message: "Todos retrieved successfully",
    todos,
  });
}

export async function getAllTodos(_req, res) {
  const user = res.locals.user;

  const data = await todosServices.getAllTodos(user.id);

  res.status(200).json({
    message: "All todos retrieved successfully",
    data,
  });
}

export async function getTodoByStatusIsNotCompleted(_req, res, next) {
  try {
    const user = res.locals.user;

    const todoIsNotCompleted = await todosServices.getTodoByStatusIsNotCompleted(user.id);

    res.status(200).json({
      message: "Todos retrieved successfully",
      todoIsNotCompleted,
    });
  } catch (error) {
    next(error);
  }
}

export async function getTodoByStatusIsCompleted(_req, res, next) {
  try {
    const user = res.locals.user;

    const todoIsCompleted = await todosServices.getTodoByStatusIsCompleted(user.id);

    res.status(200).json({
      message: "Todos retrieved successfully",
      todoIsCompleted,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateTodoById(req, res) {
  const user = res.locals.user;
  const { id } = req.params; //todo id

  // Get the existing todo data
  const existingTodo = await todosServices.getTodoById(id);

  // Merge the existing data with the new data from req.body
  const payload = {
    title: req.body.title !== undefined && req.body.title !== "" ? req.body.title : existingTodo.title, // if title is not provided, keep the existing title
    description: req.body.description !== undefined && req.body.description !== "" ? req.body.description : existingTodo.description, // if description is not provided, keep the existing description
    priority: req.body.priority !== undefined && req.body.priority !== "" ? req.body.priority : existingTodo.priority, // if priority is not provided, keep the existing priority
    dueDate: req.body.dueDate !== undefined && req.body.dueDate !== "" ? req.body.dueDate : existingTodo.dueDate, // if dueDate is not provided, keep the existing dueDate
    userId: user.id,
  };

  const data = await todosServices.updateTodoById(id, payload);

  res.status(200).json({
    message: "Todo updated successfully",
    data,
  });
}

export async function updateTodoStatus(req, res, next) {
    try{
        const user = res.locals.user;
        const { id } = req.params; //todo id
      
        await todosServices.updateTodoStatus(id, user.id);
      
        res.status(200).json({
          message: "Todo status updated successfully",
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteTodoById(req, res, next) {
  try {
    const user = res.locals.user;
    const { id } = req.params;

    await todosServices.deleteTodoById(id, user.id);

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
