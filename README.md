Medium - Social Healthshare
======
> A [crowd-sourced](https://github.com/bennidi/medium/wiki/Crowdsourcing), open [Medical Decision Support System](https://github.com/bennidi/medium/wiki/Glossary#medical-decision-support-system) aiming to support patients in their search for appropriate diagnoses and effective treatments.

> Medium uses machine learning techniques to automate word-of-mouth recommendations and make data mining of medical data available to the public. [Patients](http://github.com/bennidi/medium/wiki/How-it-works#patients) and [clinicians](http://github.com/bennidi/medium/wiki/How-it-works#clinicians) collaborate to take a further step towards [crowd-sourced health care](https://github.com/bennidi/medium/wiki/Crowdsourcing#crowdsourced-health-care).

Medium's primary goal is to accelerate the process of finding proper diagnoses and effective treatment of medical conditions by using the knowledge of the crowd. The idea is quite simple: people anonymously document and share their medical histories using modern web software. Machine learning techniques are then applied to match people's medical records, identify useful pieces of information and selectively distribute them to the users who might benefit. This works on demand when people are actively searching for medical information regarding their own, a friends' or a patients' case resulting in suggestions about matching medical conditions, possibly relevant clinical tests or potentially useful therapeutic methods. It also works _automagically_ when people with similar [medical profiles](https://github.com/bennidi/medium/wiki/Medical-Profiles) are linked with each other and receive updates about the progress made by their [peers](https://github.com/bennidi/medium/wiki/Medical-Profiles#medical-buddies) so that individual discoveries quickly spread through the network.

The collected medical data will also be used to compile catalogues of common medical knowledge, including lots and lots of statistics. These statistics are meant to guide users when assessing effectiveness of drugs and treatments, as well as alert them to potential risks, such as experienced side-effects or surgery complications. Medium includes and promotes alternative medicine as well as any other methods that people invent for themselves as long as there are enough people claiming its benefits.

The main idea behind Medium builds on the fact that every patient is an active agent in their medical story who consults doctors, undergoes clinical tests, treatmends, therapy and researches his/her condition. Due to this process many patients become experts regarding their own condition and usually end up with an extensive record of relevant medical information. Patient's knowledge and individual medical chronologies are therefore an invaluable source of information for many others with similar symptoms. It has the potential of saving others time, money and suffering if appropriate diagnosis and treatment can be found more quickly. Medium primarily aims to systematize this knowledge and people's recommendations to make it available to others. Read more about the [mission statement](http://github.com/bennidi/medium/wiki/Mission-Statement), [how it works](http://github.com/bennidi/medium/wiki/How-it-works) and the [motivation and philosophy](http://github.com/bennidi/medium/Motivation-and-Philosophy) behind the project.



# Project plan
The endeavours of transforming Medium into reality have already begun. The first step was the creation of an online space where people can contribute further developing the idea, build data models, write code and finally release the first prototype. This is what this github repository will be used for.

The [issue](https://github.com/bennidi/medium/issues) list is used as the primary collaboration tool to collect and develop ideas, index and document on/offline resources, track code issues etc. Issue labels and milestones are used to organize issues into meaningful groups. Label indexation also allows for a good searchability. This is a list of the most important labels:
 + *[task](https://github.com/bennidi/medium/labels/task)*: Tasks describe work that needs to be done
 + *[use case](https://github.com/bennidi/medium/labels/use case)*: The development part of the medium platform will be use case driven, as such the term use case is in the ordinary software development sense of the term: A description of a set of user interactions necessary to complete a task that people want to accomplish with the medium platform.
 + *[peer](https://github.com/bennidi/medium/labels/peer)*: We want to learn from what and how others are doing
 + *[data](https://github.com/bennidi/medium/labels/data)*: Available medical data will help in the initial development phase
 + *[non-profit](https://github.com/bennidi/medium/labels/non-profit)*: Mark a peer, medical service or other resource as non-profit
 + *[commercial](https://github.com/bennidi/medium/labels/commercial)*: Mark a peer, medical service or other resource as commercial
 + *[medical service](https://github.com/bennidi/medium/labels/medical service)*: A medical service that users may consume directly
 + *[discourse](https://github.com/bennidi/medium/labels/discourse)*: To follow the public discourse on topics related to medicine
 + *[study](https://github.com/bennidi/medium/labels/study)*: If the issue references a study

## Work in progress
There is no established and detailed project plan which can be followed to successfully develop the project. There are of course many ideas floating around and a foreseeable set of steps to be taken.

* Build a first prototype to browse and manage medical data collaboratively: This is one of the major prerequisites for collaboration with medical experts. There must be an online system that allows to store medical expert knowledge and apply the knowledge to fake patient data for testing
  * design and implement a first draft of the medical data model
  * create REST api to expose the data model
  * create web based UI to make the data model accessible to clinicians and other collaborators
* Build a network and spread the idea: Finding supporters and engaging with the community of users is an ongoing process of the entire project. Especially in the initial phase it will be important to get feedback and connect with people who want to push the project
* Start a crowd-funding campaign to make Medium a full-time project: To build a sophisticated system like Medium a stable core team is required. This team must be financed as people can not live from love and laughter. Hosting and other things will also consume money. At some point there must be some money involved in the project.

# Contribute
Medium can make use of virtually all support that somebody wants to give. From simple feedback in the projects issue list, code contributions, design suggestion, free licenses for interesting tools, hosting, to financial support. If you want to get involved just raise the topic in the [issue](https://github.com/bennidi/medium/issues) list. Here is a more specific list of possible contributions or necessary collaborations:

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
> Medium is by no means a diagnostic tool capable of providing irrefutable diagnoses or treatments. It is neither meant to replace doctor consultations nor disrupt established treatments. It is instead a space for patients and medical experts to collaborate and create a platform where individual experiences and expertise are stored in semantic data models, accessible to people and algorithmic processing. It will be free of charge, open source and built by and for the very people who want to use it.

