
let properties = {
    targetContainer: '.aaa',
    qty: {
        label: 'Quantity',
        type: 'input',
        inputType: 'number',
        classes: ['form-input', 'rounded'],
        id: 'quantity',
        defaultValue: 1
    },
    name: {
        label: 'Ingredient',
        type: 'input',
        inputType: 'text',
        classes: ['form-input', 'square'],
        id: 'name',
        placeholder: 'Milk',
        attributes: {
            required: true
        }
    },
    measure: {
        label: 'Measure',
        type: 'select',
        classes: ['form-select', 'rounded'],
        id: 'measure',
        values: {
            0: 'Please select a measure',
            bottle: 'Bottle',
            grams: 'Grams'
        }
    },
    rawIngredient: {
        label: 'Is it raw?',
        type: 'input',
        inputType: 'radio',
        classes: ['form-input'],
        id: 'raw',
        values: {
            0: 'Yes',
            1: 'No'
        }
    },
    rawIngredientCheck: {
        label: 'Is it raw2?',
        type: 'input',
        inputType: 'checkbox',
        classes: ['form-input'],
        id: 'raw',
        values: {
            0: 'da',
            1: 'nu'
        }
    },
    ingredientDesc: {
        label: 'Description',
        type: 'textarea',
        classes: ['form-input'],
        id: 'description',
        value: 'Termina cu prostiile',
        attributes: {
            rows: 5,
        }
    },
    submitBtn: {
        type: 'input',
        inputType: 'submit',
        classes: ['btn', 'btn-primary'],
        id: 'submit-form',
        value: 'Aa'
    }
};

FormBuilder.create(properties);


class Ingredient {
    constructor() {
        // this.row = this.create();
    }

    create() {
        // Create the ingredient row
        let newRow = document.createElement('div');
        newRow.classList.add('form-row');

        // Append the new ingredient row
        let refChild = document.querySelector('.new-ingredient-container');
        let parentNode = document.querySelector('.ingredients-container');
        parentNode.insertBefore(newRow, refChild);

        // Create the columns and append them to the row
        let i = 0;
        for (i; i < 4; i++) {
            let col = document.createElement('div');
            if (i === 3) {
                col.classList.add('col-3', 'align-end', 'justify-end');
            } else {
                col.classList.add('col-3');
            }
            newRow.appendChild(col);
        }
        let columns = document.querySelectorAll('.ingredients-container .form-row .col-3');

        // Create the name input and append it to the first column
        let nameInput = document.createElement('input');
        let nameLabel = document.createElement('label');
        let nameLabelText = document.createTextNode('Ingredient');

        setAttributes(nameInput, {'type': 'text', 'id': 'name', 'name': 'name'});
        nameLabel.setAttribute('for', 'name');

        nameLabel.appendChild(nameLabelText);
        columns[0].appendChild(nameInput);

        // Create the select box and append it to the second column
        let measureSelect = document.createElement('select');
        let measureLabel = document.createElement('label');

        measureSelect.setAttribute('id', 'measure');
        measureLabel.setAttribute('for', 'measure');
        measureLabel.createTextNode('Measure');

        // Create the select options and append them to the select
        let measures = ['bottle', 'cup', 'whole', 'grams', 'liters'];

        measures.forEach(measure => function () {
            let measureSelectOption = document.createElement('option');
            measureSelectOption.setAttribute('value', measure);

            measureSelect.appendChild(measureSelectOption);
        });

        columns[1].appendChild(measureSelect);

        // Create the quantity input and append it to the third column
        let qtyInput = document.createElement('input');
        let qtyLabel = document.createElement('label');

        setAttributes(qtyInput, {'type': 'number', 'id': 'quantity', 'name': 'quantity'});
        qtyLabel.setAttribute('for', 'quantity');
        qtyLabel.createTextNode('Quantity');

        columns[2].appendChild(qtyInput);

        // Create the delete button and append it to the last column
        let deleteBtn = document.createElement('button');
        setAttributes(deleteBtn, {'class': 'btn btn-icon hide', 'type': 'button'});
        let deleteIcon = document.createElement('i');
        deleteIcon.classList.add('material-icons');

        deleteBtn.appendChild(deleteIcon);
        columns[3].appendChild(deleteBtn);


        return newRow;

    }

    inputs() {
        return {
            name: {}
        }
    }

    rules() {
        return {
            name: {
                required: 'This field is required'
            },
            quantity: {
                required: 'This field is required',
                number: 'This field must contain only positive numbers'
            }
        }

    }

    validate() {
        let rules = this.rules;
    }
}


let obj = new Ingredient();

document.querySelector('#new-ingredient-btn').addEventListener('click', obj.create);

/*let ingredientInputs = document.querySelectorAll('.ingredients-container input');
ingredientInputs.forEach(function (ingredientInput) {
    console.log(ingredientInput);
    ingredientInput.addEventListener('blur', ingredient.checkFields);
});*/

