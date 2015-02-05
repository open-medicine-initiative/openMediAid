OpenMed - Social Healthshare
======
> OpenMed is a crowd-sourced, non-profit, open medicine platform aiming to guide patients and doctors in their search for case-specific medical information.  

This page provides information mainly for developers. For more information about the project please visit [OpenMed](http://www.open-med.net)


# Development
[WIP]

## Setup

* Prerequisites: Installation of basic software packages
  *  Install node.js and npm
  *  Ensure that `node` points to `nodejs` for compatibility of some plugins (set a symlink)
  *  Install gulp and bower globally: `sudo npm install -g gulp bower`
  *  Install karma client globally for convenience `sudo npm install -g karma-cli`
* Setting up the OpenMed project  
  *  Clone the OpenMed repository: `git clone https://github.com/open-medicine-initiative/OpenMed`
  *  Change to the root directory of the frontend code: `cd frontend`
  *  Install projects npm dependencies: `npm install`
  *  Install projects bower dependencies: `bower install`
  *  Run default build `gulp`

[WIP]

## The build process

[WIP]


## Project layout
[WIP]

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

components: build,app

Examples `fix(doc): corrected typo in ...` `feature(build): added lint validation for build scripts`


### License
 
Something like MIT but has yet to be decided
