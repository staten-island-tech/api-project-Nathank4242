const Domselectors = {
  container: document.querySelector(".container"),
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
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
}

getData();
async function createCard() {
  await getData();
  result.data
    .filter((thing) => thing.category === "monsters")
    .forEach((thing) => {
      Domselectors.container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="card border-indigo-600 box-border h-128 w-60 p-4 border-4 ">
        <h2 class="card-description">${thing.description}</h2>
        <h2 class="card-drops">Drops [ ${thing.drops}]</h2>
        <img class="card-img" src="${thing.image}" alt="unfound"/>
       </div>

        


    `
      );
    });
}
createCard();
