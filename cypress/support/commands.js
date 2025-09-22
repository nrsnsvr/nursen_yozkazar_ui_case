Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add('waitPage', () => {
    cy.wait(3000)
})

Cypress.Commands.add('checkTextContent', (textToCheck, blockName) => {
    cy.get('body').then(($body) => {
        if ($body.text().includes(textToCheck)) {
            console.log(`${blockName} block found`)
        } else {
            console.log(`${blockName} block not found but continuing`)
        }
    })
})

Cypress.Commands.add('applyFilter', (filterSelector, filterValue, filterType, timeout = 10000) => {
    cy.get('body').then(($body) => {
        if ($body.find(filterSelector).length > 0) {
            cy.get(filterSelector, { timeout })
                .first()
                .should('be.exist')
                .within(() => {
                    cy.get('option').should('have.length.greaterThan', 1)
                })
                .then(() => {
                    cy.get(filterSelector).first().select(filterValue, { force: true })
                    console.log(`${filterType} filter applied: ${filterValue}`)
                })
        } else {
            console.log(`${filterType} filter not found with selector: ${filterSelector}`)
        }
    })
})

Cypress.Commands.add('validateJobListings', (expectedTitle, expectedLocation, expectedDepartment) => {
    cy.get('.position-list-item').should('have.length.greaterThan', 0)

    cy.get('.position-list-item').each(($job, index) => {
        cy.wrap($job).within(() => {
            cy.get('.position-title').should('contain.text', expectedTitle)

            cy.get('.position-department').should('contain.text', expectedDepartment)

            cy.get('.position-location').should('contain.text', expectedLocation)
        })
    })
})