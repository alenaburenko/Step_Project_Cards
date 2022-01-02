import constans from "./constans.js";
import Requests from "./Request.js";
import Visit from "./Visit.js";
import Modal from "./Modal.js";

class Cards {
  constructor({ description, title, patientName, id }, url) {
    this.description = description;
    this.title = title;
    this.patientName = patientName;
    this.id = id;
    this.url = url;
  }

  cardRender() {
    this.cardWrapper = document.createElement("div");
    this.cardWrapper.classList.add(
      "card-wrapper",
      "border",
      "border-info",
      "rounded",
      "d-flex",
      "flex-column",
      "p-4",
      "bg-primary"
    );

    console.log(this.id);

    const purposeVisit = document.createElement("p");
    purposeVisit.textContent = `The problem is: ${this.title}`;
    purposeVisit.classList.add("card-info");

    const shortDescription = document.createElement("p");
    shortDescription.textContent = `Description: ${this.description}`;
    shortDescription.classList.add("card-info");

    const fullName = document.createElement("p");
    fullName.textContent = `Patient: ${this.patientName}`;
    fullName.classList.add("card-info");

    const priority = document.createElement("p");
    priority.textContent = "Must be added from select list!";
    priority.classList.add("font-weight-bold", "text-danger");

    const editBtn = document.createElement("a");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", this.editHandler);
    editBtn.classList.add("text-warning", "edit-btn", "d-inline", "card-btn");

    const showmoreBtn = document.createElement("a");
    showmoreBtn.textContent = "Show more";
    showmoreBtn.classList.add(
      "text-info",
      "showmore-btn",
      "d-inline",
      "card-btn"
    );

    const closetBtn = document.createElement("a");
    closetBtn.textContent = "X";
    closetBtn.addEventListener("click", this.closeCardHandler);
    closetBtn.classList.add("text-danger", "close-btn", "d-inline", "card-btn");

    this.cardWrapper.append(
      priority,
      purposeVisit,
      fullName,
      shortDescription,
      showmoreBtn,
      editBtn,
      closetBtn
    );
    this.url.append(this.cardWrapper);
    console.log(this.id);
  }

  closeCardHandler = (e) => {
    const request = new Requests(constans.URL);
    console.log(constans.token);
    request.delete(this.id, constans.token).then((resp) => {
      if (resp.status === 200) {
        e.target.closest(".card-wrapper").remove();

        const getRequest = new Requests(constans.URL);
        getRequest
          .get("", constans.token)
          .then((resp) => resp.json())
          .then((data) => console.log(data));
        console.log("card was removed successfully!");
      }
    });
  };

  editHandler = (e) => {
    const modalEditWindow = new Modal(
      "edit-modal",
      ["modal", "modal-content"],
      "test"
    );

    e.target.closest(".card-wrapper").remove();
    const newModal = modalEditWindow.render();
    modalEditWindow.openModal();
    constans.ROOT.append(newModal);
    const modal1 = document.getElementById("modalTitle");

    // const visit = new Visit(modal1, "");
    // visit.render();

    // const form = document.getElementById("visit-form");
    // form.id = "test";
    const form = document.createElement("form");
    form.addEventListener("submit", this.submitHandler);
    form.id = "edit-form";

    const purposeLabel = document.createElement("label");
    purposeLabel.textContent = "Purpose of visit:";
    // purposeLabel.setAttribute("for", "purpose");

    const purposeOfVisit = new Input({
      type: "text",
      name: "purpose",
      isRequired: true,
      id: "purpose",
      classes: ["purpose-of-visit", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    purposeLabel.append(purposeOfVisit);

    const descriptionLabel = document.createElement("label");
    descriptionLabel.textContent = "Short description of visit:";
    // descriptionLabel.setAttribute("for", "description");

    const visitDescription = new Input({
      type: "text",
      name: "description",
      isRequired: true,
      id: "description",
      classes: ["visit-description", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    descriptionLabel.append(visitDescription);

    const patientNameLabel = document.createElement("label");
    patientNameLabel.textContent = "Full name of patient:";
    // patientNameLabel.setAttribute("for", "patientName");

    const patientName = new Input({
      type: "text",
      name: "patientName",
      isRequired: true,
      id: "patientName",
      classes: ["patient-name", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    patientNameLabel.append(patientName);

    const dateOfVisitLabel = document.createElement("label");
    dateOfVisitLabel.textContent = "Full name of patient:";
    // dateOfVisitLabel.setAttribute("for", "visitDate");

    const dateOfVisit = new Input({
      type: "date",
      name: "visitDate",
      isRequired: true,
      id: "visitDate",
      classes: ["visit-date", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();
    dateOfVisitLabel.append(dateOfVisit);

    const btn = document.createElement("button");
    btn.textContent = "Button";
    btn.id = "submit-btn";
    btn.classList.add("btn-success", "btn", "rounded");

    form.append(
      purposeLabel,
      descriptionLabel,
      patientNameLabel,
      dateOfVisitLabel,
      btn
    );

    form.style.display = "flex";
    const [purpose, description, patientName, visitDate] = form;

    const btn = form.lastChild;
    btn.id = "edit-btn";
    btn.textContent = "Edit";
    purpose.value = "type new value";
    description.value = "type new value";
    patientName.value = "type new value";

    modalEditWindow.append(form);

    this.cardWrapper.remove();
  };

  submitHandler(e) {
    e.preventDefault();

    const data = {
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
    };
    // newModal.remove();
    // form.remove();
    const request = new Requests(constans.URL);
    request
      .put("", JSON.stringify(data), this.id, constans.token)
      .then((resp) => resp.json())
      .then((data) => {
        // const card = new Cards(data, constans.fieldCardsContainer);
        // card.cardRender();
      });
  }
}

export default Cards;
