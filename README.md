# Janus Interview Project

## Introduction
This is my submission for my interview for the Janus Health technical interview. The small project that I made herein fulfills the following requirements gleaned from communication with the staff at Janus:


**This project must:**
-  Be written in Typescript
- Use Playwright.js
- Navigate to Amazon's homepage and submit the following three queries:
    - nvidia 3060
    - nvidia 3070
    - nvidia 3080
- Record the following information regarding the three lowest-priced items seen on the first page of sarch results for each query:
    - the url
    - the price
    - the date accessed
- Create a CSV file of all of the recorded information


This assignment took about a weekend for me to finish, and this included all of the time spent becoming acquainted with Playwright.js, which I had previously never used before.

## Setup instructions
To set up this repo, follow the steps provided below:

1. Clone the repo to your local desktop
2. Navigate to the root folder
3. Run `npm install` to set up dependencies

## Executing the code
Run `npm run start` in order to execute the code.
The resulting CSV files are added to the `outputCsv` folder in the root directory

## Testing the code
I've included some tests for some of the helper functions. 
You can run them by running `npm run test` in the command line