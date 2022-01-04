"use strict";

import Visit from "./Visit.js";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";
import Cards from "./Cards.js";
import TherapistCards from "./TherapistCards.js";

class VisitTherapist extends Visit {
  constructor(modalURL, cardsWindowURL) {
    super(modalURL, cardsWindowURL);
  }

  render() {
    super.render();
    const dataInput = document.getElementById("visitDate").closest("label");

    const patientAgeLabel = document.createElement("label");
    patientAgeLabel.textContent = "Patient's age:";

    const patientAge = new Input({
      type: "number",
      name: "age",
      isRequired: true,
      id: "age",
      classes: ["age", "card-input"],
      placeholder: "start typing...",
      errorText: "all fields must be filled!",
    }).render();

    patientAgeLabel.append(patientAge);

    dataInput.before(patientAgeLabel);
  }

  submitHandler(e) {
    e.preventDefault();

    const inputs = [...document.getElementsByClassName("card-input")];
    const doctor = document.getElementById("createVisitSelect");
    const select = document.getElementById("prioritySelect");
    const [purpose, description, patientName, age, visitDate] = inputs;

    const data = {
      doctor: doctor.value,
      title: purpose.value,
      description: description.value,
      patientName: patientName.value,
      visitDate: visitDate.value,
      age: age.value,
      priority: select.value,
    };

<<<<<<< HEAD
    const form = document.getElementById("visit-form");
=======
    const form = document.getElementById("modal3");
>>>>>>> c430d4678b8c3a4eb5b81928daf361def7c7ba79
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
        } else if (data.doctor === "Cardiologist") {
          const card2 = new CardiologistCards(
            data,
            constans.fieldCardsContainer
          );
          card2.render();
        } else {
          const card3 = new TherapistCards(data, constans.fieldCardsContainer);
          card3.render();
        }
      });
  }
}

<<<<<<< HEAD
export default VisitTherapist;
=======
export default VisitTherapist;
>>>>>>> c430d4678b8c3a4eb5b81928daf361def7c7ba79
