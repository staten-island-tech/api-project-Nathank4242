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
  result.data.forEach((thriller) => console.log(thriller.description));
  Domselectors.container.insertAdjacentHTML(
    "beforeend",
    `
    <h2>${thriller.description}</h2
    <img scr="${thriller.image}><img>
    `
  );
}
createCard();
