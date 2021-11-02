import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import Page from '../../../pages';

Given('I am on the booking form', () => {
    cy.visit_booking_form()
})

And('I setup an interrupt for a {string} request to the {string} service', (method, path) => {
    cy.setup_interrupt_for(method, path)
})

When('I save the booking', () => {
    cy.save_booking()
})

Then('I should see an {string}', (response_type) => {
    cy.wait('@requestInterrupt').its('response.statusCode').should(
        'eq', Page.responses()[response_type]);
})

And('I fill in the form with the required {string} missing', (exclude_field) => {
    Page.bookingForm().fill(exclude_field);
})

And('I fill in the booking form', () => {
    cy.fill_booking_form()
})

And('I set the value of the {string} field to {string}', (field, value) => {
    Page.bookingForm().update(field, value)
})

Then('my booking should be successful', () => {
    cy.verify_booking_saved()
})

And(/^I should (not )?see my booking listed$/, (negate) => {
    cy.verify_booking_listed(negate)
})

Given('I successfully make a booking', () => {
    cy.visit_booking_form()
    cy.setup_interrupt_for('POST', '**/booking')
    cy.fill_booking_form()
    cy.save_booking()
    cy.verify_booking_saved()
    cy.verify_booking_listed()
})

And('I delete my booking', () => {
    cy.get('@user').then((user) => {
        const firstname = user['firstname']
        cy.contains(firstname).parent().parent().find('input[value="Delete"]').click()
    })
})

Then('my booking should be successfully deleted', () => {
    cy.wait('@requestInterrupt').its('response.statusCode').should(
        'eq', Page.responses()['Created']);
})