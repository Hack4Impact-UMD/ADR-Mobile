# ADR-Mobile

## Notes

### Weekly Sprints
We have weekly sprints, so refer to this document for more information on the tasks for each week from the team meetings/Kanban boards.
Document: [[ENG] Task Document](https://docs.google.com/document/d/1g5TbIgoe8DSwe-ge1hGJ00EVvwB7iH6icC0brqSoiNI/edit?usp=sharing)

### PR Notes
For the PR descriptions, we encourage writing out a complete summary of the tasks finished within that PR and a list of 
methods you tested the code with. The testing can be just one line just to inform the reviewer. Because this is a mobile app,
there are multiple methods of testing, which is why we ask you to list methods of testing.

If your PR is not reviewed within 24 hours, please let the tech leads know through a message on Slack.

### App Functionality
The mobile app provides parents with these functions:
- Can fill out surveys
- Can add data such as - name, email, school system, # of kids in the school system, specific school within the district)
- Can view reading assignments/schedule
- Can view trivia questions corresponding to the reading assignment that they are expected to ask their kid(s)
- Can fill out an explicit acknowledgment that they did the reading
- Push Notifications: Reminders to do reading, complete the survey if not done, and donate to ADR

Here's the link to the project description if needed: [Project Description](https://docs.google.com/document/d/1y50XRpccxLHVL44KJC0-1UytJAYSf8k1pp2nCGeGgBs/edit)

## Expo
We are leaving this here for reference on running Expo.

### Downloading the app on your device
You can choose to download the Expo Go app to run the app. If you choose to do so, make sure to switch to development build by pressing 's'.

You can also scan the Metro code that will appear upon running the build command with your iPhone camera or the Expo Go app on an Android phone.

### Commands
These are commands you will see upon building the app, but we are leaving them here for reference.

› Press s │ switch to development build\
› Press a │ open Android\
› Press i │ open iOS simulator\
› Press w │ open web\
› Press j │ open debugger\
› Press r │ reload app\
› Press m │ toggle menu\
› Press o │ open project code in your editor\
› Press ? │ show all commands

## Scripts
We will be using Expo to run the app on iOS, Android, and the web (web would be primarily for testing).

#### `npm install`
Make sure you install all dependencies by running this command.

#### `npm install react-native-web`
This is primarily for running the app on the web. If you plan on testing it or need to test it on the web, use this command.

#### `npm install react-native`
Run this command to install react-native on your local machine if the app is unable to detect the package.

#### `npm install -g expo-cli`
This is important to install, as we will be running the app through Expo. 

#### `npx expo start`
Starts the development server. You could also do `npm expo start` or `expo start` - these are some other commands that might work if `npx expo start` does not.

### Versions
Make sure you're running the following versions of Node JS/npm or higher:\
npm: v18.17.0 (check: `npm -v`)\
Node JS: 10.4.0 (check: `node -v`)
