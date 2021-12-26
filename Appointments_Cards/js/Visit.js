"use strict";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import Cards from "./Cards.js";

class Visit {
  constructor(modalURL, cardsWindowURL) {
    this.modalURL = modalURL;
    this.cardsWindowURL = cardsWindowURL;
  }

  render() {
    const form = document.createElement("form");
    form.addEventListener("submit", this.submitHandler);
    form.id = "visit-form";

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
    this.modalURL.append(form);
  }

  submitHandler(e) {
    e.preventDefault();
    const inputs = [...document.getElementsByClassName("card-input")];

    const [purpose, description, patientName] = inputs;

    const data = {
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
    };

    const form = document.getElementById("visit-form");
    form.style.display = "none";

    const request = new Requests(constans.URL);
    request
      .post(JSON.stringify(data), "", constans.token)
      .then((resp) => resp.json())
      .then((data) => {
        const card = new Cards(data, constans.fieldCardsContainer);
        card.render();
      });

    const getRequest = new Requests(constans.URL);
    getRequest
      .get("", constans.token)
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }
}

export default Visit;
