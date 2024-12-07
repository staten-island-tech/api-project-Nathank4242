const Domselectors = {
  container: document.querySelector("#container"),
  btn: document.querySelector("#btn"),
};

let result = [];

async function getData() {
  try {
    const response = await fetch(
      "https://botw-compendium.herokuapp.com/api/v3/compendium/all"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    result = await response.json();
    console.log(result);

    createCard(result.data.filter((thing) => thing.category === "monsters"));
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

async function createCard(data) {
  Domselectors.container.innerHTML = "";
  data.forEach((thing) => {
    Domselectors.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card border-indigo-600 box-border min-h-max w-64 p-4 border-8 m-8">
        <h2 class="card-name text-blue-600 text-xl">Name: ${thing.name}</h2>
        <img class="card-img" src="${thing.image}" alt="unfound"/>
      </div>
    `
    );
  });
}

getData();

async function filterMaterial() {
  await getData();
  const materials = result.data.filter(
    (thing) => thing.category === "materials"
  );
  createCard(materials);
}

document
  .getElementById("filterMaterialButton")
  .addEventListener("click", filterMaterial);

//weapon sort
async function filterequipment() {
  await getData();
  const equipments = result.data.filter(
    (thing) => thing.category === "equipment"
  );
  createCard(equipments);
}

document
  .getElementById("filterequipmentButton")
  .addEventListener("click", filterequipment);

async function filterSearch() {
  await getData();

  const searchName = document.getElementById("name").value.trim().toLowerCase();

  const filteredItems = result.data.filter((thing) =>
    thing.name.toLowerCase().includes(searchName)
  );

  createCard(filteredItems);

  // Clear the input
  document.getElementById("name").value = "";
}

document
  .getElementById("cardForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    //preventing default

    filterSearch();
  });
