import Input from "./Input.js";
import Modal from "./Modal.js";
import VisitDentist from "./VisitDentist.js";
import constans from "./constans.js";
class CreateSelect extends Modal {
    constructor(id, classes, text,) {
        super(id, classes, text);
        // this.cardio = cardio;
        // this.terapist = terapist;
        // this.dentist = dentist;
        this.modalInside = this.createSelect();
    }

    createSelect() {
        const wrapper = document.createElement("div");
        wrapper.classList.add("form__modal-check-doctor")
        const label = document.createElement("lebel")
        label.textContent = "Choose your doctor:"
                this.select = document.createElement("select");
                this.select.classList.add("select-checkDoctor")
                this.select.insertAdjacentHTML(
                    "afterbegin",
                    `<option selected value = Cardiologist>Cardiologist</option>
                    <option>Therapist</option>
                    <option>Dentist</option>
                    `
                );
                
        wrapper.classList.add("wrapper__modal-check-doctor")         
              this.select.addEventListener("click",(e) => {
                    e.preventDefault()
                    if(select.get() === "Cardiologist"){
                        VisitCardiologist.render()
                    }else if(select.get() === "Therapist"){
                        VisitTherapist.render()
                    }else if(select.get() === "Dentist"){
                        const visitdentist = new VisitDentist(constans.fieldCardsContainer, "");
                        visitdentist.render()
                    }
                    this.modal.remove()
                })
                wrapper.append(label,this.select)
                return wrapper                  
    }
} 
export default CreateSelect