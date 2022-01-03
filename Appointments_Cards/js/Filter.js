import Visit from "./Visit.js";
import Input from "./Input.js";
import Select from "./Select.js";
import constans from "./constans.js";
import Requests from "./Request.js";
import Cards from "./Cards.js";

const filterBtn = document.querySelector(".filter__search");
console.log(filterBtn, "filterBtn");
filterBtn.addEventListener("input", async (ev) => {
  const inputSearch = document.querySelector(".filter__search").value;
  const statusVisit = document.querySelector("#time-select").value;
  const priorityVisit = document.querySelector(".filter__time > select").value;
  clearCards();
  //   const response = await getAllCards();
  const request = new Requests(constans.URL);
  request
    .get("", constans.token)
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      data.forEach((el) => {
        const status =
          new Date() < new Date(el["date-visit"]) ? "Открыт" : "Завершен";
        const { time, ...rest } = el;

        // if (time === priorityVisit && statusVisit === status) {
        if (inputSearch) {
          const strSearch = [rest.description, rest.patientName, rest.title]
            .join()
            .toLowerCase();
          const value = inputSearch.toLowerCase();
          if (strSearch.includes(value)) {
            const card = new Cards(rest, constans.fieldCardsContainer);
            card.render();
          }
          //   renderCards(el);
        }
        if (!inputSearch) {
          const card = new Cards(rest, constans.fieldCardsContainer);
          card.render();
        }
        // }
      });
    });

  //   response.data.forEach((el) => {
  //     const status =
  //       new Date() < new Date(el["date-visit"]) ? "Открыт" : "Завершен";
  //     const { time, ...rest } = el;

  //     if (time === priorityVisit && statusVisit === status) {
  //       if (inputSearch) {
  //         Object.values(rest).filter((item) => {
  //           if (item === inputSearch) renderCards(el);
  //         });
  //       }
  //       if (!inputSearch) renderCards(el);
  //     }
  //   });
});

function clearCards() {
  const container = document.querySelector(".visit, .container");
  document.querySelectorAll(".card-wrapper").forEach((card) => card.remove());
  //   container.querySelector(".visit__title").classList.toggle("hidden");
}
const clearBtn = document.querySelector(".filter__btn-clr");
clearBtn.addEventListener("click", clearCards);
