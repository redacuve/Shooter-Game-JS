const URL = "https://us-central1-js-capstone-backend.cloudfunctions.net/api";
const endpoint = "/games";
const gameID = "fFAwWtXEc9OOLGjmoJNZ";
const gUrl = (lEndpoint = "") => {
  if (lEndpoint === "") {
    return URL + endpoint + "/" + gameID;
  } else {
    return URL + endpoint + "/" + gameID + "/" + lEndpoint;
  }
};

export async function registerGame(gameName) {
  const bodyData = JSON.stringify({ name: gameName });
  const data = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: bodyData,
  };
  const response = await fetch(gUrl(), data);
  const result = await response.json();
  return result;
}

function sortHighScores(array) {
  return array.sort((a, b) => b.score - a.score);
}

export async function getHighScores() {
  const data = {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
  };
  const response = await fetch(gUrl("scores"), data);
  const result = await response.json();
  return sortHighScores(result.result);
}

export function capitalize(str) {
  if (typeof str !== "string") {
    return str;
  }
  let str2 = "";
  let firstLetter = true;
  let i = 0;
  str = str.toLowerCase();
  while (i < str.length) {
    if (str[i].match(/[a-z]/i) && firstLetter) {
      str2 += str[i].toUpperCase();
      firstLetter = false;
    } else {
      str2 += str[i];
    }
    i += 1;
  }
  return str2;
}

export async function saveScore(user, score) {
  const bodyData = JSON.stringify({ user: user, score: score });
  const data = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: bodyData,
  };
  const response = await fetch(gUrl("scores"), data);
  const result = await response.json();
  return result.result;
}
