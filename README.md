# Job-Scraper
If you wish to preview the program with the current data loaded in jobs.csv, execute npm start and npm run server within two different terminal instances to begin fetching the data. If you check the not interested or applied box, the next time you refresh the page it will not appear on the page. At the moment Selenium for Python is required to be installed on your system in order for you to begin scraping your own job data. 

If you wish to start parsing for a different positon, currently the Python script is only equipped with the parameters of any location in the U.S. for the job search that LinkedIn Guest allows. Some altering of the script may be required for more parameters but if you only wish to change the name of the position you are applying for, you only need to change the url of the driver.get() command.

![Screenshot](Scraper.png)
