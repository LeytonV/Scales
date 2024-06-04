# *Scales*

Scales is a prototype for a day-by-day weight loss tracker, built with a ASP.NET backend API and a Angular v17 frontend. It uses Entity Framework Core and Identity to manage user accounts and account data such as weight entries, user settings, logins etc.

# How to run locally
Prerequisites:
- Visual Studio (Minimum version 20222, 17.8x or later) with the ASP.Net and web development workload (if you want to make code edits, that is.)
- .NET 8 minimum
- Visual Studio Code (if editing the frontend)
- Angular v17 minimum, and Angular CLI (Can be installed [here](https://angular.io/guide/setup-local))
- Docker (with the CLI)

**Setting up the frontend:**
1. Using the Angular CLI in your code editor of choice (or command prompt), cd into the UI folder, and then run ``npm i`` to install the required packages for the frontend to run.
2. Once installed, run ``ng serve`` to compile the project. Once complete, the project will be viewable on ``localhost:4200``.

**Setting up the database:**
1. Using the CLI, cd into Server/Compose to find the compose file and environment variables.
2. run ``docker compose up`` to create the database in a Docker container

**Setting up the backend**
1. cd into the Server folder, and run ``dotnet run --launch-profile https`` to run it.

Once all of these are up and running, you'll be able to interact with the frontend on ``localhost:4200``