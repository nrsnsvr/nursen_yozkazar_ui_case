describe('Insider Test Cases', () => {

    it('Case 1: Open URL and home page control', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.url().should('include', 'useinsider.com')
        cy.title().should('contain', 'Insider')
    })

    it('Case 2: Select Company and Careers & blocks control', () => {
        cy.visit(Cypress.env('baseUrl'))
        cy.contains('Company').click({ force: true })
        cy.contains('Careers').click({ force: true })
        cy.url().should('include', 'careers')
        cy.get('body').should('be.visible')

        cy.checkTextContent('Locations', 'Locations')
        cy.checkTextContent('Teams', 'Teams')
        cy.checkTextContent('Life at Insider', 'Life at Insider')
    })

    it('Case 3: Go to QA page & check filters', () => {
        cy.visit(Cypress.env('qaUrl'))

        cy.get('body').then(() => {
            if (Cypress.$(':contains("See all QA jobs")').length > 0) {
                cy.contains('See all QA jobs').click({ force: true })
            } else if (Cypress.$(':contains("See all jobs")').length > 0) {
                cy.contains('See all jobs').click({ force: true })
            } else {
                cy.visit(Cypress.env('jobsUrl'))
            }
        })
        //Buradaki wait kullanımları sayfanın arka planında gelen option selectorüne sahip elementlerin yüklenmesini beklemek için.
        //Benzer durum manuel testte de yaşanıyor ve sayfa datalarında kaymalar var.
        cy.wait(15000)

        cy.applyFilter('#filter-by-location', Cypress.env('expectedLocation'), 'Location')
        cy.wait(10000)
        cy.applyFilter('#filter-by-department', Cypress.env('expectedDepartment'), 'Department')
        cy.wait(15000)
    })

    it('Case 4: Check all jobs & contains values', () => {
        cy.visit(Cypress.env('qaUrl'))

        cy.get('body').then(() => {
            if (Cypress.$(':contains("See all QA jobs")').length > 0) {
                cy.contains('See all QA jobs').click({ force: true })
            } else if (Cypress.$(':contains("See all jobs")').length > 0) {
                cy.contains('See all jobs').click({ force: true })
            } else {
                cy.visit(Cypress.env('jobsUrl'))
            }
        })

        cy.wait(15000)

        cy.applyFilter('#filter-by-location', Cypress.env('expectedLocation'), 'Location')
        cy.wait(10000)
        cy.applyFilter('#filter-by-department', Cypress.env('expectedDepartment'), 'Department')
        cy.wait(15000)

        cy.validateJobListings(Cypress.env('expectedTitle'),Cypress.env('expectedLocation'), Cypress.env('expectedDepartment'))

    })

    it('Case 5: View Role & filters control', () => {
        cy.visit(Cypress.env('qaUrl'))

        cy.get('body').then(() => {
            if (Cypress.$(':contains("See all QA jobs")').length > 0) {
                cy.contains('See all QA jobs').click({ force: true })
            } else if (Cypress.$(':contains("See all jobs")').length > 0) {
                cy.contains('See all jobs').click({ force: true })
            } else {
                cy.visit(Cypress.env('jobsUrl'))
            }
        })

        cy.wait(5000)

        cy.applyFilter('#filter-by-location', Cypress.env('expectedLocation'), 'Location')
        cy.wait(10000)
        cy.applyFilter('#filter-by-department', Cypress.env('expectedDepartment'), 'Department')
        cy.wait(15000)

        cy.get('body').then(($body) => {
            if ($body.find('.posting').length > 0) {
                cy.get('.posting').first().click({ force: true })
                cy.wait(3000)
                cy.url().should('include', 'lever.co')
            } else {
                throw new Error('No jobs found after filtering')
            }
        })

    })

})