import { dataCyAttribute } from './../../src/helpers/dataCyAttribute';

describe('e2e test', () => {
  it('Should creaty meetup by employee', () => {
    cy.visit('http://localhost:3000/');
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get('#username').type('employee').should('have.value', 'employee');
    cy.get('[type="password"]').type('private');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.createMeetup}]`).click();
    cy.get('input[name=subject]')
      .type('New title')
      .should('have.value', 'New title');
    cy.get('textarea[name=excerpt]')
      .type('Any description')
      .should('have.value', 'Any description');
    cy.get(`[data-cy=${dataCyAttribute.buttonNext}]`).click({ force: true });
    cy.get('input[name=start]').click();
    cy.get('.react-datepicker__day--020').click();
    cy.get('.react-datepicker__time-list > :nth-child(25)').click();
    cy.get('input[name=finish]').click();
    cy.get('.react-datepicker__day--020').click();
    cy.get('.react-datepicker__time-list > :nth-child(28)').click();
    cy.get('input[name=place]')
      .click()
      .type('Online')
      .should('have.value', 'Online');
    cy.get(`[data-cy=${dataCyAttribute.dropbox}]`).selectFile(
      './cypress/e2e/test.jpg',
      { action: 'drag-drop' },
    );
    cy.get(`[data-cy=${dataCyAttribute.buttonFinish}]`).click();
  });

  it('Should creaty news by chief', () => {
    cy.visit('http://localhost:3000/');
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get('#username').type('chief').should('have.value', 'chief');
    cy.get('[type="password"]').type('private');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.news}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.createNews}]`).click();
    cy.get('input[name=title]')
      .type('New title')
      .should('have.value', 'New title');
    cy.get('textarea[name=text]')
      .type('Any text')
      .should('have.value', 'Any text');
    cy.get(`[data-cy=${dataCyAttribute.dropbox}]`).selectFile(
      './cypress/e2e/test.jpg',
      { action: 'drag-drop' },
    );
    cy.get(`[data-cy=${dataCyAttribute.submitNews}]`).click({ force: true });
  });

  it('Should support a meetup by two employee', () => {
    cy.visit('http://localhost:3000/');
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get('#username').type('Lili').should('have.value', 'Lili');
    cy.get('[type="password"]').type('private');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.get('#username').clear();
    cy.get('#username').type('Lila').should('have.value', 'Lila');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.wait(1000);
    cy.get(`[data-cy=${dataCyAttribute.supportButton}]`).eq(0).click();
    cy.get(`[data-cy=${dataCyAttribute.tooltipWrapper}]`).trigger('mouseover');
    cy.get(`[data-cy=${dataCyAttribute.logoutTooltip}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get('#username').type('Roma').should('have.value', 'Roma');
    cy.get('[type="password"]').type('private');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.wait(1000);
    cy.get(`[data-cy=${dataCyAttribute.supportButton}]`).eq(0).click();
  });
});
