# EXpressJS Base Source Apply DI With Inversify - Using Repository Pattern with TypeORM

# ExpressJS-clean-basesource

### Author: haphuthinh

Very clean base source of NodeJS (Express) using DI with Inversify + Service - Repository Pattern with TypeORM

- Flow: Controller --> Service --> Repository --> TypeORM Entity

- We combine all dependency in "container", then resolve and export the controller to use in routes

ORM: TypeORM

## Usage

### Development:

```
npm run start:dev
```

### Production:

```
npm run build
npm run start:prod
```

## Migration:

### Auto genrate migration file to /src/database/migration

```
npm run migration:generate
```

### Apply migration

```
npm run migration:run
```

## Architecture

![alt text](https://res.cloudinary.com/practicaldev/image/fetch/s--CDARQ4Hj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/of739v9cu7namgc9m2am.jpg)

## How to create new API Endpoint:

- 1. Create new Entity Class in src/models
- 2. Create new repository and its repository interface in src/repository
- 3. Create new service and its service interface in src/service
- 4. Create new controller and its controller interface in src/controller
- 5. Combine all to container in src/container
- 6. Create new route in src/route

### Lint source

```
npm run lint
```

Lint fix:

```
npm run lint:fix
```

### Format source

Check:

```
npm run prettier
```

Apply format:

```
npm run prettier:fix
```

## Commit message guideline

### Commit Message Format

Each commit message consists of a header, a body and a footer. The header has a special format that includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.

The <type> word should be one of the rules items you have written in your .commitlintrc.json file and the <scope> is the module/component you are working on.

Samples:

```
docs(changelog): update changelog to beta.5
```

```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Type

Must be one of the following:

- build: Changes that affect the build system or external
- dependencies (example scopes: gulp, broccoli, npm)
- ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- docs: Documentation only changes
- feat: A new feature
- fix: A bug fix
- perf: A code change that improves performance
- refactor: A code change that neither fixes a bug nor adds a feature
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- test: Adding missing tests or correcting existing tests

## Author

chabuuuu# ExpressJS-clean-base-source--TypeORM-
