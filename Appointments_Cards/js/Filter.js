import Visit from "./Visit.js";
import Input from "./Input.js";
import Select from "./Select.js";
import constans from "./constans.js";
import Requests from "./Request.js";
import Cards from "./Cards.js";
import DentistCards from "./DentistCards.js";
import CardiologistCards from "./CardiologistCards.js";
import TherapistCards from "./TherapistCards.js";

const filterBtn = document.querySelector(".filter__search");

filterBtn.addEventListener("input", async (ev) => {
  const inputSearch = document.querySelector(".filter__search").value;
  const statusVisit = document.getElementById("time-select").value;
  const priorityVisit = document.querySelector(".filter__time > select").value;
  clearCards();
  // const response = await getAllCards();
  const request = new Requests(constans.URL);
  request
    .get("", constans.token)
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((el) => {
        if (new Date() <= new Date(el["visitDate"])) {
          if (statusVisit === "Открыт") {
          }
        }

        const { visitDate, ...rest } = el;
        console.log(visitDate);
        // if (time === priorityVisit && statusVisit === status) {
        if (inputSearch) {
          const strSearch = [rest.description, rest.patientName, rest.title]
            .join()
            .toLowerCase();
          const value = inputSearch.toLowerCase();
          if (strSearch.includes(value)) {
            const card = new DentistCards(rest, constans.fieldCardsContainer);
            card.render();
          }
          //   renderCards(el);
        }
        if (!inputSearch) {
          console.log(data, el);

          if (el.doctor === "Dentist") {
            const card = new DentistCards(rest, constans.fieldCardsContainer);
            card.render();
          }
          if (el.doctor === "Therapist") {
            const card = new TherapistCards(rest, constans.fieldCardsContainer);
            card.render();
          }
          if (el.doctor === "Cardiologist") {
            const card = new CardiologistCards(
              rest,
              constans.fieldCardsContainer
            );
            card.render();
          }
        }
        // }
      });
    });

  // response.data.forEach((el) => {
  //   const status =
  //     new Date() < new Date(el["visitDate"]) ? "Открыт" : "Завершен";
  //   const { time, ...rest } = el;

  //   if (time === priorityVisit && statusVisit === status) {
  //     if (inputSearch) {
  //       Object.values(rest).filter((item) => {
  //         if (item === inputSearch) renderCards(el);
  //       });
  //     }
  //     if (!inputSearch) renderCards(el);
  //   }
  // });
});

// const timeSelect = document.getElementById("time-select");

// timeSelect.addEventListener("change", (e) => {
//   e.preventDefault();
// });

function clearCards() {
  const container = document.querySelector(".visit, .container");
  document.querySelectorAll(".card-wrapper").forEach((card) => card.remove());
  //   container.querySelector(".visit__title").classList.toggle("hidden");
}
const clearBtn = document.querySelector(".filter__btn-clr");
clearBtn.addEventListener("click", clearCards);
