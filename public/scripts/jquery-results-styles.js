$(document).ready(function () {



  const creatingResults = function () {
    const options = $(`<div class="option-with-percentage">
    <span class="option-span"> ${}  </span>
    <span class="percentage"> 50% </span>
    </div>

    <span class="bar-span" style="30%" > ................</span>`)
    return options
  }




  const func = creatingResults();

  $(`#result-div-id`).append(func)





})
