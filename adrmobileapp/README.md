# Getting Started

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

## Set up

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More
To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

### Versions
Make sure you're running the following versions of Node JS/npm or higher:\
npm: v18.17.0 (check: `npm -v`)\
Node JS: 10.4.0 (check: `node -v`)

