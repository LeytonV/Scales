# *Scales*

Scales is a prototype for a day-by-day weight loss tracker, built with a ASP.NET backend API and a Angular v17 frontend. It uses Entity Framework Core and Identity to manage user accounts and account data such as weight entries, user settings, logins etc.
![8275ca986f230159b9d5e48aa0b99d56-ezgif com-resize](https://github.com/LeytonV/Scales/assets/40127046/b975a1fb-03af-4d18-be99-c1a70f7dd5b4)


# How to run locally
Prerequisites:
- .NET 8 minimum
- Angular v17 minimum, and Angular CLI (Can be installed [here](https://angular.io/guide/setup-local))
- Docker (with the CLI)

**Setting up the frontend:**
1. Using the Angular CLI in your code editor of choice (or command prompt), cd into the UI folder, and then run ``npm i`` to install the required packages for the frontend to run.
2. Once installed, run ``ng serve`` to compile the project. Once complete, the project will be viewable on ``localhost:4200``.

**Setting up the database:**
1. Using the CLI, cd into Server/Compose to find the compose file and environment variables.
2. Run ``docker compose up`` to create the database in a Docker container

**Setting up the backend**
1. cd into the Server folder, and run ``dotnet run --launch-profile https`` to run it.

Once all of these are up and running, you'll be able to interact with the frontend on ``localhost:4200``

![18e8fd79235a8df947f85fd6986dbfb1](https://github.com/LeytonV/Scales/assets/40127046/db06fc08-defb-4cfa-9c85-0618145b1aaa)
