import express from "express";

const app = express();

app.use(express.json());

// Sample tasks
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending",
        priority: "High"
    },
    {
        id: 2,
        taskName: "Design Dashboard",
        assignedTo: "Priya Singh",
        status: "Completed",
        priority: "Medium"
    },
    {
        id: 3,
        taskName: "Test Website",
        assignedTo: "Amit Kumar",
        status: "In Progress",
        priority: "Low"
    }
];

// 1. GET all tasks
app.get("/tasks", (req, res) => {
    res.status(200).json(tasks);
});

// 2. GET task by ID
app.get("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
});

// 3. POST - Add new task
app.post("/tasks", (req, res) => {
    const { id, taskName, assignedTo, status, priority } = req.body;

    if (!id || !taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (tasks.some(t => t.id === Number(id))) {
        return res.status(409).json({ message: "Task ID already exists" });
    }

    const newTask = {
        id: Number(id),
        taskName,
        assignedTo,
        status,
        priority
    };

    tasks.push(newTask);

    res.status(201).json({
        message: "Task added successfully",
        task: newTask
    });
});

// 4. PUT - Update task
app.put("/tasks/:id", (req, res) => {
    const task = tasks.find(t => t.id === Number(req.params.id));

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    const { taskName, assignedTo, status, priority } = req.body;

    if (!taskName || !assignedTo || !status || !priority) {
        return res.status(400).json({ message: "All fields are required" });
    }

    task.taskName = taskName;
    task.assignedTo = assignedTo;
    task.status = status;
    task.priority = priority;

    res.status(200).json({
        message: "Task updated successfully",
        task
    });
});

// 5. DELETE - Delete task
app.delete("/tasks/:id", (req, res) => {
    const index = tasks.findIndex(t => t.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const deletedTask = tasks.splice(index, 1);

    res.status(200).json({
        message: "Task deleted successfully",
        task: deletedTask[0]
    });
});

// Start server
app.listen(4000, () => {
    console.log("Express server running on port 4000");
});