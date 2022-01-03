"use strict";

import Visit from "./Visit.js";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import Cards from "./Cards.js";
import DentistCards from "./DentistCards.js";

class VisitDentist extends Visit {
  constructor(modalURL, cardsWindowURL) {
    super(modalURL, cardsWindowURL);
  }

  render() {
    super.render();
    // console.log(super.render);
    const dataInput = document.getElementById("visitDate").closest("label");

    const lastVisitLabel = document.createElement("label");
    lastVisitLabel.textContent = "Last visit date:";
    // test.setAttribute("for", "test");

    const lastVisit = new Input({
      type: "date",
      name: "lastVisitDate",
      isRequired: true,
      id: "lastVisitDate",
      classes: ["lastVisitDate", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    lastVisitLabel.append(lastVisit);

    // const test2 = document.createElement("label");
    // test2.textContent = "test2:";
    // test2.setAttribute("for", "test");

    // const someTest2 = new Input({
    //   type: "text",
    //   name: "purpose",
    //   isRequired: true,
    //   id: "test2",
    //   classes: ["test2", "card-input"],
    //   placeholder: "start typing test...",
    //   errorText: "all fields must be filled!",
    // }).render();

    // test2.append(someTest2);

    dataInput.before(lastVisitLabel);
  }

  submitHandler(e) {
    e.preventDefault();

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctor = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [purpose, description, patientName, lastVisitDate, visitDate] =
      inputs;

    const data = {
      doctor: doctor.value,
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
      visitDate: visitDate.value,
      lastVisitDate: lastVisitDate.value,
      priority: select.value,
    };

    const form = document.getElementById("visit-form");
    if (form) form.remove();

    const request = new Requests(constans.URL);
    const tokenID = localStorage.token;
    request
      .post(JSON.stringify(data), "", tokenID)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.doctor === "Dentist") {
          const card = new DentistCards(data, constans.fieldCardsContainer);
          card.render();
        } else {
          const card2 = new Cards(data, constans.fieldCardsContainer);
          card2.render();
        }
      });
    // const getRequest = new Requests(constans.URL);
    // getRequest
    //   .get("", tokenID)
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data));
  }
}

export default VisitDentist;
