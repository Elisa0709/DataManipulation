console.log(`${cities.length} communes chargées`);

let inputDepartement="";
let arrayCities = cities.map(city => city);



function ready(callback) {
  if (document.readyState != 'loading'){
    callback();
  } else {
    document.addEventListener('DOMContentLoaded', callback);
  }
}
const getHTMLinfosCity = (city) =>{
  return `<div class="col-sm-6 col-md-4 col-lg-3 ">
    <div class="card bg-light" >
      <ul class="list-group list-group-flush">
        <li class="list-group-item bg-body-secondary fw-bold text-center">${city.nom.toUpperCase()}</li>
        <li class="list-group-item">Département : ${city.codeDepartement}</li>
        <li class="list-group-item">Nombre d'habitants : ${city.population}</li>
        <li class="list-group-item">Codes postaux : ${city.codesPostaux}</li>
      </ul>
    </div>
  </div>`}
const eraseInput = (input) => {
  let inputToErase = document.getElementById(input);
  inputToErase.value = "";
}
const displayCitiesByDept = () => {
  eraseInput("city");
  const divElement = document.getElementById('divElement');
  divElement.innerHTML = "";
  let input = document.getElementById("departement");
  let citiesByDept = cities.filter(city => city.codeDepartement === input.value);
  inputDepartement = input.value;
  let items = "";
  citiesByDept.map(getHTMLinfosCity).forEach(city => items += city);
  divElement.innerHTML = items;
}
const displayCitiesByName = () => {
  eraseInput("departement");
  eraseInput("populationRange");

  const divElement = document.getElementById('divElement');
  divElement.innerHTML = "";
  let input = document.getElementById("city");
  let citiesByDept = cities.filter(city => city.nom === input.value);
  let items = "";
  citiesByDept.map(getHTMLinfosCity).forEach(city => items += city);
  divElement.innerHTML = items;
}
const sortByPopulation = () => {
  const divElement = document.getElementById('divElement');
  divElement.innerHTML = "";

  let input = document.getElementById("departement");
  let citiesByDept = cities.filter(city => city.codeDepartement === inputDepartement);

  // On verifie que citiesByDept n'est pas vide
  if (citiesByDept.length === 0) {
    divElement.innerHTML = "<p>Aucune ville trouvée pour ce département.</p>";
    return;
  }

  // Trie les villes par population (du plus petit au plus grand), modifie le tableau citiesByDept
  citiesByDept.sort((a, b) => a.population - b.population);

  // Convertir les villes triées en HTML
  // Avec map, les éléments sont convertis en string séparées par une virgule par défaut
  // Join permet de convertir les différentes chaines de caractères en une seule string continue
  //on passe en paramètre de join une chaîne vide : c'est ce qui remplacera les virgules
  let items = citiesByDept.map(city => getHTMLinfosCity(city)).join('');
  divElement.innerHTML = items;
}
const displayRangeByPopulation = () => {
  eraseInput("departement");
  eraseInput("city");

  displayRangeByPopulationOnMenu();
  //on affiche la liste des villes dans le body
  const divElement = document.getElementById('divElement');
  divElement.innerHTML = "";
  let input = document.getElementById("populationRange");
  let citiesByDept = cities.filter(city => city.population > input.value);
  inputDepartement = input.value;
  let items = "";
  citiesByDept.map(getHTMLinfosCity).forEach(city => items += city);
  divElement.innerHTML = items;

}
const displayRangeByPopulationOnMenu = () => {
  //on affiche la value de l'input range dans le menu
  const divToDisplay = document.getElementById('populationRangeDisplay');
  const populationRange = document.getElementById('populationRange');
  divToDisplay.innerHTML = populationRange.value + ' habitants';
}
const getMaxPopulation = () => {
  let test = arrayCities.sort((a,b) => b.population - a.population);
  let cityResult = test.find(city => city.population>100);
  return cityResult.population;
}
const setHtmlAttributeValue = (attributName, attributValue, elementID) =>{
  let element = document.getElementById(elementID);
  element.setAttribute(attributName, attributValue);
}









//fonctions exécutées
//ready(displayCities);
setHtmlAttributeValue('max', getMaxPopulation(), 'populationRange');

