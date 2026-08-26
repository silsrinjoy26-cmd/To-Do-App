# To-Do App

<p>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript ES6+">
  <img src="https://img.shields.io/badge/LocalStorage-Browser%20Storage-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="LocalStorage">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
</p>

A clean and responsive To-Do List web application built with **HTML, CSS, and JavaScript**. It helps users organize tasks by adding, editing, completing, filtering, moving tasks to trash, restoring them, and permanently deleting them.

## ✨ Features

- ➕ Add new tasks
- ✏️ Edit existing tasks
- ✅ Mark tasks as completed or pending
- 🔍 Filter tasks by **All, Pending, Completed,** and **Trash**
- 🗑️ Move tasks to Trash
- ♻️ Restore deleted tasks
- ❌ Permanently delete individual tasks
- 📦 Perform bulk task actions
- 🧹 Empty the entire Trash
- 💾 Save tasks using browser **localStorage**
- 📱 Responsive and clean user interface

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Structure and layout of the application |
| **CSS3** | Styling, responsive design, buttons, tables, badges, and modal UI |
| **JavaScript (ES6+)** | Task management, filtering, CRUD operations, bulk actions, and UI interaction |
| **Browser LocalStorage** | Persistent storage of tasks on the client side |
| **Git & GitHub** | Version control and project repository management |

> **Note:** The badges above are limited to technologies actually relevant to this project. Unused technologies such as OpenWeatherMap, API integrations, or Font Awesome are not included.

## 🖥️ Interface

The application provides a simple and user-friendly task management interface with:

- **Header & Add Task:** Displays the application title and provides a quick **Add Task** button.
- **Task Filters:** Separate tabs for **All, Pending, Completed,** and **Trash** tasks.
- **Task Table:** Presents task descriptions, status badges, selection controls, and available actions in an organized layout.
- **Task Actions:** Users can mark tasks as completed, edit task details, or move tasks to Trash.
- **Bulk Actions:** Multiple tasks can be selected for batch operations such as moving to Trash, restoring, or permanently deleting.
- **Trash Management:** Provides options to **Restore All** or **Empty Trash**.
- **Task Modal:** A clean modal interface is used for adding and editing task descriptions.
- **Responsive Design:** The interface uses a clean card-based layout and horizontal scrolling for the task table on smaller screens.

## 📂 Project Structure

```text
To-Do-App/
│
├── index.html
├── style.css
├── script.js
├── LICENSE
└── README.md
```

## 🚀 How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/silsrinjoy26-cmd/To-Do-App.git
   cd To-Do-App
   ```

2. Open the project folder.

3. Open `index.html` in your web browser.

> **Note:** No server or additional dependencies are required.

## 💡 How It Works

Tasks are stored in the browser using `localStorage`, allowing them to remain available after refreshing the page. JavaScript manages task creation, editing, completion status, filtering, trash management, selection, and bulk operations through an interactive table-based interface.

## 🎯 Use Case

This project is useful for managing daily tasks, learning the fundamentals of frontend web development, and understanding how JavaScript can be used to build an interactive application with client-side data persistence.

## 📌 Future Improvements

- User authentication
- Due dates and reminders
- Task priorities and categories
- Search functionality
- Dark mode
- Cloud/database storage
- Drag-and-drop task organization

## 👨‍💻 Author

**Srinjoy Sil**

## 📄 License

This project is licensed under **MIT LICENSE**
