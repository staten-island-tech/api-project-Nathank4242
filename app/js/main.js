async function getData() {
  try {
    const response = await fetch("https://random-d.uk/api");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
}}

getData();
