////////////////// Part of Legacy Modal Function ///////////////
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = modal.style.display === "block" ? "none" : "block";
  }
}
//////////////////////////////////////////////////////
// /////////////////////////////////////////////

// //////// universal button listener //////////
////// event.target.textContent used to get content of clicked element
////// event.target.tagName used toget the element tagname DIV BUTTON etc
////// event.target.id used to get id of clicked element
////// event.target.className
////// event.target.getAttribute("data-modal")   for custom attribute value <element data-modal=""
////// event.target.classList.contains("open-modal")  get class within many class
////// event.target.parentElement.parentElement.id   get parent of parent current element
////// event.target.children[0] get children

function formodalfunction(target, event) {
  // ///////////////// For Opening Both Legacy or Modern Modal //////////////////////
  if (target.tagName === "BUTTON") {
    if (
      target.getAttribute("data-modal") != null &&
      target.classList.contains("open-modal")
    ) {
      let modal = document.getElementById(target.getAttribute("data-modal"));
      if (modal.tagName == "DIALOG") {
        modal.showModal();
      }
      if (modal.tagName == "DIV") {
        toggleModal(target.getAttribute("data-modal"));
      }
    }
  }
  ///////////////////////////////////////////////////////////////////////////////
  //////////////////// For Closing Legacy Modal ////////////////////////////////
  if (target.tagName === "SPAN") {
    if (target.className == "close") {
      if (
        target.parentElement.id != null &&
        target.parentElement.tagName == "DIALOG"
      ) {
        let modal = document.getElementById(target.parentElement.id);
        modal.close();
      } else {
        toggleModal(target.parentElement.parentElement.id);
      }
    }
  }
  ///////////////////////////////////////////////////////////////////////
  ///////////// For Closing Modal Legacy By clicking Backdrop //////////////////
  if (target.tagName === "DIV" && target.classList.contains("modal1")) {
    toggleModal(target.id);
  }
  //////////////////////////////////////////////////////
  /////////////////// For Closing Dialog ///////////////////////

  if (target.tagName === "DIALOG") {
    const modal = document.getElementById(target.id);
    const dialogDimensions = modal.getBoundingClientRect();
    if (
      event.clientX < dialogDimensions.left ||
      event.clientX > dialogDimensions.right ||
      event.clientY < dialogDimensions.top ||
      event.clientY > dialogDimensions.bottom
    ) {
      modal.close();
    }
  }
  //////////////////////////////////////////////////////
}

document.addEventListener("click", (event) => {
  const target = event.target;

  formodalfunction(target, event);

  //// for another function like GET POST
  ////  or for CRUD
  console.log("just clicked");
});
