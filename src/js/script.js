window.addEventListener('DOMContentLoaded', function () {
    const formFields = document.querySelectorAll(".input-container__input");
    const passField = document.querySelectorAll(".input-container__input")[3];
    const confirmPassField = document.querySelectorAll(".input-container__input")[4];
    const form = document.querySelector(".auth-form");
    const errorFields = document.querySelectorAll(".input-container__validate-error");
    const closeModal = document.getElementsByClassName("close")[0];
    const errorsDict = ["Вы не заполнили поле Email", "Вы не указали Имя", "Вы не указали Фамилию", "Вы не указали пароль", "Вы не ввели пароль "]
    let formIsValid = false;

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        for (let i = 0; i < formFields.length; i++) {
            if (!formFields[i].value) {
                errorFields[i].textContent = errorsDict[i].toString();
                formIsValid = false;
            } else {
                errorFields[i].textContent = '';
                formIsValid = true;
            }
        }


        if (passField.value !== confirmPassField.value) {
            errorFields[4].textContent = 'Пароли не совпадают';
            formIsValid = false;
        }

        if (formIsValid) {
            showModal();
        }



    }, true);

    closeModal.addEventListener('click', function () {
        document.body.classList.remove('fixed');
    });
});



function showModal() {
    document.getElementById('myModal').style.display = "block";
    document.body.classList.add('fixed');
}