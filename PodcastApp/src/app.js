import { Question } from "./question"
import { createModal, isValid } from "./utils";
import { getAuthForm, authWithEmailAndPassword } from "./auth";
import "./styles.css"

const form = document.getElementById("form");
const modalBtn = document.getElementById("modal-btn");
const input = form.querySelector("#question-input");
const submitBtn = form.querySelector("#submit");

window.addEventListener("load", Question.renderList());

form.addEventListener("submit", submitFormHandler);
modalBtn.addEventListener("click", openModal);

input.addEventListener("input", () => {
    submitBtn.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
    event.preventDefault();

    if (isValid(input.value)) {
        const question = {
            text: input.value,
            date: new Date().toJSON()
        };

        submitBtn.disabled = true;

        Question.create(question).then(() => {
            input.value = "";
            input.className = "";
            submitBtn.disabled = false;

        });
    }
}

function openModal(params) {
    createModal("Авторизация", getAuthForm());
    document.getElementById("auth-form").addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
    event.preventDefault();

    const btn = event.target.querySelector("button");
    const email = event.target.querySelector("#email").value;
    const password = event.target.querySelector("#password").value;

    btn.disabled = true;
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .catch(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
    if (typeof content === "string") {
        createModal("Ошибка!", content);
    } else {
        createModal("Список вопросов", Question.listToHTML(content));
    }
}