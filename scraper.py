from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import csv

CSV_PATH = './data/jobs.csv'
TXT_PATH = './data/urls.txt'

class Job:
    def __init__(self, pos_title, company, location, post_date, description, app_url) -> None:
        self.title = pos_title
        self.company = company
        self.location = location
        self.date = post_date
        self.description = description
        self.url = app_url

with open(TXT_PATH, 'r') as urls:
    lines = urls.readlines()

urls = set([line.strip() for line in lines])

with open(CSV_PATH, 'w', newline='') as csv_file:
    csv_file.write('')
    
chrome_options = Options()
#chrome_options.add_argument("--headless")  # Run Chrome in headless mode
#chrome_options.add_argument("--disable-gpu")  # Disable GPU acceleration
#chrome_options.add_argument("--window-size=1920,1080")  # Set the window size

driver = webdriver.Chrome(options=chrome_options)
driver.maximize_window()

driver.get('https://www.linkedin.com/jobs/search?keywords=Software%20Engineer&location=United%20States&locationId=&geoId=103644278&f_TPR=&f_E=2&f_JT=F&position=1&pageNum=0')

time.sleep(2)

with open(CSV_PATH, 'w', newline='') as csv_file:

    column_names = ['title', 'company', 'location', 'date', 'description', 'url'];
    writer = csv.DictWriter(csv_file, fieldnames=column_names)
    writer.writeheader()

    while 1:

        job_cards = driver.find_elements(By.CLASS_NAME, 'base-card')
        description = driver.find_element(By.CLASS_NAME, 'show-more-less-html__markup')

        if not job_cards:
            show_more = driver.find_element(By.CLASS_NAME, 'infinite-scroller__show-more-button')
            show_more.click()
            time.sleep(2)
            continue

        for jc in job_cards:
            driver.execute_script("arguments[0].classList.remove('base-card')", jc)

        for jc in job_cards:
            driver.execute_script('arguments[0].scrollIntoView();', jc)
            jc.click()

            time.sleep(2)
            description = driver.find_element(By.CLASS_NAME, 'show-more-less-html__markup')
            desc_data = description.text

            jc_data = jc.text.split('\n')

            try:
                apply_button = driver.find_element(By.CLASS_NAME, 'sign-up-modal__outlet')
            except:
                continue
            
            apply_button.click()
            time.sleep(2)

            try:
                exit_button = driver.find_element(By.XPATH, '//*[@id="sign-up-modal"]/div/section/header/button')
            except:
                continue
            
            exit_button.click()
            time.sleep(2)

            driver.switch_to.window(driver.window_handles[-1])

            # application url
            app_url = driver.current_url

            if app_url not in urls:
                new_job = Job(jc_data[0], jc_data[2], jc_data[3], jc_data[-1], desc_data, app_url)
                new_job = vars(new_job)
                writer.writerow(new_job)

            driver.close()
            driver.switch_to.window(driver.window_handles[0])