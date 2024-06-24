# Task Management and Collaboration Tool 

## Table of content
- [Project Setup](#project-setup)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment instructions](#deployment-instructions)

<img width="740" alt="Screenshot 2024-06-24 at 4 24 16 PM" src="https://github.com/shwetalsoni/project-management-app/assets/57187745/9cb3981e-c1c8-4896-a1b3-09534a5d661c">
<img width="724" alt="Screenshot 2024-06-24 at 4 20 58 PM" src="https://github.com/shwetalsoni/project-management-app/assets/57187745/ef77169b-b2d2-42e1-aaa8-6fb8036d8c74">
<img width="738" alt="Screenshot 2024-06-24 at 4 22 29 PM" src="https://github.com/shwetalsoni/project-management-app/assets/57187745/d808b0f9-cb8f-47a6-8c68-0d4ec4b58edc">
<img width="286" alt="Screenshot 2024-06-24 at 4 21 43 PM" src="https://github.com/shwetalsoni/project-management-app/assets/57187745/4dcb5f56-da57-480a-91f2-e55bb4b44caa">

## Project setup
1. Project created using ```pnpm create t3-app@latest```
2. Created database on [Supabase](https://supabase.com/)
3. Connected with database using ```DATBASE_URL```
4. Created Prisma models
5. Pushed prisma schema to the database using ```pnpm prisma db push```
6. Installed few other libraries:
   - *bcrypt* - to hash passwords
   - *clsx* - to render css conditionally
   - *formik* - to manage form's state
   - *react-icons* - for icons
   - *react-toastify* - to show messages after an api call
   - *tailwind-merge* - to enable clsx to be used with tailwind 


## Architecture

### Tech stack
- Next.js
- tRPC
- Tailwind CSS
- Typescript
- Prisma
- NextAuth.js

### App flow
**Home** - ```/```

**SignUp** - ```/signUp```
- Once signed up, user need to sign in. Sign in route is built in within NextAuth.
- Once signed in, user will be redirected to ```/projects```. Here all of the user's projects will be displayed.
  
**Projects**
- **Create project** - From ```/projects```, user can go to ```/projects/create``` to create a project.
- Once project is created, user will be redirected to ```/projects/<projectId>```
  
**Project settings** 
- Go to ```/projects/<projectId>/update``` by clicking on settings icon beside project title on top.
- Here user can view and update project's title and description.
- User can **add members** to project using email id. To know more about inviting members to project, go to [Invite Members Flow](#invite-members-flow)
  
**Create Tasks**
- Go to ```/projects/<projectId>/tasks/create``` by clicking on *Add task* button.
- Here user can add task to project by filling in required details.
- Once the task is created, user will be redirected to task details page ```/projects/<projectId>/tasks/<taskId>```.

**Update Task**
- Go to ```/projects/<projectId>/tasks/<taskId>/update``` by clicking on *Update Task* button on task details page.
- Here user can update tasks info(*title*, *description*, *assignee*, *tags*), assign task to any project member.
- User can change task status by clicking on pencil icon beside task status.

### API architecture


### Invite Members Flow

## Testing

## Deployment instructions
