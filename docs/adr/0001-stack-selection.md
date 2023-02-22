# 1. Stack selecton

Date: 2023-01-02

## Status

Accepted

## Context

The tech stack for this project needs to be selected. It needs to support a backend API and frontend SPA application, hosted on AWS.

## Decision

For the frontend, Vue 3 built with Vite will be used because of it leverages new features of build tooling not yet available in Create-React-App and Jest.
Cypress has great integration with the Vite ecoystem and will be used for E2E testing. Vitest is also well integrated and will be used for unit and integration testing.

For the backend, a simple NodeJS Express should be able to handle project requirements, with a SQL database hosted on AWS.

## Consequences

Will have to further investigate AWS costs, though AWS's free tier should be enough for development purposes.