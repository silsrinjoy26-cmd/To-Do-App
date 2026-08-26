let tasks = JSON.parse(localStorage.getItem('todo_tasks')) || [];
let currentTab = 'All';
let editTaskId = null;
let selectedTaskIds = new Set();

function saveToLocalStorage() {
  localStorage.setItem('todo_tasks', JSON.stringify(tasks));
}

function openModal(editId = null) {
  editTaskId = editId;
  const modalTitle = document.getElementById('modalTitle');
  const taskInput = document.getElementById('taskInput');
  
  if (editTaskId !== null) {
    modalTitle.textContent = 'Edit Task';
    const task = tasks.find(t => t.id === editTaskId);
    taskInput.value = task.description;
  } else {
    modalTitle.textContent = 'Add New Task';
    taskInput.value = '';
  }
  
  document.getElementById('taskModal').classList.add('active');
  taskInput.focus();
}

function closeModal() {
  document.getElementById('taskModal').classList.remove('active');
  editTaskId = null;
}

function saveTask() {
  const input = document.getElementById('taskInput');
  const text = input.value.trim();
  
  if (!text) return;

  if (editTaskId !== null) {
    const task = tasks.find(t => t.id === editTaskId);
    task.description = text;
  } else {
    tasks.push({
      id: Date.now(),
      description: text,
      status: 'Pending'
    });
  }

  saveToLocalStorage(); 
  closeModal();
  renderTasks();
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task && task.status !== 'Deleted') {
    task.status = task.status === 'Completed' ? 'Pending' : 'Completed';
    saveToLocalStorage(); 
  }
  renderTasks();
}

function deleteTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.originalStatus = task.status;
    task.status = 'Deleted';
    selectedTaskIds.delete(id);
    saveToLocalStorage();
  }
  renderTasks();
}

function restoreTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.status = task.originalStatus || 'Pending';
    selectedTaskIds.delete(id);
    saveToLocalStorage();
  }
  renderTasks();
}

function permanentDelete(id) {
  tasks = tasks.filter(t => t.id !== id);
  selectedTaskIds.delete(id);
  saveToLocalStorage();
  renderTasks();
}

function toggleSelectAll(masterCheckbox) {
  const filtered = getFilteredTasks();
  if (masterCheckbox.checked) {
    filtered.forEach(task => selectedTaskIds.add(task.id));
  } else {
    filtered.forEach(task => selectedTaskIds.delete(task.id));
  }
  renderTasks();
}

function toggleTaskSelection(id) {
  if (selectedTaskIds.has(id)) {
    selectedTaskIds.delete(id);
  } else {
    selectedTaskIds.add(id);
  }
  renderTasks();
}

function bulkMoveToTrash() {
  tasks.forEach(task => {
    if (selectedTaskIds.has(task.id)) {
      task.originalStatus = task.status;
      task.status = 'Deleted';
    }
  });
  selectedTaskIds.clear();
  saveToLocalStorage();
  renderTasks();
}

function bulkRestore() {
  tasks.forEach(task => {
    if (selectedTaskIds.has(task.id)) {
      task.status = task.originalStatus || 'Pending';
    }
  });
  selectedTaskIds.clear();
  saveToLocalStorage();
  renderTasks();
}

function bulkDelete() {
  tasks = tasks.filter(task => !selectedTaskIds.has(task.id));
  selectedTaskIds.clear();
  saveToLocalStorage();
  renderTasks();
}

function emptyTrash() {
  if (confirm("Are you sure you want to permanently delete all items in the trash?")) {
    tasks = tasks.filter(task => task.status !== 'Deleted');
    selectedTaskIds.clear();
    saveToLocalStorage();
    renderTasks();
  }
}

function restoreAllTrash() {
  if (confirm("Are you sure you want to restore all items from the trash?")) {
    tasks.forEach(task => {
      if (task.status === 'Deleted') {
        task.status = task.originalStatus || 'Pending';
      }
    });
    selectedTaskIds.clear();
    saveToLocalStorage();
    renderTasks();
  }
}

function switchTab(tab) {
  currentTab = tab;
  selectedTaskIds.clear();
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent === tab);
  });
  renderTasks();
}

function getFilteredTasks() {
  return tasks.filter(task => {
    if (currentTab === 'Pending') return task.status === 'Pending';
    if (currentTab === 'Completed') return task.status === 'Completed';
    if (currentTab === 'Trash') return task.status === 'Deleted';
    return task.status !== 'Deleted';
  });
}

