const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const members = [];
const id = [];


function init() {


    function createManager() {
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is managers name?",
                validate: answer => {
                    if (answer === "") {
                        return "Enter at least one character";
                    } else {
                        return true;
                    }


                }

            },
            {
                type: "input",
                name: "managerID",
                message: "What is managers ID?",
                validate: answer => {
                    const regExId = answer.match(/^[0-9]+$/);
                    if (regExId) {
                        return true;
                    } else {
                        return "Please enter a positive number";
                    }

                }
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is managers email?",
                validate: answer => {
                    const regExEmail = answer.match(/\S+@\S+\.\S+/);
                    if (regExEmail) {
                        return true;
                    } else {
                        return "Please enter a a valid email adress";
                    }
                }
            },
            {
                type: "input",
                name: "managerOffice",
                message: "What is managers office number?",
                validate: answer => {
                    const regExOffice = answer.match(/^[0-9]+$/);
                    if (regExOffice) {
                        return true;
                    } else {
                        return "Please enter a positive number";
                    }

                }
            }
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOffice);
            members.push(manager);
            id.push(answers.managerID);
            createTeam();
        })
    }

    function createTeam() {
        inquirer.prompt([
            {
                type: "list",
                name: "role",
                message: "what role are you?",
                choices: [
                    "Engineer",
                    "Intern",
                    "Nothing to add",
                ]
            }
        ]).then(choice => {
            switch (choice.role) {
                case "Engineer":
                    createEngineerFunction();
                    break;
                case "Intern":
                    createInternFunction();
                    break;
                default:
                    createFile();



            }
        })
    }


    function createEngineerFunction() {
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is Engineers name?",
                validate: answer => {
                    if (answer === "") {
                        return "Enter at least one character";
                    } else {
                        return true;
                    }


                }

            },
            {
                type: "input",
                name: "engineerID",
                message: "What is Engineers ID?",
                validate: answer => {
                    const regExId = answer.match(/^[0-9]+$/);
                    if (regExId) {
                        return true;
                    } else {
                        return "Please enter a positive number";
                    }

                }
            },

            {
                type: "input",
                name: "engineerEmail",
                message: "What is engineers email?",
                validate: answer => {
                    const regExEmail = answer.match(/\S+@\S+\.\S+/);
                    if (regExEmail) {
                        return true;
                    } else {
                        return "Please enter a a valid email adress";
                    }
                }
            },

            {
                type: "input",
                name: "engineerGithub",
                message: "What is engineers github?",
                validate: answer => {
                    if (answer === "") {
                        return "Enter at least one character";
                    } else {
                        return true;
                    }


                }

            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            members.push(engineer);
            id.push(answers.engineerID);
            createTeam();
        })


    }

    function createInternFunction() {
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is interns name?",
                validate: answer => {
                    if (answer === "") {
                        return "Enter at least one character";
                    } else {
                        return true;
                    }


                }

            },
            {
                type: "input",
                name: "internID",
                message: "What is intern ID?",
                validate: answer => {
                    const regExId = answer.match(/^[0-9]+$/);
                    if (regExId) {
                        return true;
                    } else {
                        return "Please enter a positive number";
                    }

                }
            },

            {
                type: "input",
                name: "internEmail",
                message: "What is intern email?",
                validate: answer => {
                    const regExEmail = answer.match(/\S+@\S+\.\S+/);
                    if (regExEmail) {
                        return true;
                    } else {
                        return "Please enter a a valid email adress";
                    }
                }
            },
            {
                type: "input",
                name: "internSchool",
                message: "What is interns school?",
                validate: answer => {
                    if (answer === "") {
                        return "Enter at least one character";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            members.push(intern);
            id.push(answers.internID);
            createTeam();
        })

    }

    function createFile() {
        fs.writeFileSync(outputPath, render(members), "UTF-8");

    }
    createManager();
}
init();





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
