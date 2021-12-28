import Input from "./Input.js";
import Modal from "./Modal.js";
import VisitDentist from "./VisitDentist.js";
import constans from "./constans.js";
import Select from "./Select.js";
class CreateSelect extends Modal {
  constructor(id, classes, text) {
    super(id, classes, text);
    this.modalInside = this.createSelect();
  }
  createSelect() {
    const wrapper = document.createElement("div");
    const createVisitSelect = new Select();
    const select = createVisitSelect.create()
    createVisitSelect.addOption('Терапевт', 'therapist');
    createVisitSelect.addOption('Стоматолог', 'dentist');
    createVisitSelect.addOption('Кардиолог', 'cardiologist');
    createVisitSelect.baseAttr('createVisitSelect');
    wrapper.classList.add("form__modal-check-doctor");
    const label = document.createElement("lebel");
    label.textContent = "Choose your doctor:";
    wrapper.classList.add("wrapper__modal-check-doctor");
   
   select.addEventListener("change", (e) => {
      e.preventDefault();
      if (createVisitSelect.value === "Cardiologist") {
        VisitCardiologist.render();
      } else if (createVisitSelect.value === "Therapist") {
        VisitTherapist.render();
      } else if (createVisitSelect.value === "Dentist") {
        console.log(constans.modalContent);
        const visitdentist = new VisitDentist(constans.modalContent[0], ""); 
        visitdentist.render();
      }
    });
    wrapper.append(label,select);
    return wrapper;
  }
}
export default CreateSelect;




