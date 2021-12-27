import constans from "./constans.js";
import Requests from "./Request.js";
import Visit from "./Visit.js";

class Cards {
  constructor({ description, title, patientName, id }, url) {
    this.description = description;
    this.title = title;
    this.patientName = patientName;
    this.id = id;
    this.url = url;
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
    const visit = new Visit("", constans.fieldCardsContainer);
    visit.editedRender();
    const form = document.getElementById("visit-form");

    // const newForm = form.cloneNode(true);
    form.style.display = "flex";
    form.style.position = "absolute";
    const [purpose, description, patientName, visitDate] = form;

    const btn = form.lastChild;
    btn.id = "edit-btn";
    btn.textContent = "Edit";
    console.log(purpose.value);
    purpose.value = "type new value";
    description.value = "type new value";
    patientName.value = "type new value";

    this.cardWrapper.remove();
    constans.fieldCardsContainer.append(form);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = {
        title: purpose.value,
        description: description.value,
        patientName: patientName.value,
      };

      form.remove();
      const request = new Requests(constans.URL);
      request
        .put("", JSON.stringify(data), this.id, constans.token)
        .then((resp) => resp.json())
        .then((data) => {
          const card = new Cards(data, constans.fieldCardsContainer);
          card.render();
        });
    });
  };
}

export default Cards;
