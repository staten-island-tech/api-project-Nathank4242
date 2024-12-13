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

//normal card
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

//creature sort
async function filtercreature() {
  await getData();
  const creatures = result.data.filter(
    (thing) => thing.category === "creatures"
  );
  createCard(creatures);
}

document
  .getElementById("filterCreatureButton")
  .addEventListener("click", filtercreature);

//material sort
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

// monster sort
async function filtermonster() {
  await getData();
  const monsters = result.data.filter((thing) => thing.category === "monsters");
  createCard(monsters);
}

document
  .getElementById("filterMonsterButton")
  .addEventListener("click", filtermonster);

//treasure sort
async function filtertreasure() {
  await getData();
  const treasures = result.data.filter(
    (thing) => thing.category === "treasure"
  );
  createCard(treasures);
}

document
  .getElementById("filterTreasureButton")
  .addEventListener("click", filtertreasure);

// filter sort
async function filterSearch() {
  await getData();

  const searchName = document.getElementById("name").value.trim().toLowerCase();

  const filteredItems = result.data.filter((thing) =>
    thing.name.toLowerCase().includes(searchName)
  );

  searchCard(filteredItems);

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

//search card
async function searchCard(data) {
  Domselectors.container.innerHTML = "";
  data.forEach((thing) => {
    // Check if drops ex ists before putting it in a card

    const dropsHTML = thing.drops
      ? `<h2 class="card-name text-red-500 text-sm">Drops: [${thing.drops}]</h2>`
      : "";

    Domselectors.container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card border-indigo-600 box-border min-h-max w-64 p-4 border-8 m-8">
        <h2 class="card-name text-blue-600 text-xl">ID: ${thing.id} Name: ${thing.name}</h2>
        <img class="card-img" src="${thing.image}" alt="unfound"/>
        <h2 class="card-name text-green-500 text-sm">Locations: ${thing.common_locations}</h2>
        <h2 class="card-name text-black-600 text-sm">Description: ${thing.description}</h2>
        ${dropsHTML} 
      </div>
    `
    );
  });
}
