## The build

  * build.project.js: Project variables and path configurations
  * build.common.js: 
  * build.less.js: Compilation of less to css

[WIP]


## Project layout
[WIP]

## Architecture

### In a nutshell

* Date centric application with JSON being the primary data (exchange) format
* Data is exposed by REST-API
* Data is transformed into mutable state that is acted upon by models and other types of components
* Contracts for data are defined using json schema and appropriate validators
* Keep depth (nested structures) of data items minimal -> strive for local, small scoped, flat structures
* Composable pipes and filters (pipelines) are used to transform data (e.g. wiring up nested structures) and attach behavior (talents)
* Pipelines are configured explicitly using fluent interface and mapped to resources using pattern matching of url routes

[WIP]