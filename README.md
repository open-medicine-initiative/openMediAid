Medium - Social Healthshare
======
> Medium is a [crowd-sourced](Crowdsourcing), non-profit, open medicine platform aiming to guide patients and doctors in their search for case-specific medical information in order to speed up the process of finding appropriate diagnoses and effective treatments.  

This page provides information mainly for developers. If you don't know what the [goal](https://github.com/mediumorg/medium/wiki/How-it-works) of this project is, [how it works](https://github.com/mediumorg/medium/wiki/How-it-works) and how to contribute please be referred to the [wiki](https://github.com/mediumorg/medium/wiki)


# Development
[WIP]

## Setup

* Install node.js and npm
* Checkout repository: `git clone https://github.com/mediumorg/medium`
* Change to the root directory where the code resides: `cd code`
* Ensure that `node` points to `nodejs` for compatibility of some plugins (set a symlink)
* Install gulp and bower globally: `npm install -g gulp bower`
* Install npm dependencies: `npm install`
* Install bower dependencies: `bower install`
* Install karma client globally for convenience `sudo npm install -g karma-cli`
* Run default build `gulp`

[WIP]

## The build process

[WIP]


## Project layout
* /code
  * /build
    * /jsdoc
    * /tasks
  * /src
    * /app
    * /components
  * /test
  * /dist
* /concepts

## Architecture

* Date centric application with JSON being the primary data (exchange) format
* Data is exposed by REST-API
* Data is transformed into mutable state that is acted upon by models and other types of components
* Contracts for behaviour are defined as traits/talents with cocktail.js
* Contracts for data are defined using json schema and some appropriate validator
* Keep depth (nested structures) of data items minimal -> strive for local, small scoped, flat structures
* Support for nested/recursive structures is added on client side
* Composable pipes and filters (pipelines) are used to transform data (e.g. wiring up nested structures) and attach behavior (talents)
* Pipelines are configured explicitly using fluent interface and mapped to resources using pattern matching of url routes

[WIP]

## Conventions

### Commit messages

The general pattern for commit messages is
`intent(component): message`

intents: fix,feature,refactor,doc,misc

components: build,app,medmod

Examples `fix(doc): corrected typo in ...` `feature(build): added lint validation for build scripts`


### License
 
 Something like MIT but has yet to be decided
