class FormBuilder {
    static create(properties) {
        // TODO: Add the form element, action, method and so on. Make a main object instead of targetcontainer in which you specify all of that (delete it after)
        let parentNode = document.querySelector(properties.targetContainer);
        delete properties.targetContainer;

        for (const elementKey of Object.keys(properties)) {
            if (properties[elementKey].inputType === 'radio' || properties[elementKey].inputType === 'checkbox') {
                if (properties[elementKey].hasOwnProperty('label')) {
                    let paragraph = document.createElement('p');
                    let paragraphText = document.createTextNode(properties[elementKey].label);

                    paragraph.appendChild(paragraphText);

                    parentNode.appendChild(paragraph);
                }

                for (const inputOptions of Object.keys(properties[elementKey].values)) {
                    parentNode.appendChild(this.createInput(elementKey, properties[elementKey], inputOptions, properties[elementKey].values[inputOptions]));
                }
            } else {
                if (properties[elementKey].hasOwnProperty('label')) {
                    let label = document.createElement('label');
                    let labelText = document.createTextNode(properties[elementKey].label);

                    label.setAttribute('for', properties[elementKey].id);

                    label.appendChild(labelText);

                    parentNode.appendChild(label);
                }

                parentNode.appendChild(this.createInput(elementKey, properties[elementKey]));
            }

        }
    }

    static createInput(inputName, properties, currentInputValue, currentInputText) {
        let elementContainer = document.createElement('div');
        let element = document.createElement(properties.type);

        this.setAttributes(element, {'id': properties.id, 'name': inputName});

        switch(properties.type) {
            case 'input':
                switch (properties.inputType) {
                    case 'submit':
                    case 'button':
                        this.setAttributes(element, {'type': properties.inputType, 'value': properties.value});
                        break;
                    case 'text':
                    case 'email':
                    case'password':
                    case 'number':
                        element.setAttribute('type', properties.inputType);
                        break;
                    case 'checkbox':
                    case 'radio':

                        this.setAttributes(element, {'id': properties.id + currentInputValue, 'type': properties.inputType, 'value': currentInputValue});

                        let inputLabel = document.createElement('label');
                        let labelText = document.createTextNode(currentInputText);

                        inputLabel.setAttribute('for', properties.id + currentInputValue);

                        inputLabel.appendChild(labelText);


                        elementContainer.appendChild(inputLabel);
                        break;
                    default:
                        console.log('The type is mandatory!');
                }
                break;
            case 'select':
                for (const selectOptions of Object.keys(properties.values)) {
                    let option = document.createElement('option');
                    let optionText = document.createTextNode(properties.values[selectOptions]);

                    option.appendChild(optionText);
                    option.setAttribute('value', selectOptions);

                    element.appendChild(option);
                }
                break;
            case 'textarea':
                let textareaValue = document.createTextNode(properties.value);
                element.appendChild(textareaValue);
                break;
            default:
                return false;
        }

        // Get classes
        if (properties.hasOwnProperty('classes')) {
            properties.classes.forEach(className => element.classList.add(className));
        }

        // Check Placeholders
        if (properties.hasOwnProperty('placeholder')) {
            element.setAttribute('placeholder', properties.placeholder);
        }

        // Check default value
        if (properties.hasOwnProperty('defaultValue')) {
            element.setAttribute('value', properties.defaultValue);
        }

        // Check for extra attributes
        if (properties.hasOwnProperty('attributes')) {
            for (const extraAttr of Object.keys(properties.attributes)) {
                element.setAttribute(extraAttr, properties.attributes[extraAttr]);
            }
        }

        elementContainer.appendChild(element);
        elementContainer.insertAdjacentElement('afterbegin', element);
        return elementContainer;
    }

    static setAttributes(el, attrs) {
        for (let key in attrs) {
            el.setAttribute(key, attrs[key]);
        }
    }
}


