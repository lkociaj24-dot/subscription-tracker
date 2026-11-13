const form = document.getElementById("sub-form");
const tbody = document.getElementById("table-body");

function render() {
  const list = SubLib.load();
  tbody.innerHTML = "";

  list.forEach(sub => {
    const status = SubLib.getStatus(sub);
    const badge = status === "Expired" ? "ui-badge-expired" : "ui-badge-ok";
    const row = document.createElement("tr");

    [sub.service, sub.provider, sub.subscriber, sub.renewal, sub.category].forEach(text => {
      const td = document.createElement("td");
      td.textContent = text;
      row.appendChild(td);
    });

    const statusTd = document.createElement("td");
    statusTd.innerHTML = `<span class="ui-badge ${badge}">${status}</span>`;
    row.appendChild(statusTd);

    const actionTd = document.createElement("td");
    const btn = document.createElement("button");
    btn.className = "ui-btn ui-btn-danger";
    btn.textContent = "Delete";
    btn.addEventListener("click", () => {
      SubLib.remove(sub.id);
      render();
    });
    actionTd.appendChild(btn);
    row.appendChild(actionTd);

    tbody.appendChild(row);
  });

  document.getElementById("total-count").textContent = list.length;
  document.getElementById("expired-count").textContent = SubLib.countExpired();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  SubLib.add({
    id: Date.now(),
    service: document.getElementById("service").value.trim(),
    provider: document.getElementById("provider").value.trim(),
    subscriber: document.getElementById("subscriber").value.trim(),
    renewal: document.getElementById("renewal").value,
    category: document.getElementById("category").value
  });
  form.reset();
  render();
});

render();
const tabButtons = document.querySelectorAll(".ui-tab");
const tabSections = document.querySelectorAll("main > section");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    tabButtons.forEach(b => b.classList.remove("ui-tab-active"));
    tabSections.forEach(s => s.classList.add("ui-hidden"));
    btn.classList.add("ui-tab-active");
    document.getElementById(btn.dataset.tab).classList.remove("ui-hidden");
  });
});