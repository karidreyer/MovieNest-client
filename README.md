# Movie Nest App

## Introduction

The Move Nest App is an app developed as a student project, focused on allowing users to access information about different movies. It is a single-page, responsive app with routing, interactions, and several interface views. The Movie Nest app is designed as a client-side piece to support the existing server-side Movie Nest API, which was built to facilitate user requests and render the response from the server-side via a number of different interface views.

## Features (by View)

- **Main view**
  - Returns ALL movies to the user (each movie item with an image, title, and description)
  - Filtering the list of movies with a “search” feature
  - Ability to select a movie for more details
  - Ability to log out
  - Ability to navigate to Profile view
- **Single Movie view**
  - Returns data (description, genre, director, image) about a single movie to the user
  - Allows users to add and remove movies from their list of favourites
- **Login view**
  - Allows users to log in with a username and password
- **Signup view**
  - Allows new users to register (username, password, email, date of birth)
- **Profile view**
  - Displays user registration details
  - Allows users to update their info (username, password, email, date of birth)
  - Displays favorite movies
  - Allows users to remove a movie from their list of favorites
  - Allows existing users to deregister

## Technologies Used

- **React**: A JavaScript library for building user interfaces, enabling a dynamic and component-based architecture.
- **ES2015+**: Modern JavaScript syntax and features, including classes, modules, and arrow functions, ensuring clean and efficient code.
- **Bootstrap**: A CSS framework for building responsive, mobile-first web applications with pre-designed components and styles.
- **Parcel**: A fast, zero-config web application bundler, simplifying asset compilation and dependency management.

## Project URL

[Movie Nest](https://movienest-app.netlify.app/)
