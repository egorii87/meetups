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
    cy.get('.ImageDropbox_dropbox__ZHXzT').selectFile(
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
    cy.get('.ImageDropbox_dropbox__ZHXzT').selectFile(
      './cypress/e2e/test.jpg',
      { action: 'drag-drop' },
    );
    cy.get(`[data-cy=${dataCyAttribute.submitNews}]`).click({ force: true });
  });

  it('Should support a meetup by two employee', () => {
    cy.visit('http://localhost:3000/');
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get('#username').type('Rossana').should('have.value', 'Rossana');
    cy.get('[type="password"]').type('private');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.get('#username').clear();
    cy.get('#username').type('Rosanna').should('have.value', 'Rosanna');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.get(
      '[href="/meetups/852a502a-e499-4db6-8b14-b9e4523a8b64"] > .MeetupCard_card__8XcoY > footer > :nth-child(1) > .SupportButton_wrapper__kNIVL > [data-cy="supportBuuton"]',
    ).click({ force: true });
    cy.get('.Tooltip_wrapper__vVI40 > .UserPreview_user__E92Dm').trigger(
      'mouseover',
    );
    cy.get('.Tooltip_tooltip__5jxHa > .p').click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get(`[data-cy=${dataCyAttribute.login}]`).click();
    cy.get('#username').type('Tessie').should('have.value', 'Tessie');
    cy.get('[type="password"]').type('private');
    cy.get(`[data-cy=${dataCyAttribute.submitLogin}]`).click();
    cy.get(
      '[href="/meetups/852a502a-e499-4db6-8b14-b9e4523a8b64"] > .MeetupCard_card__8XcoY > footer > :nth-child(1) > .SupportButton_wrapper__kNIVL > [data-cy="supportBuuton"]',
    ).click({ force: true });
  });
});