function updateToolbar() {
  const toolbar = document.getElementById('toolbar');
  const bulkActions = document.getElementById('bulkActions');
  const selectedCount = document.getElementById('selectedCount');
  const bulkTrashBtn = document.getElementById('bulkTrashBtn');
  const bulkRestoreBtn = document.getElementById('bulkRestoreBtn');
  const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
  const trashTools = document.getElementById('trashTools');

  const count = selectedTaskIds.size;
  const hasTrashItems = tasks.some(t => t.status === 'Deleted');
  const showTrashTools = (currentTab === 'Trash' && hasTrashItems);
  const showBulk = count > 0 && (currentTab === 'All' || currentTab === 'Trash');

  if (showBulk || showTrashTools) {
    toolbar.classList.add('active');
  } else {
    toolbar.classList.remove('active');
  }

  trashTools.style.display = showTrashTools ? 'flex' : 'none';

  if (showBulk) {
    bulkActions.style.display = 'flex';
    selectedCount.textContent = `${count} selected`;
    
    if (currentTab === 'All') {
      bulkTrashBtn.style.display = 'inline-flex';
      bulkRestoreBtn.style.display = 'none';
      bulkDeleteBtn.style.display = 'none';
    } else if (currentTab === 'Trash') {
      bulkTrashBtn.style.display = 'none';
      bulkRestoreBtn.style.display = 'inline-flex';
      bulkDeleteBtn.style.display = 'inline-flex';
    }
  } else {
    bulkActions.style.display = 'none';
  }
}

function renderTasks() {
  const thead = document.getElementById('taskTableHead');
  const tbody = document.getElementById('taskTableBody');
  const filtered = getFilteredTasks();
  const showActions = (currentTab === 'All' || currentTab === 'Trash');
  const showCheckboxes = (currentTab === 'All' || currentTab === 'Trash');

  const allSelected = filtered.length > 0 && filtered.every(t => selectedTaskIds.has(t.id));
  thead.innerHTML = `
    <tr>
      ${showCheckboxes ? `<th style="width: 40px;"><input type="checkbox" onchange="toggleSelectAll(this)" ${allSelected ? 'checked' : ''}></th>` : ''}
      <th style="width: 80px;">Sl. No</th>
      <th>Task Description</th>
      <th style="width: 120px;">Status</th>
      ${showActions ? `<th style="width: 150px;">Actions</th>` : ''}
    </tr>
  `;

  tbody.innerHTML = '';
  updateToolbar();

  if (filtered.length === 0) {
    const colSpan = (showCheckboxes ? 1 : 0) + (showActions ? 1 : 0) + 3;
    tbody.innerHTML = `<tr><td colspan="${colSpan}" style="text-align: center; color: var(--text-muted); padding: 24px;">No tasks found</td></tr>`;
    return;
  }

  filtered.forEach((task, index) => {
    const tr = document.createElement('tr');
    const isCompleted = task.status === 'Completed';
    const isDeleted = task.status === 'Deleted';
    const isChecked = selectedTaskIds.has(task.id);

    let badgeClass = 'badge-pending';
    if (isCompleted) badgeClass = 'badge-completed';
    if (isDeleted) badgeClass = 'badge-deleted';

    let actionButtons = '';

    if (isDeleted) {
      actionButtons = `
        <div class="actions">
          <button class="action-btn restore" title="Restore Task" onclick="restoreTask(${task.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
              <path d="M12 7v5l3 2"></path>
            </svg>
          </button>
          <button class="action-btn perm-delete" title="Permanently Delete" onclick="permanentDelete(${task.id})">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 6h14"></path>
              <path d="M10 2h4"></path>
              <path d="M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6"></path>
              <path d="M9 11l6 6"></path>
              <path d="M15 11l-6 6"></path>
            </svg>
          </button>
        </div>
      `;
    } else {
      actionButtons = `
        <div class="actions">
          <button class="action-btn complete ${isCompleted ? 'is-completed' : 'is-pending'}" title="${isCompleted ? 'Mark as Pending' : 'Mark as Completed'}" onclick="toggleComplete(${task.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </button>
          <button class="action-btn edit" title="Edit Task" onclick="openModal(${task.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="action-btn delete" title="Move to Trash" onclick="deleteTask(${task.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;
    }

    tr.innerHTML = `
      ${showCheckboxes ? `<td><input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleTaskSelection(${task.id})"></td>` : ''}
      <td>${index + 1}</td>
      <td style="${isCompleted ? 'text-decoration: line-through; color: var(--text-muted);' : ''}">${task.description}</td>
      <td>
        <span class="badge ${badgeClass}">
          ${task.status}
        </span>
      </td>
      ${showActions ? `<td>${actionButtons}</td>` : ''}
    `;
    tbody.appendChild(tr);
  });
}

renderTasks();