# Job-Scraper

Applying to jobs can be hard and tedious, so let’s have a computer help us!

## Description

Job-Scraper is a full-stack application that currently only scrapes LinkedIn Guest for software engineering job data like location, description, and application url.
This data is then outputted to a frontend component that communicates with the backend to only display jobs you
haven’t applied to. The goal is to expand this to add more functionality in terms of choosing where to scrape jobs from,
what type of jobs, and being hosted publicly.

## Demo Video

https://github.com/cameronMcConnell/Job-Scraper/assets/93450810/9f99766e-beeb-4c57-8b43-46b43be4749a

## Getting Started

### Dependencies

* ```python```
* ```npm```

### Installing

* Fork this repository.
* To install node packages, go to the ```/frontend``` directory and do ```npm install```.

### Executing program

* Start by scraping jobs using the ```scraper.py``` file.
* To execute, ```python scraper.py```. Use the included ```.venv``` file locted at the root of the directory.
* After finishing, close the window that the scraper has opened and go to the ```/frontend``` directory.
* Go to ```/src/server``` and do ```node server.js```.
* Once the server has started, do ```npm start``` and you are good to go.

## Help

* Please reach out to me at my socials if you need help with starting or working on the project.

## Authors

* Cameron McConnell
* [LinkedIn](https://www.linkedin.com/in/cameron-mcconnell-704b17225/)
* cameron.mcconne@gmail.com

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
