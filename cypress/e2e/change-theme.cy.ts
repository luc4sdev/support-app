import Cookies from 'js-cookie';

describe('change theme', () => {
    beforeEach(() => {

        cy.request('POST', 'http://localhost:3333/authenticate', {
            email: 'admin@email.com',
            password: 'admin123',
        }).then((resp) => {
            const { data } = resp.body;
            Cookies.set('token', data.token, { expires: 1 });
        });
    });
    it('should be able to click in the theme button and change theme', () => {
        cy.visit('http://localhost:3000/clients')
        cy.get('[id^=theme-button]').click()
        cy.get('[role="menu"]').should('be.visible');
        cy.contains('Light').click();

        cy.wait(2000)
        cy.get('[id^=theme-button]').click()
        cy.get('[role="menu"]').should('be.visible');
        cy.contains('Dark').click();

    })
})