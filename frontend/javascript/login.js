let apiUrl = "http://localhost:3500";

async function logIn(event)
{
    event.preventDefault();

    let username = document.getElementById("loginEmailField").value;
    let password = document.getElementById("loginPasswordField").value;

    let base64 = btoa(username + ":" + password);
    let loginSuccessfully = await checkLogin(base64);

    if (loginSuccessfully)
    {
        localStorage.setItem("Authorization", base64);
        window.location = "index.html";
    }
    else
    {
        window.location = "login.html";
    }
}

async function checkLogin(base64)
{
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", base64)

    const options = {method: "GET", headers: myHeaders};

    let result;
    let resultJson;

    try
    {
        result = await fetch(apiUrl + "/checkLogin", options);
        resultJson = await result.json();

        if (resultJson.success)
        {
            return true;
        }
        else
        {
            window.location = "login.html";
            return false;
        }
    }
    catch (error)
    {
        return false;
    }
}

async function verifyAuthentication()
{
    let base64 = localStorage.getItem("Authorization");
    let loginSuccessfully = checkLogin(base64);

    if (!loginSuccessfully)
    {
        window.location = "login.html";
    }
}