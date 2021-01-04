let validator = {
    handleSubmit:(event)=>{
        event.preventDefault();

        let enviado = true;
        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        for(let i = 0;i < inputs.length;i++){
            let entrada = inputs;
            let check = validator.checkInput(entrada);

            if(check !== true){
                enviado = false;
                validator.showError(entrada, check);
            }
        }

        if(enviado){
            form.submit();
        }

    },

    checkInput:(entrada)=>{
        let rules = entrada.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split(',');
            for(let k in rules){
                let rulesDetails = rules[k].split('=');
                switch(rulesDetails[0]){
                    case 'required':
                        if(entrada.value == ''){
                            return 'O campo não pode estar vazio'
                        }
                    break;
                    case 'min':
                        if(entrada.value.length < rulesDetails[1]){
                            return 'O campo deve ter mais caracteres!'; 
                        }
                    break;
                    case 'email':
                        if(entrada.value != ''){
                            let regex =  /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            if(regex.test(entrada.value.toLowerCase())){
                                return ' O e-mail digitado não é válido!';
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },

    showError:(entrada, error)=>{
        entrada.style.borderColor = 'red';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        entrada.parentElement.insertBefore(errorElement, entrada.ElementSibling);
    },

    clearErrors:()=>{

        let inputs = form.querySelectorAll('input');
        for(let i = 0;i < inputs.length;i++){
            inputs[i].style = '';
        }


        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i < errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};


let form = document.querySelector('form');
form.addEventListener('submit', validator.handleSubmit);


