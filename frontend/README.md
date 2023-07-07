# Meetup Web App

<a href='https://hostingkartinok.com/show-image.php?id=23893d5a8c7bd49ec227ad8145ab1854' title='хостинг фотографий'><img style="width:100%" src='https://s1.hostingkartinok.com/uploads/images/2023/07/23893d5a8c7bd49ec227ad8145ab1854.jpg' alt='imgonline-com-.jpg'  /></a>


## Built With

- [React](https://reactjs.org/)
- [MobX](https://mobx.js.org/) - state management
- [Jest](https://jestjs.io) - unit testing framework
- [ESLint](https://eslint.org/) - JavaScript linting utility
- [Cypress](https://www.cypress.io/) - tools for e2e and integration tests
- [TypeScript](https://www.typescriptlang.org/) - a strongly typed programming language that builds on JavaScript
- [Storybook](https://storybook.js.org/)

## Resources

- [Api Server](https://github.com/egorii87/meetups/tree/master/backend)
- [Design](https://www.figma.com/file/xu4vtVzCyKp9Thzpp7DkVj/Internship-Meetups-App?node-id=129%3A0&t=B6e10yduGP4ACePq-0)

## Functionality

The web application has three user roles: unauthorized user, employee, chief. Below is a use-case diagram with permissions for users depending on their role.  
To log in, enter the following data:
- **employee**: login: *employee*, password: *private*
- **chief**: login: *chief*, password: *private*

<a href='https://hostingkartinok.com/show-image.php?id=25ce48061a957f679e0a52d1603780b0' title='photohost'><img style="width:100%" src='https://s1.hostingkartinok.com/uploads/images/2023/07/25ce48061a957f679e0a52d1603780b0.png' alt='use-case.png'  /></a>

The application is multilingual. has three languages: English, Russian and Ukrainian. When you select a language, the application changes the language without reloading the page.

<a href='https://hostingkartinok.com/show-image.php?id=f14c7dffd0ea739d3710dcce5698cd23' title='поделиться фото'><img style="width:100%" src='https://s1.hostingkartinok.com/uploads/images/2023/07/f14c7dffd0ea739d3710dcce5698cd23.png' alt='lang.png'  /></a>

To create a meetup, use the form below.  
Each field is processed by Formik. You cannot go to the second page if the first one is not filled in. You can add a picture from your computer.

<a href='https://hostingkartinok.com/show-image.php?id=3e9b7185cd6fc52ecbce36cafb7aa191' title='загрузить фото'><img style="width:100%" src='https://s1.hostingkartinok.com/uploads/images/2023/07/3e9b7185cd6fc52ecbce36cafb7aa191.png' alt='create-meetup.png'  /></a>

<a href='https://hostingkartinok.com/show-image.php?id=1fda7c132c0cffe2204d0c5645f70a7e' title='photo share'><img style="width:100%" src='https://s1.hostingkartinok.com/uploads/images/2023/07/1fda7c132c0cffe2204d0c5645f70a7e.png' alt='Yes'  /></a>
