Medium - Social Healthshare
======
> Medium is a free,crowd-sourced [Medical Decision Support System](https://github.com/bennidi/medium/wiki/Glossary#medical-decision-support-system) aiming to help patients find appropriate diagnoses and effective treatments more quickly. It uses (supervised) machine learning and advanced storage technologies to record, filter and distribute patient experiences and medical advice. Patients and medical experts can collaborate to take a further step towards [crowd-sourced health care](https://github.com/bennidi/medium/wiki/Crowdsourcing#crowdsourced-health-care).

### Some problems of public health care
 The public health care system largely relies on a small group of experts, expensive medical infrastructure and profit-oriented companies to provide medical services to a continuously growing number of people. This results in competition among patients for the limited available resources and a decline in quality of individual care. Receiving appropriate medical attention and advice, finding diagnosis or treatment options can easily turn into a time consuming and exhausting process.
 
 The current system largely fails to recognize that every patient is an active agent in her/his recovery. Patients consult doctors, undergo clinical examinations and/or treatments and research for relevant medical information. In the course of this process many of them become experts regarding their medical condition and usually end up with an extensive record of medical data. This accumulated knowledge and medical chronologies are a valuable source of information for other people with similar medical problems. It may save them time, money and suffering if appropriate diagnosis or treatment can be found more quickly. This is why there is a clear need for a tool that systematizes this knowledge and people's recommendations in order to make it accessible to the interested audience.  


### A solution based on human collaboration and computer science
Medium addresses this need by relying on [crowd-knowledge](http://en.wikipedia.org/wiki/Wisdom_of_the_crowd) and [collaborative filtering](http://en.wikipedia.org/wiki/Collaborative_filtering) in combination with established expert knowledge. The idea is quite simple:
 
 Patients manage their own [personal health record](https://github.com/bennidi/medium/wiki/Glossary#phr) and anonymously share it with the rest of the online community. Machine learning algorithms are then used to compare and categorize people's medical records, identify helpful pieces of information and selectively distribute them to users with matching profiles.
 
 Users of Medium can run interactive searches on a collection of symptoms to receive suggestions on matching medical conditions and recommendations for possibly relevant clinical tests or potentially useful therapeutic measures. 
 
 Patients with similar [medical profiles](https://github.com/bennidi/medium/wiki/Medical-Profiles) are automatically connected to receive updates about the progress made by their [peers](https://github.com/bennidi/medium/wiki/Medical-Profiles#medical-buddies) such that individual discoveries quickly spread through the network. It is also possible to save specific search requests in order to receive updated results as soon as other users add new information. 

The collected medical data will also be used to compile *catalogues of common medical knowledge*, including lots and lots of statistical information. These statistics are meant to guide users when assessing effectiveness of drugs and treatments, as well as alert them to potential risks, such as experienced side-effects or surgery complications.

Medium aims to include and promote approaches of alternative medicine as well as any other method that people invent for themselves as long as there is evidence for its effectiveness among the user base.

Go on to read more about 
+ [how it works](http://github.com/bennidi/medium/wiki/How-it-works)
+ [the mission statement](http://github.com/bennidi/medium/wiki/Mission-Statement)
+ [how Medium is different](http://github.com/bennidi/medium/wiki/FAQ#how-we-make-a-difference)
+ [our motivation and philosophy](http://github.com/bennidi/medium/Motivation-and-Philosophy)


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

