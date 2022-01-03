import constans from "./constans.js";
import Requests from "./Request.js";
import Visit from "./Visit.js";
import Modal from "./Modal.js";
import Cards from "./Cards.js";
import VisitDentist from "./VisitDentist.js";

class DentistCards {
  constructor(
    {
      description,
      title,
      patientName,
      id,
      priority,
      lastVisitDate,
      doctor,
      visitDate,
    },
    url
  ) {
    this.description = description;
    this.title = title;
    this.patientName = patientName;
    this.id = id;
    this.priority = priority;
    this.doctor = doctor;
    this.visitDate = visitDate;
    this.url = url;
    this.lastVisitDate = lastVisitDate;
  }

  render() {
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

    const doctorName = document.createElement("p");
    doctorName.textContent = `The doctor is: ${this.doctor}`;
    doctorName.classList.add("card-info");

    const shortDescription = document.createElement("p");
    shortDescription.textContent = `Description: ${this.description}`;
    shortDescription.classList.add("card-info");

    const fullName = document.createElement("p");
    fullName.textContent = `Patient: ${this.patientName}`;
    fullName.classList.add("card-info");

    const priority = document.createElement("p");
    priority.textContent = `Priority: ${this.priority}`;
    priority.classList.add("font-weight-bold");

    const lastVisit = document.createElement("p");
    lastVisit.textContent = `Last visit date: ${this.lastVisitDate}`;
    lastVisit.classList.add("font-weight-bold");

    const visitTime = document.createElement("p");
    visitTime.textContent = `Last visit date: ${this.visitDate}`;
    visitTime.classList.add("font-weight-bold");

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
      doctorName,
      fullName,
      purposeVisit,
      shortDescription,
      lastVisit,
      visitTime,
      showmoreBtn,
      editBtn,
      closetBtn
    );
    this.url.append(this.cardWrapper);
    console.log(this.id);
  }

  editHandler = (e) => {
    const modalEditWindow = new Modal(
      "edit-modal",
      ["modal", "modal-content"],
      "test"
    );

    const newModal = modalEditWindow.render();
    modalEditWindow.openModal();
    constans.ROOT.append(newModal);
    const modal = document.getElementById("modalTitle");

    const editForm = new VisitDentist(modal, "");

    editForm.submitHandler = (e) => {
      e.preventDefault();

      const inputs = [...document.getElementsByClassName("card-input")];
      const doctorSelect = document.getElementById("createVisitSelect");
      const select = document.getElementById("prioritySelect");
      const [
        priority,
        doctor,
        patientName,
        purpose,
        description,
        lastVisitDate,
        visitDate,
      ] = inputs;

      const data = {
        doctor: doctorSelect.value,
        title: purpose.value,
        description: description.value,
        patientName: patientName.value,
        visitDate: visitDate.value,
        lastVisitDate: lastVisitDate.value,
        priority: select.value,
      };

      const request = new Requests(constans.URL);
      request
        .put("", JSON.stringify(data), this.id, constans.token)
        .then((resp) => resp.json())
        .then((data) => {
          const card = new DentistCards(data, constans.fieldCardsContainer);
          card.render();
          this.cardWrapper.remove();
          document.getElementById("edit-modal").remove();
          console.log("PUT is succesful");
        });
    };

    editForm.render();

    // const inputs = [...document.getElementsByClassName("card-input")];
    // const [purpose, description, patientName] = inputs;

    purpose.value = this.title;
    description.value = this.description;
    patientName.value = this.patientName;
    visitDate.value = this.visitDate;
    lastVisitDate.value = this.lastVisitDate;
    priority.value = this.priority;
    doctorSelect.value = this.doctor;
  };
}

export default DentistCards;