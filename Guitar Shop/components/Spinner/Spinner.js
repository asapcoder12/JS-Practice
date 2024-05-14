class Spinner {

    render() {
        const html = `
            <div class="spinner-container">
                <img class="spinner__img" src="components/Spinner/img/spinner.svg" />
            </div>
        `;

        ROOT_SPINNER.innerHTML = html;
    }

    handleClear() {
        ROOT_SPINNER.innerHTML = "";
    }
}

const spinnerPage = new Spinner();