// load content.json when page loads
window.addEventListener("load", () => {
  fetch("assets/data/content.json")
    .then((r) => r.json())
    // call my function to render page content
    .then(renderConent)
    .catch(console.error);
});

// add content to page based on json data
function renderConent({ overview, trends, unresolvedTickets, tasks }) {
  // 1. find the section of page to add content (document.querySelector)
  // 2. create a html element for each record (Array.map)
  // 3. append html elements to the container (Array.forEach(container.appendChild))

  // overview
  const overviewContainer = document.querySelector("#overview");
  overview.map(renderOverview).forEach((e) => overviewContainer.appendChild(e));

  // trends
  const trendsContainer = document.querySelector("#trends");
  trends.map(renderTrends).forEach((e) => trendsContainer.appendChild(e));

  // tickets
  const unresolvedTicketsContainer =
    document.querySelector("#unresolvedTickets");
  unresolvedTickets
    .map(renderUnresolvedTickets)
    .forEach((e) => unresolvedTicketsContainer.appendChild(e));

  // tasks
  const tasksContainer = document.querySelector("#tasks");
  tasks.map(renderTasks).forEach((e) => tasksContainer.appendChild(e));
}

function renderOverview({ name, count }) {
  /* <div class="col-12 col-sm-6 col-md-3">
    <div class="card">
        <div class="card-body d-flex flex-column align-items-center justify-content-center">
            <h2 class="fs-4 text-secondary">Unresolved</h2>
            <p class="fs-1 fw-bold">60</p>
        </div>
    </div>
</div> */
  const d1 = document.createElement("div");
  d1.classList.add("col-12", "col-sm-6", "col-md-3");
  const d2 = document.createElement("div");
  d2.classList.add("card");
  d1.appendChild(d2);
  const d3 = document.createElement("div");
  d3.classList.add(
    "card-body",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center"
  );
  d2.appendChild(d3);
  const h = document.createElement("h2");
  h.classList.add("fs-4", "text-secondary");
  h.innerText = name;
  const p = document.createElement("p");
  p.classList.add("fs-1", "fw-bold");
  p.innerText = count;
  d3.appendChild(h);
  d3.appendChild(p);
  return d1;
}

function renderTrends({ name, value }) {
  /* <li class="list-group-item d-flex flex-column align-items-center justify-content-center flex-grow-1">
    <h3 class="fs-6 text-secondary">Resolved</h3><span class="fw-bold">449</span>
</li> */
  const li = document.createElement("li");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "flex-column",
    "align-items-center",
    "justify-content-center",
    "flex-grow-1"
  );
  const h = document.createElement("h3");
  h.classList.add("fs-6", "text-secondary");
  h.innerText = name;
  const span = document.createElement("span");
  span.classList.add("fw-bold");
  span.textContent = value;
  li.appendChild(h);
  li.appendChild(span);
  return li;
}

function renderUnresolvedTickets({ name, value }) {
  /* <li class="list-group-item d-flex justify-content-between">
    <span class="fw-bold">Waiting on Feature Request</span>
    <span class="text-secondary">4238</span>
</li>*/
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between");
  const s1 = document.createElement("span");
  s1.classList.add("fw-bold");
  s1.textContent = name;
  const s2 = document.createElement("span");
  s2.classList.add("text-secondary");
  s2.textContent = value;
  li.appendChild(s1);
  li.appendChild(s2);
  return li;
}

let taskCounter = 0; // to get unique id for task checkbox input and label

function renderTasks({ name, category, complete }) {
  /* <li class="list-group-item d-flex justify-content-between">
<div class="form-check form-check-inline">
    <input class="form-check-input rounded-circle" type="checkbox" name="tasks"
    value="Finish Ticket Update" id="task1">
    <label class="form-check-label fw-bold" for="task1">Finish ticket update</label>
</div>
<span class="badge text-bg-warning d-flex align-items-center">URGENT</span>
</li>*/
  const taskId = `task${++taskCounter}`;
  const li = document.createElement("li");
  li.classList.add("list-group-item", "d-flex", "justify-content-between");

  const d = document.createElement("div");
  d.classList.add("form-check", "form-check-inline");
  const input = document.createElement("input");
  input.classList.add("form-check-input", "rounded-circle");
  input.type = "checkbox";
  input.name = "tasks";
  input.value = name;
  input.id = taskId;
  input.checked = complete;
  const label = document.createElement("label");
  label.classList.add("form-check-label", "fw-bold");
  label.htmlFor = taskId;
  label.innerText = name;
  d.appendChild(input);
  d.appendChild(label);

  const badge = document.createElement("span");
  badge.classList.add("badge", "d-flex", "align-items-center");
  badge.innerText = category;
  switch (category) {
    case "URGENT":
      badge.classList.add("text-bg-warning");
      break;
    case "NEW":
      badge.classList.add("text-bg-success");
      break;
    default:
      badge.classList.add("text-bg-secondary");
  }
  li.appendChild(d);
  li.appendChild(badge);
  return li;
}
