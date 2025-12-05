
const stateInput = document.getElementById("inputStateName");
const btnSearch = document.getElementById("btnSearchState");

const loader = document.getElementById("loader");
const noDataMsg = document.getElementById("msgNoData");
const combinedStatsCard = document.getElementById("combinedStatsCard");

const statTotalCases = document.getElementById("statTotalCases");
const statRecovered = document.getElementById("statRecovered");
const statDeaths = document.getElementById("statDeaths");

const COVID_API = "https://api.rootnet.in/covid19-in/stats/latest";

function show(el) { el.style.display = "block"; }
function hide(el) { el.style.display = "none"; }

async function searchState() {
    const stateName = stateInput.value.trim().toLowerCase();
    if (!stateName) {
        alert("Please enter a state name");
        return;
    }

    hide(noDataMsg);
    hide(combinedStatsCard);
    show(loader);

    try {
        const resp = await fetch(COVID_API);
        if (!resp.ok) throw new Error("Network error");

        const data = await resp.json();
        const statesArray = data.data.regional;

        const state = statesArray.find(s => s.loc.toLowerCase() === stateName);

        hide(loader);

        if (!state) {
            show(noDataMsg);
            statTotalCases.textContent = "-";
            statRecovered.textContent = "-";
            statDeaths.textContent = "-";
            return;
        }

        statTotalCases.textContent = state.totalConfirmed.toLocaleString('en-IN');
        statRecovered.textContent = state.discharged.toLocaleString('en-IN');
        statDeaths.textContent = state.deaths.toLocaleString('en-IN');

        show(combinedStatsCard);

    } catch (err) {
        console.error(err);
        hide(loader);
        show(noDataMsg);
        hide(combinedStatsCard);
        statTotalCases.textContent = "-";
        statRecovered.textContent = "-";
        statDeaths.textContent = "-";
    }
}

btnSearch.addEventListener("click", searchState);

stateInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchState();
});
