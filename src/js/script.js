window.addEventListener('DOMContentLoaded', function () {
    const formFields = document.querySelectorAll(".input-container__input");
    const passField = document.querySelectorAll(".input-container__input")[3];
    const confirmPassField = document.querySelectorAll(".input-container__input")[4];
    const form = document.querySelector(".auth-form");
    const errorFields = document.querySelectorAll(".input-container__validate-error");
    const closeModal = document.querySelector(".close");
    const errorsDict = ["Вы не заполнили поле Email", "Вы не указали Имя", "Вы не указали Фамилию", "Вы не указали пароль", "Вы не ввели пароль "];
    const emailRegExp = /.+@.+\..+/i;

    const modal = document.querySelector('.modal');
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

        if (!emailRegExp.test(formFields[0].value)) {
            errorFields[0].textContent = 'Вы указали некорректный Email';
            formIsValid = false;
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
        document.getElementById('myModal').style.display = "none";
    });

    document.addEventListener('keydown', function (event) {
        let keyCode = event.keyCode;

        if (keyCode === 27) {
            document.body.classList.remove('fixed');
            document.getElementById('myModal').style.display = "none";
        }
    });

    modal.addEventListener('click', function () {
        document.body.classList.remove('fixed');
        document.getElementById('myModal').style.display = "none";
    });
});



function showModal() {
    document.getElementById('myModal').style.display = "block";
    document.body.classList.add('fixed');
}