window.addEventListener("load", () => {
  fetch("assets/data/content.json")
    .then((r) => r.json())
    .then(renderConent)
    .catch(console.error);
});

function renderConent({ overview, trends, unresolvedTickets, tasks }) {
  const overviewContainer = document.querySelector("#overview");
  overview
    .map(createOverviewCard)
    .forEach((card) => overviewContainer.appendChild(card));
}

function createOverviewCard({ name, count }) {
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
