const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('result');
function searchCondition() {
    const input = document.getElementById('travelInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';
    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        let recommendations = [];
        if(input == "beach" || input == "beaches") {
            recommendations.push(...data.beaches);
        } else if(input == "temple" || input == "temples") {
            recommendations.push(...data.temples);
        } else if(input == "country" || input == "countries") {
            data.countries.forEach(country => recommendations.push(...country.cities));
            // recommendations.push(...data.countries.flatMap(country => country.cities));
        }
        if (recommendations) {
            recommendations.forEach((recommendation) => {
                const div = document.createElement("div");
                const img = document.createElement("img");
                const h2 = document.createElement("h2");
                const p = document.createElement("p");
                const button = document.createElement("button");
                img.setAttribute("src", recommendation.imageUrl);
                img.style.width = "100%";
                h2.textContent = recommendation.name;
                p.innerText = recommendation.description;
                button.innerText = "Visit";
                div.setAttribute('style', 'background-color: white;');
                div.appendChild(img);
                div.appendChild(h2);
                div.appendChild(p);
                div.appendChild(button);
                resultDiv.appendChild(div);
            });
        } else {
          resultDiv.innerHTML = 'Recommendations not found.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
      });
  }
  function clearResult() {
    console.log("clear functionality called");
    document.getElementById('travelInput').value = '';
    resultDiv.innerHTML = "";
  }
btnSearch.addEventListener('click', searchCondition);
btnClear.addEventListener('click', clearResult);