//update results block
function updateResultsView(results) {
  return (document.querySelector("#total-percent").innerText =
    results.rate * 100 + "%");
}

export default updateResultsView;
