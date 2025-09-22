import './commands'

before(() => {
    cy.window().then((win) => {
        win.console.warn = () => {};
    });
});

beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        const ignoredErrors = [
            'querySelectorAll',
            'remove',
            'hsforms',
            'google-analytics',
            'Cannot read properties of undefined',
            'Non-Error promise rejection captured',
            'ResizeObserver loop limit exceeded',
            'Script error'
        ];

        return !ignoredErrors.some(error => err.message.includes(error));
    });
});

Cypress.config('defaultCommandTimeout', 15000);
Cypress.config('requestTimeout', 30000);
Cypress.config('responseTimeout', 30000);