# Task Management and Collaboration Tool 

## Deployed Link


## Table of Contents
- [Project Setup](#project-setup)
- [Architecture](#architecture)
- [Testing](#testing)
- [Deployment Instructions](#deployment-instructions)



## Project Setup
1. Project created using `pnpm create t3-app@latest`
2. Created database on [Supabase](https://supabase.com/)
3. Connected with database using `DATABASE_URL`
4. Created Prisma models
5. Pushed Prisma schema to the database using `pnpm prisma db push`
6. Installed additional libraries:
   - **bcrypt** - to hash passwords
   - **clsx** - to render CSS conditionally
   - **formik** - to manage form state
   - **react-icons** - for icons
   - **react-toastify** - to show messages after an API call
   - **tailwind-merge** - to enable clsx to be used with Tailwind CSS

## Architecture

### Tech Stack
- Next.js
- tRPC
- Tailwind CSS
- TypeScript
- Prisma
- NextAuth.js

### App Flow
**Home** - `/`

**SignUp** - `/signUp`
- Once signed up, user needs to sign in. Sign in route is built in within NextAuth.
- Once signed in, user will be redirected to `/projects`. Here all of the user's projects will be displayed.

**Projects**
- **Create Project** - From `/projects`, user can go to `/projects/create` to create a project.
- Once the project is created, user will be redirected to `/projects/<projectId>`

**Project Settings** 
- Go to `/projects/<projectId>/update` by clicking on the settings icon beside the project title on top.
- Here, the user can view and update the project's title and description.
- User can **add members** to the project using an email ID. To know more about inviting members to the project, go to [Invite Members Flow](#invite-members-flow)

**Create Tasks**
- Go to `/projects/<projectId>/tasks/create` by clicking on the *Add Task* button.
- Here, the user can add a task to the project by filling in the required details.
- Once the task is created, the user will be redirected to the task details page `/projects/<projectId>/tasks/<taskId>`.

**Update Task**
- Go to `/projects/<projectId>/tasks/<taskId>/update` by clicking on the *Update Task* button on the task details page.
- Here, the user can update the task's info (*title*, *description*, *assignee*, *tags*), and assign the task to any project member.
- User can change the task status by clicking on the pencil icon beside the task status.

### API Architecture
The app contains 4 API routes in total, among which 3 are protectedProcedures (for authenticated users only), and one publicProcedure for unauthenticated users.

**Protected Procedures**
#### Project Router
- `get`
   - Params - `projectId`
   - Condition - User calling API should be a member of the project.
   - Returns - Project details, including all its tasks assigneeId (to filter tasks assigned to the signed-in user).
     
- `getUserAllProjects`
   - Params - None
   - Condition - User calling API should be a member of the project.
   - Returns - All projects that satisfy the above condition.

- `create`
   - Params - `title` `description`
   - Condition - None
   - Returns - The generated project

- `update`
   - Params - `projectId` `title` `description`
   - Condition - User calling API should be a member of the project.
   - Returns - Updated project.

- `delete`
   - Params - `projectId`
   - Condition - User calling API should be a member of the project.
   - Returns - Confirm message

- `getMember`
   - Params - `projectId`
   - Condition - User calling API should be a member of the project.
   - Returns - Members `email` `id` `username`.

- `addMember`
   - Params - `projectId` `email`
   - Condition - User calling API should be a member of the project.
   - Returns - Confirm message

#### Task Router
- `get`
   - Params - `projectId` `taskId`
   - Condition - User calling API should be a member of the project.
   - Returns - Task details, including assignee (to show all assignees while updating the task).
 
- `create`
   - Params - `projectId` `title` `description` `tags` `deadline` `assigneeId`
   - Condition - User calling API should be a member of the project.
   - Returns - Created task

- `update`
   - Params - `taskId` `projectId` `title` `description` `tags` `deadline` `assigneeId`
   - Condition - User calling API should be a member of the project.
   - Returns - Updated task

- `updateStatus`
   - Params - `taskId` `projectId` `status`
   - Condition - User calling API should be a member of the project.
   - Returns - Confirm message
 
- `delete`
   - Params - `taskId` `projectId`
   - Condition - User calling API should be a member of the project.
   - Returns - Confirm message

#### User Router
- `update`
   - Params - `username`
   - Condition - Signed-in user's ID should match the user ID in the database.
   - Returns - Updated user's `id` `email` `username`

**Public Procedures**
#### SignUp Router
- `create`
   - Params - `email` `password`
   - Condition - User with a `passwordHash` should not already exist.
   - Flow:
      - For an existing user with an empty `passwordHash` field, `update` the user with `passwordHash`.
      - For a new user, `create` the user.
   - Returns - `userId`

### Invite Members Flow
For adding a member to the project, `email-id` is used. It creates a new user with the given `email`, while `password` and `username` are set to null.
Therefore, the added user can sign up with their `email`, and create a password, which will lead to user `update`. After signing in, the user can set their `username` from the dashboard.

## Testing
For testing, [vitest](https://vitest.dev/) is being used.
- Added `vitest.config.ts`. Refer to [https://vitest.dev/config/](https://vitest.dev/config/) for configuring vitest.
- Configured path in vitest config file to use the test environment.
- Spinned up a local database by running `start-database.sh` which is generated while creating our t3 stack app.
- Created a `unit.test.ts` file.
- Using `createInnerTRPCContext` so we don't have to mock Next.js' req/res.
- For creating a user session, `Session` type is being imported from `next-auth`.
- Now for tests:
   - For creating a test user, `signUp` API needs to be called, which is a publicProcedure.
      - Before calling the API, context and caller are created without a session.
      - Once the test user is signed up, a session can be generated using the user ID.
        
Following are the tests done on the API:
1. Creating a project when the user is not signed in. (Throws error)
2. Creating a project when the user is signed in. (Returns project object)
3. Creating a task by a user who is not a member of the project. (Throws error)
4. Creating a task by a member of the project. (Returns task object)
5. Deleting a task by a user who is not a member of the project. (Throws error)
6. Deleting a task by a member of the project. (Returns success message)

## Deployment Instructions
1. Installed SST [https://ion.sst.dev/docs/](https://ion.sst.dev/docs/)
2. Installed AWS CLI [https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
3. Generated AWS access keys for CLI and configured them with `aws configure`
4. Initialized