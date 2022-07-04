$(document).ready(function () {

  let numberOfOptions = 2

  $(`#add-option`).on("click", (event) =>{
    event.preventDefault();
    const $option = createAnotherOption()
    numberOfOptions += 1;
    $(`#add-option-div`).append($option);


  })




  const createAnotherOption = function() {

    const $options = $(`
    <input type="text" name = "op" placeholder="Option # ${numberOfOptions}" class="option">
    <textarea name="description" class="description-class" id="description" cols="30" rows="2" placeholder="Description of your option"></textarea>
   `)

    return $options
  }






})
