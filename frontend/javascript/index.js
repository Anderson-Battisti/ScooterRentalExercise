let apiUrl = "http://localhost:3500";

async function listAllScooters()
{
    let result = await fetch(apiUrl + "/listScooters", {headers: buildHeaders()});
    if (userIsNotLogged(result)) return;
    let resultJson = await result.json();
    let scooters = resultJson.scooters;

    let html = "";

    if (scooters.length > 0)
    {
        for (let i = 0; i < scooters.length; i++)
        {
            let scooter = scooters[i];
            let rentBtn = `<button onclick="rentScooter(${scooter.id});" class="btn btn-primary listBtn">Alugar</button>`;
            let returnBtn = `<button onclick="returnScooter(${scooter.id});" class="btn btn-primary listBtn">Devolver</button>`;

            if (scooter != null)
            {
                let status;
                scooter.rented === true ? status = "Alugado" : status = "Disponível";
                html += `<tr>
                            <td class="buttons">${rentBtn}${returnBtn}</td>
                            <td>${scooter.id}</td>
                            <td>${status}</td>
                         </tr>`;
            } 
        }
        document.getElementById("tableBody").innerHTML = html;
    }
    else
    {
        document.getElementById("tableBody").innerHTML = ""; 
    }  
}

async function rentScooter(id)
{
    let options =
    {
        method: "PUT",
        headers: buildHeaders(),
        body: JSON.stringify({id})
    };

    try
    {
        await fetch(apiUrl + "/rentScooter", options);
    }
    catch(error)
    {
        alert("Um erro ocorreu ao processar a solicitação.");
    }

    listAllScooters();
}

async function returnScooter(id)
{
    let options =
    {
        method: "PUT",
        headers: buildHeaders(),
        body: JSON.stringify({id})
    }

    try
    {
        await fetch(apiUrl + "/returnScooter", options);
    }
    catch(error)
    {
        alert("Um erro ocorreu ao processar a solicitação.");
    }

    listAllScooters();
}

function buildHeaders()
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", localStorage.getItem("Authorization"));

    return myHeaders;
}