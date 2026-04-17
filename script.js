document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // PROFILE CARD LOGIC
  // ==========================================
  const timeEl = document.querySelector('[data-testid="test-user-time"]');
  const announceBtn = document.getElementById("announce-time-btn");
  const timeAnnouncer = document.getElementById("time-announcer");

  function updateProfileTime() {
    if (timeEl) {
      timeEl.textContent = Date.now();
    }
  }

  updateProfileTime();
  setInterval(updateProfileTime, 50); // Fast interval for ms precision visual effect

  // Screen reader polite announcement
  announceBtn.addEventListener("click", () => {
    const currentTime = Date.now();
    timeAnnouncer.textContent = `Current epoch time is ${currentTime} milliseconds`;
  });

  // ==========================================
  // ADVANCED TODO CARD LOGIC
  // ==========================================

  const now = new Date();
  const initialDueDate = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  let todoState = {
    title: "Critical security patch deploy",
    description:
      "Apply CVE-2026-1337 patch across all nodes. Requires a coordinated rolling restart. Coordinate with SRE on the night shift to ensure zero downtime.",
    priority: "Urgent",
    status: "Pending",
    dueDate: initialDueDate.toISOString().slice(0, 16),
  };

  const cardEl = document.getElementById("todo-container");
  const viewEl = document.getElementById("todo-view");
  const editEl = document.getElementById("todo-edit-form");

  const displayTitle = document.getElementById("display-title");
  const displayDesc = document.getElementById("display-desc");
  const displayPriority = document.getElementById("display-priority");
  const priorityIndicator = document.getElementById("priority-indicator");
  const displayStatus = document.getElementById("display-status");
  const displayTime = document.getElementById("display-time");
  const overdueBadge = document.getElementById("display-overdue");
  const checkbox = document.getElementById("todo-checkbox");
  const statusSelect = document.getElementById("status-select");
  const btnExpand = document.getElementById("btn-expand");
  const descContainer = document.getElementById("desc-container");
  const btnEdit = document.getElementById("btn-edit");

  const inputTitle = document.getElementById("input-title");
  const inputDesc = document.getElementById("input-desc");
  const inputPriority = document.getElementById("input-priority");
  const inputDate = document.getElementById("input-date");
  const btnCancel = document.getElementById("btn-cancel");

  function renderTodo() {
    displayTitle.textContent = todoState.title;
    displayDesc.textContent = todoState.description;
    displayPriority.textContent = todoState.priority;
    displayStatus.textContent = todoState.status;

    const isDone = todoState.status === "Done";
    checkbox.checked = isDone;
    statusSelect.value = todoState.status;

    if (isDone) {
      cardEl.classList.add("is-done");
    } else {
      cardEl.classList.remove("is-done");
    }

    displayPriority.className = `badge badge-${todoState.priority.toLowerCase()}`;
    priorityIndicator.className = `priority-indicator ${todoState.priority.toLowerCase()}`;

    if (todoState.description.length < 80) {
      btnExpand.classList.add("hidden");
      descContainer.classList.remove("collapsed");
    } else {
      btnExpand.classList.remove("hidden");
    }

    updateTimeRemaining();
  }

  function updateTimeRemaining() {
    if (todoState.status === "Done") {
      displayTime.textContent = "Completed";
      overdueBadge.classList.add("hidden");
      cardEl.classList.remove("is-overdue-card");
      return;
    }

    const currentNow = new Date();
    const due = new Date(todoState.dueDate);
    const diffMs = due - currentNow;
    const isOverdue = diffMs < 0;
    const absMs = Math.abs(diffMs);

    const mins = Math.floor(absMs / 60000);
    const hours = Math.floor(mins / 60);
    const days = Math.floor(hours / 24);

    let timeString = "";
    if (days > 0) {
      timeString = `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      timeString = `${hours} hour${hours > 1 ? "s" : ""}`;
    } else {
      timeString = `${mins} minute${mins !== 1 ? "s" : ""}`;
    }

    if (isOverdue) {
      displayTime.textContent = `Overdue by ${timeString}`;
      overdueBadge.classList.remove("hidden");
      cardEl.classList.add("is-overdue-card");
    } else {
      displayTime.textContent = `Due in ${timeString}`;
      overdueBadge.classList.add("hidden");
      cardEl.classList.remove("is-overdue-card");
    }
  }

  function toggleEditMode(showEdit) {
    if (showEdit) {
      inputTitle.value = todoState.title;
      inputDesc.value = todoState.description;
      inputPriority.value = todoState.priority;
      inputDate.value = todoState.dueDate;

      viewEl.classList.add("hidden");
      editEl.classList.remove("hidden");
      inputTitle.focus();
    } else {
      editEl.classList.add("hidden");
      viewEl.classList.remove("hidden");
      btnEdit.focus();
    }
  }

  btnEdit.addEventListener("click", () => toggleEditMode(true));
  btnCancel.addEventListener("click", () => toggleEditMode(false));

  editEl.addEventListener("submit", (e) => {
    e.preventDefault();
    todoState.title = inputTitle.value;
    todoState.description = inputDesc.value;
    todoState.priority = inputPriority.value;
    todoState.dueDate = inputDate.value;

    toggleEditMode(false);
    renderTodo();
  });

  checkbox.addEventListener("change", (e) => {
    todoState.status = e.target.checked ? "Done" : "Pending";
    renderTodo();
  });

  statusSelect.addEventListener("change", (e) => {
    todoState.status = e.target.value;
    renderTodo();
  });

  btnExpand.addEventListener("click", () => {
    const isCollapsed = descContainer.classList.contains("collapsed");
    if (isCollapsed) {
      descContainer.classList.remove("collapsed");
      btnExpand.textContent = "Show less";
    } else {
      descContainer.classList.add("collapsed");
      btnExpand.textContent = "Show more";
    }
  });

  renderTodo();
  setInterval(updateTimeRemaining, 30000);
});
