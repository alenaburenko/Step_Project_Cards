import Login from "./Login.js";
import constans from "./constans.js";
import CreateSelect from "./CreateSelect.js";
// import Visit from "./Visit.js";
// import VisitDentist from "./VisitDentist.js";

constans.loginButton.addEventListener('click', logInModal);
function logInModal(){
        constans.ROOT.append(login.render());
        login.openModal();
}
constans.createVisitButton.addEventListener("click",() =>{
        constans.ROOT.append(selectDoctors.render());
        selectDoctors.openModal();

})
const login = new Login("modal3", ["modal", "modal1"]);
const selectDoctors = new CreateSelect("modal3", ["modal", "modal1"]);



// const filterBtn = document.querySelector(".filter__btn");

// filterBtn.addEventListener("click", async(ev) => {
//     const inputSearch = document.querySelector(".filter__search").value;
//     const statusVisit = document.querySelector("#time-select").value;
//     const priorityVisit = document.querySelector(".filter__time > select").value;
//     clearCards()
//     const response = await getAllCards();

//     response.data.forEach((el) => {
//         const status =
//             new Date() < new Date(el["date-visit"]) ? "Открыт" : "Завершен";
//         const { time, ...rest } = el;

//         if (time === priorityVisit && statusVisit === status) {
//             if (inputSearch) {
//                 Object.values(rest).filter((item) => {
//                     if (item === inputSearch) renderCards(el);
//                 });
//             }
//             if (!inputSearch) renderCards(el);
//         }
//     });
// });

// function clearCards() {
//     const container = document.querySelector(".visit, .container");
//     container.querySelectorAll(".visit-cards").forEach((card) => card.remove());
//     container.querySelector('.visit__title').classList.toggle('hidden')
// }
// const clearBtn = document.querySelector(".filter__btn-clr");
// clearBtn.addEventListener("click", clearCards);
