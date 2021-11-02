import User from '../fixtures/User';
class BookingForm {
    constructor() {
        this.formFields = [
            'firstname', 'lastname', 'totalprice', 'depositpaid',
            'checkin', 'checkout']
    }

    visit() {
        cy.visit('http://hotel-test.equalexperts.io/');
    }

    getSaveButton() {
        return cy.get('input[value=" Save "]');
    }

    save() {
        const saveButton = this.getSaveButton();
        saveButton.click();
    }

    getField(name) {
        const fields = {
            "firstname": {
                "type": "input",
                "element": 'input#firstname'
            },
            "lastname": {
                "type": "input",
                "element": 'input#lastname'
            },
            "totalprice": {
                "type": "input",
                "element": 'input#totalprice'
            },
            "depositpaid": {
                "type": "select",
                "element": 'select#depositpaid'
            },
            "checkin": {
                "type": "input",
                "element": 'input#checkin'
            },
            "checkout": {
                "type": "input",
                "element": 'input#checkout'
            }
        }
        return fields[name];
    }

    fill(exclude_field = '') {
        const user = User;
        cy.wrap(user).as('user');
        for (let i = 0 ; i < this.formFields.length; i++) {
            const field = this.formFields[i];
            if (field !== exclude_field) {
                this.typeOrSelect(field, user[field]);
            } else {
                continue;
            }
        }
    }

    update(field, value) {
        this.typeOrSelect(field, value);
    }

    typeOrSelect(field, value) {
        const fieldObj = this.getField(field);
        const element = cy.get(fieldObj['element']);
        if (fieldObj['type'] === 'input') {
            element.clear();
            element.type(value);
        } else if (fieldObj['type'] === 'select') {
            element.select(value);
        }
    }
}
export default BookingForm;
