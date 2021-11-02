// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import Page from '../pages';

Cypress.Commands.add("visit_booking_form", function () {
    Page.bookingForm().visit()
});

Cypress.Commands.add("setup_interrupt_for", function (method, path) {
    cy.intercept(method, path).as('requestInterrupt')
});

Cypress.Commands.add("fill_booking_form", function () {
    Page.bookingForm().fill()
});

Cypress.Commands.add("save_booking", function () {
    Page.bookingForm().save()
});

Cypress.Commands.add("verify_booking_saved", function () {
    cy.wait('@requestInterrupt').its('response.statusCode').should(
        'eq', Page.responses()['OK']);
});

Cypress.Commands.add("verify_booking_listed", function (negate) {
    let expected_count = 1
    let timeout = 10000
    if ( negate && negate.trim() === 'not') {
        expected_count = 0
    }
    cy.get('@user').then((user) => {
        cy.contains(user['firstname'], { timeout: timeout }).should('have.length', expected_count)
        cy.contains(user['lastname'], { timeout: timeout }).should('have.length', expected_count)
    })
});
