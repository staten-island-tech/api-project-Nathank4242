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

async function filterWeapons() {
  await getData();
  const weapons = result.data.filter((thing) => thing.category === "weapons");
  createCard(weapons);
}

document
  .getElementById("filterWeaponsButton")
  .addEventListener("click", filterWeapons);

async function filterSearch() {
  await getData();
  const materials = result.data.filter(
    (thing) => thing.category === "materials"
  );
  createCard(materials);
}

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const searchName = document
      .getElementById("name")
      .value.trim()
      .toLowerCase(); // Get the input value and convert to lowercase

    // Filter the data based on the entered name
    const filteredItems = result.data.filter((thing) =>
      thing.name.toLowerCase().includes(searchName)
    );

    createCard(filteredItems);

    document.getElementById("name").value = "";
  });
