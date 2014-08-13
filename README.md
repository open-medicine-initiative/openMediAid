Medium - Social Healthshare
======

> An open medicine platform that automates word-of-mouth recommendations by applying ideas from social web software and recommender systems to the field of medicine and make a step towards [crowdsourced](https://github.com/bennidi/medium/wiki/Crowdsourcing) health care.

Medium aims to accelerate the process of finding proper diagnosis and effective treatment of medical conditions by using the knowledge of the [crowd](https://github.com/bennidi/medium/wiki/Crowdsourcing).
The idea is simple: People anonymously document and share their medical data using modern web software. Machine learning techniques are then applied to match people's medical stories, find useful pieces of information and selectively distribute them to the users who might benefit. This works on demand when people are actively searching for medical information regarding their own, a friends or a patients case resulting in suggestions about matching medical conditions, possibly relevant clinical tests or potentially useful therapeutic means. It also works automagically when people with similar medical stories will be linked with each other to constantly receive updates about the progress and discoveries made by their [peers](https://github.com/bennidi/medium/wiki/Medical-Profiles#medical-buddies) such that individual learnings quickly spread through the network.

The provided medical data will also be used to compile catalogues of common medical knowledge, including lots and lots of statistics. These statistics are meant to provide guidance for the users to assess efficiencies of drugs and therapy, as well as risks like treatment side-effects or possible surgery complications. Read more about the [mission statement](http://github.com/bennidi/medium/wiki/Mission-Statement) and [how it works](http://github.com/bennidi/medium/wiki/How-it-works). Medium will include and promote methods of alternative medicine as well as any other methods that people invent for themselves as long as there are enough people claiming its benefits.

The idea of Medium builds on the fact that every patient is an active agent in their medical story who consults doctors, undergoes clinical tests and therapy and researches various sources for relevant information. In this process, many patients become experts regarding their own condition and most of them end up with an extensive record of related medical data. Patient's knowledge and their chronologies of medical data are an invaluable source of information, not only for the owners themselves, but many others who are affected by similar symptoms. It bears the potential of saving others time, money and suffering if correct diagnosis and efficient treatment can be found more quickly. It is Medium's primary goal to automate people's word-of-mouth recommendations. Read more about Medium's [motivation and philosophy](http://github.com/bennidi/medium/Motivation-and-Philosophy)


# Project plan
The endeavour of turning the idea of Medium into reality has just begun. The first step was the creation of an online space where people can participate to develop the idea further, build data models, write code and finally release the first prototype. This is what this github repository will be used for.

The [issue](https://github.com/bennidi/medium/issues) list is used as a major collaboration tool to collect and develop ideas, index and document on and offline resources, track code issues etc. Issue labels and milestones are used to organize issues into meaningful groups. Indexation by labels also allows for a good searchability. This is a list of the most important labels:
 + *[task](https://github.com/bennidi/medium/issues?q=label%3Atask+)*: Tasks describe work that needs to be done
 + *use case*: The development part of the medium platform will be use case driven, as such the term use case is in the ordinary software development sense of the term: A description of a set of user interactions necessary to complete a task that people want to accomplish with the medium platform.
 + *peer*: We want to learn from what and how others are doing
 + *data*: Available medical data will help in the initial development phase
 + *non-profit*: Mark a peer, medical service or other resource as non-profit
 + *commercial*: Mark a peer, medical service or other resource as commercial
 + *medical service*: A medical service that users may consume directly
 + *discourse*: To follow the public discourse on topics related to medicine
 + *study*: If the issue references a study

## Work in progress
There is not yet an established and detailed project plan that can be followed to make the project a success. There are of course many ideas floating around and a reasonable set of necessary actions.

* Build a first prototype to browse and manage medical data collaboratively: This is one of the major prerequisites for collaboration with medical experts. There must be an online system that allows to store medical expert knowledge and apply the knowledge to fake patient data for testing
  * design and implement a first draft of the symptom<->syndrom hypergraph (SSHG)
  * create REST api for the SSHG
  * create web based UI to use REST
* Build a network and spread the idea: Finding supporters and engaging with the community of users is an ongoing process of the entire project. Especially in the initial phase it will be important to get feedback and connect with people who want to push the project
* Start a crowd-funding campaign to make Medium a full-time project: To build a sophisticated system like Medium a stable core team is required. This team must be financed as people can not live of love and laughter. Hosting and other things will also consume money. At some point there must be some money involved in the project.

# Contribute
Medium can make use of virtually any support that somebody wants to give. From simple feedback in the projects issue list, code contributions, design suggestion, free licenses for interesting tools, hosting, to financial support. If you want to get involved just raise an issue in the [issue](https://github.com/bennidi/medium/issues) list. Here is a more specific list of possible contributions or necessary collaborations:

+ Javascript developers who want to code a full stack, data driven Javascript application
+ Experts in the field of medicine
  + Doctors or students of (alternative-) medicine
  + Nurses, physiotherapists etc.
+ Co-Working space in Berlin
+ Support for crowd-funding campaign
+ Communications
  + Somebody who wants to manage the social media channels (facebook page, twitter)
  + Blogger: Write about the public debate, the progress of the project
+ Design work
+ Legal advice for founding of non-profit organization and running online medical services
+ Specialists for data privacy and security


[Disclaimer](http://github.com/bennidi/medium/wiki/Disclaimer)
> Medium is not a diagnostic tool that can tell you for sure what your condition is or what therapy will work for you. Neither is it meant to replace consultation with doctors. It is a space were patients and medical experts will collaborate to create a platform where individual experiences and expertise are stored in semantic data models, accessible to people and algorithmic processing. It will be free of charge, open source and built by the very people who want to use it.

