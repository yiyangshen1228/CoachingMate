# COMP90082 Software Project GA-Boxjelly

- [COMP90082 Software Project GA-Boxjelly](#comp90082-software-project-ga-boxjelly)
  - [Project Background](#project-background)
  - [Project Description](#project-description)
  - [Development Team Members](#development-team-members)
  - [Project Management Tools](#project-management-tools)
  - [Github Structure](#github-structure)
  - [Sprint Change Logs](#sprint-change-logs)
      - [Sprint 1 Change Logs](#sprint-1-change-logs)

## Project Background

**CoachingMate**: 
**CoachingMate** is a service that focuses on effectively delivering programmes and tracking athletes' goals. CoachingMate is a cloud-based ecosystem that is integrated with wearables such as Garmin watches, allowing detailed tracking information about workouts to be gathered and convenient instructions for athletes to track their progress.


> **Client**: 
> [**Ollie Allan**](https://vic.tri-alliance.com/ollie-allan/)
>Ollie has been involved in triathlon for more than 16 years, and he also possesses a long list of qualifications, such as Level 2 Triathlon Coach, Level 1 Cycling, Swimming, Strength & Conditioning Coach, Bachelor of Arts in Recreation Management, and more. He was the driving force behind the partnership between CoachingMate and The University of Melbourne on the CoachingMate System. Through this project, he wants to offer his services to more athletes in a more professional way.<br>
> **Tri-Alliance**:
> [**Tri-Alliance**](https://vic.tri-alliance.com/about/)
>The largest triathlon training group in Melbourne, Tri Alliance VIC provides coaching, group training, and triathlon training plans for athletes of all experience levels and skill sets. They are a network of coaches, partners, resources, and industry professionals who collaborate to offer athletes education, coaching, training, information, and access to a vibrant triathlon community. Since 2000, Tri Alliance VIC has served as the official triathlon training and coaching organization for Melbourne's Gatorade/Active Feet Triathlon Series (Tri Alliance Triathlon Community, 2019).


**Garmin**: 
**Garmin** uses **Garmin Connect** to sync with wearable devices such as Garmin watch which has the ability to collect health information and physical activities of the user to track, analyse and share such data. Garmin provides some APIs that allow us developers to access those data.

- [Garmin API](https://developer.garmin.com/gc-developer-program/overview/)
- [Garmin Activity API](https://developer.garmin.com/gc-developer-program/activity-api/)
- [Flexible and Interoperable Data Transfer (FIT) SDK](https://developer.garmin.com/fit/overview/)

## Project Description

**Project Goal**:
In this project, the development team will be creating a **dashboard** for CoachingMate. CoachingMate is a service that focuses on effectively delivering programmes and tracking athletes' goals. CoachingMate is a cloud-based ecosystem that is integrated with wearables such as Garmin watches, allowing detailed tracking information about workouts to be gathered and convenient instructions for athletes to track their progress. 

In order to serve more athletes in a professional way and help them to achieve their goal , activity visualization is important. We need to create a new dashboard to show athletes a snapshot of activitiy information and their progress in an efficient and understandable way.

**Project Scope**: 
This project focuses on only three activity types: swimming, running and cycling.
1. Performing tests to current integration between wearable devices and CoachingMate web application.
2. Create a new Athlete Dashboard that shows a snapshot of all the activity information(load, distance, time) and how an athlete is performing overall. Depending on the plan of the coach, sleep or recovery information should also be displayed.
3. By comparing a tasked workout and actual completion data received, to see how well the athlete achieved their goal.
4. Improvements to the coach dashboard, allowing coaches to access athletes' overall workout information more easily and efficiently.

**Out of Scope**:
1. This project only aim to develop the data visualisation and other helper functionalities of the dashboard. Analysis and processing of the incoming data is not within the scope of the project.
2. The development of the detailed page of each activity is not within the scope of the duty of Boxjelly development team.

## Development Team Members
**Supervisor**: [Lin Li](lin.li10@unimelb.edu.au)

**Team Members**: 

| Name           | Role     | Email                                 |
| -------------- | -------  | ------------------------------------- |
| Yiyang Hou   | Product Owner        | yiyhou1@student.unimelb.edu.au   |
| Zhiyu Zhao   | Front-end Lead       | zhiyzhao1@student.unimelb.edu.au |
| Cui Sun      | Scrum Master         | cusun@student.unimelb.edu.au     |
| Yiyang Shen  | Full stack Developer | yiyashen@student.unimelb.edu.au  |
| Xin Li       | Testing Lead         | xli21@student.unimelb.edu.au     |

## Project Management Tools

- [Boxjelly Confluence Space](https://confluence.cis.unimelb.edu.au:8443/display/COMP900822022SM2GABoxJelly)
- [Trello](https://trello.com/b/dhVT1pbF/coachingmate-dashboard-ga-boxjelly) 

## Github Structure

```shell
├── docs/
  ├── Sprint 1 Documentations/
  ├── Sprint 2 Documentations/
  ├── Sprint 3 Documentations/
  ├── Sprint 4 Documentations/
├── src/
​  ├── coaching-mate/
​  ├── cm-frontend/	
  ├── cm-frontend-react/		
  ├── coaching-mate-frontend-2.0/	
├── tests/ 
├── prototypes/
  ├── low fidelity/
  ├── high fidelity/ 
├── ui/ 
├── data samples
└── README.md
```

| Path                      | Description                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------- |
| README.md                 | Project background, team members, GitHub structure & change logs for each sprint                          |
| [docs/](./docs/)                     | Documentation files                                                                            |
| [src/](./src/)                      | Project source code                                                                                       |
| [tests/](./tests/)                    | User/system tests                                                                                         |
| [prototypes/low fidelity/](./prototypes/low%20fidelity/)  | Low fidelity files (screens, mockups, etc.)                                                               |
| [prototypes/high fidelity/](./prototypes/high%20fidelity/) | High fidelity files (screens, source files, etc.)                                                         |
| [ui/](./ui/)                       | User interface design & development related files: (prototype materials, icons, fonts, backgrounds, etc.) |
| [data samples/](./data%20samples/)             | Project input data for prototyping (simulation or DEMO)  

## Sprint Change Logs

**Documentation Change Log Format**: `{Date}` - `{Owner}` - `{Description}` <br>
**Development Log Format**: `{Epic id}` - `{User story id}` - `{Description}`

#### Sprint 1 Change Logs

**Documentation Change Log**:<br>
- 18/08/2022 - Yiyang Hou - Setup Github repository and create the folder structure.<br>
- 18/08/2022 - Cui Sun - Confluence setup<br>
- 18/08/2022 - Zachary Zhao - Motivational model<br>
- 18/08/2022 - Cui Sun - User Stoies <br>
- 18/08/2022 - Cui Sun - Personas<br>
- 18/08/2022 - Yiyang Shen - Development Environment<br>
- 18/08/2022 - Yiyang Shen - Project Plan <br>
- 18/08/2022 - Xin Li - Meeting minutes<br>
- 19/08/2022 - Cui Sun - Background<br>
- 19/08/2022 - Yiyang Hou - Confluence front page is created.<br>
- 21/08/2022 - Cui Sun - Update project scope.<br>
- 21/08/2022 - Zachary Zhao - Update the motivational model.<br>
- 21/08/2022 - Yiyang Hou - Add the PDF export of requirement analysis documentations to `docs/`.<br>

#### Sprint 2 Change Logs

**Documentation Change Log**:<br>
- 14/09/2022 - Yiyang Shen - Update plan v2.0
- 14/09/2022 - Zachary Zhao - Update motivational model v2.0
- 14/09/2022 - Yiyang Hou - Update development environment v2.0
- 15/09/2022 - Cui Sun - Update user stories v2.0
- 15/09/2022 - Xin Li - Update persona v2.0
- 17/09/2022 - Xin Li - Prototypes
- 18/09/2022 - Yiyang Hou - Development
- 18/09/2022 - Yiyang Shen - Quality Control
- 18/09/2022 - Cui Sun - Sprint 2 review

**Develoment Log**:<br>
- Epic-01 - US01 & US02 - Garmin API connection testing
- Epic-02 - US03 & US04 & US05 & US07 - Athlete activity data view

> Partially completed tasks:
> - Epic-02 - US06 & US10 & US11 & US12 & US14 & US15 - Athlete activity data view
