# Employee Tracker

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) 

## Description

- My motivation behind this project was to integrate a MySQL database into a command line application. 
- I built this project to better understand SQL logic.
- This project aims to create a command line application which, through the use of Inquirer, allows the user to interact with a MySQL database, performing a variety of functions.
- Through this project, I learned a lot about SQL logic, how to join tables together, how to filter data, and how to integrate that with user input.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Video Demonstration](#video)
4. [License](#license)
5. [How to Contribute](#how-to-contribute)
6. [Questions?](#questions)

## <a id="installation"></a>Installation

**Note**: This application requires the use of [Node.js](https://nodejs.org/en/) and [MySQL](https://www.mysql.com/)

To install this project, you first need to clone this repo. To install dependencies, open in [Visual Studio Code](https://code.visualstudio.com/), and in the terminal run: 

      npm install 

Alternatively, you can navigate to the application's installation location in [Git Bash](https://git-scm.com/downloads) (or similar command-line tool) and do the same.

To create the database, in the terminal start MySQL by running:

        mysql -u root -p

Then create the database by running:

        source ./db/schema.sql;
        source ./db/seeds.sql;

## <a id="usage"></a>Usage

**Note**: Before running the app, first open index.js and add your MySQL password to line 47. 

Once the application is opened in Visual Studio Code, or navigated to using Git Bash (or similar command-line tool), run: 

      node index.js 

## <a id="video"></a>Video Demonstration

The full video demonstration can be found [here](https://drive.google.com/file/d/1akaXlDVAALUGOg0UpZPiW7CJCMMjRKeb/view)

![Screenshot of the command-line using the app](./assets/images/screenshot-1.png)
![Screenshot of the command-line using the app](./assets/images/screenshot-2.png)

## <a id="license"></a>License

This application is covered under the [MIT](https://opensource.org/licenses/MIT) license

----------------------------------------------------------------

  Copyright © 2022 Richard Zhang

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  ----------------------------------------------------------------

## <a id="how-to-contribute"></a>How to Contribute

If you want to contribute to this project and make it better, your help is very welcome. This was a school project, so anything you want to do to it, go for it. You can also contact me directly through the links below.

## <a id="questions"></a>Questions?

Have any questions? Here is a list of my links:
- GitHub: [RichardZhang01](https://github.com/RichardZhang01)
- Email: richardzhiyuanzhang@gmail.com

