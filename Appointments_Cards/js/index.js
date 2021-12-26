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



