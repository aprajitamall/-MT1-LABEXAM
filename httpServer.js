import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let tasks = [
    {
        id: 1,
        taskName: "Develop Login Page",
        assignedTo: "Rahul Sharma",
        status: "Pending"
    },
    {
        id: 2,
        taskName: "Design Dashboard",
        assignedTo: "Priya Singh",
        status: "Completed"
    },
    {
        id: 3,
        taskName: "Test Website",
        assignedTo: "Amit Kumar",
        status: "In Progress"
    }
];
const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>Welcome to Employee Task Management System</h1>
        <p>Node.js HTTP Server is working successfully.</p>
    `);
}
else if (req.url === "/tasks" && req.method === "GET") {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify(tasks, null, 2));
}
else if (req.url === "/about" && req.method === "GET") {

    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    res.end(`
        <h1>About Us</h1>
        <p>This is an Employee Task Management Application.</p>
        <p>It is developed using Node.js.</p>
    `);
}
else if (req.url === "/home" && req.method === "GET") {

    const filePath = path.join(
        __dirname,
        "public",
        "index.html"
    );

    fs.readFile(filePath, "utf8", (err, data) => {

        if (err) {

            res.writeHead(500, {
                "Content-Type": "text/plain"
            });

            res.end("Error reading HTML file");
            return;
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
}
else if (req.url === "/add-task" && req.method === "POST") {

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {

        try {

            const newTask = JSON.parse(body);

            const { id, taskName, assignedTo, status } = newTask;

            if (
                id === undefined ||
                !taskName ||
                !assignedTo ||
                !status
            ) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "All required fields are necessary"
                }));

                return;
            }

            if (tasks.some(task => task.id === id)) {

                res.writeHead(400, {
                    "Content-Type": "application/json"
                });

                res.end(JSON.stringify({
                    message: "Task ID already exists"
                }));

                return;
            }

            tasks.push(newTask);

            res.writeHead(201, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Task added successfully",
                task: newTask
            }));

        } catch (error) {

            res.writeHead(400, {
                "Content-Type": "application/json"
            });

            res.end(JSON.stringify({
                message: "Invalid JSON data"
            }));
        }
    });
}
else {

    res.writeHead(404, {
        "Content-Type": "text/plain"
    });

    res.end("404 - Route Not Found");
}

});
server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});