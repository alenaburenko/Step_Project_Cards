"use strict";

import Visit from "./Visit.js";
import Input from "./Input.js";
import Requests from "./Request.js";
import constans from "./constans.js";

class VisitDentist extends Visit {
  constructor(modalURL, cardsWindowURL) {
    super(modalURL, cardsWindowURL);
  }

  render() {
    super.render();
    // console.log(super.render);
    const btn = document.getElementById("submit-btn");

    const test = document.createElement("label");
    test.textContent = "test:";
    test.setAttribute("for", "test");

    const someTest = new Input({
      type: "text",
      name: "purpose",
      isRequired: true,
      id: "test",
      classes: ["test", "card-input"],
      placeholder: "start typing test...",
      errorText: "all fields must be filled!",
    }).render();

    test.append(someTest);

    const test2 = document.createElement("label");
    test2.textContent = "test2:";
    test2.setAttribute("for", "test");

    const someTest2 = new Input({
      type: "text",
      name: "purpose",
      isRequired: true,
      id: "test2",
      classes: ["test2", "card-input"],
      placeholder: "start typing test...",
      errorText: "all fields must be filled!",
    }).render();

    test2.append(someTest2);

    btn.before(test, test2);
  }
}

export default VisitDentist;