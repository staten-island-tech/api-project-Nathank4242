import "./style.css";
async function getData() {
    //return promsises
    try{
      const response = await fetch(`https://valorant-api.com/v1/agents`);
      //gaurd clause
      if (response.status !=200){
          throw new Error(response);
      }else
      const data = await response.json
      console.log(data.data.forEach(agent) => console.log(agent.displayName));
      data.data forEach((agent) =>document.querySelector("div") .insertAdjacentHTML("afterbegin", `<h1>{agent.displayName}</h1>`))
      ;


    } catch (error){
      alert("nuh uh")
    }
  
  }
  
  getData();
  