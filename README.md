
# Wrapt-Uploader: A Next.js Technical Challenge Submission 

## Disclaimer:
I wanted to mention that I initially tried to complete the challenge using RedwoodJS according to the recommendation to read about it. I took the time to go through the RedwoodJS tutorial, and the code for that can be found in the repository [here](https://github.com/ArantesJoao/redwoodblog). However, while trying to initiate the main project using RedwoodJS, I encountered multiple errors, mainly linked to the CLI commands. While I observed similar issues on their forums, especially regarding generating scaffolds and SDLs, I understand that these challenges are likely due to my unfamiliarity with their specific patterns and best practices.

Additionally, while the challenge mentioned using S3, I chose to use Firebase for this submission. The only reason was that S3 required a credit card for setup, because of their pay-as-you-use model, whereas Firebase offered a free plan without needing credit card information. That being said, I'm quite familiar with the AWS S3 SDK and use it extensively in my current job. I'm confident in implementing and integrating S3 services when required.
 
While I am sure I can learn and effectively use RedwoodJS and GraphQL given some time, I wanted to ensure I provided a solution in a timely manner. So, I've completed the challenge using Next.js, Prisma, and React.

Please note, I've also recorded a video showcasing the application in action, which provides an in-depth view of its functionality. The video is available at [this link](https://www.youtube.com/watch?v=lpqzKOvbeEs)! 

## Setting Up the Project  

### Prerequisites:
1. Ensure you have Node.js and npm installed.

### Step 1. Clone the repository: 
``
git clone https://github.com/ArantesJoao/wrapt-challenge
``

``
cd wrapt-challenge
``
### Step 2.  Create a `.env` file at the root of the `wrapt-uploader` directory and add the following values: 
``
DATABASE_URL="mongodb+srv://wrapt:technicalchallenge@wraptuploader.ejjvwsm.mongodb.net/files" 
``

``
FIREBASE_API_KEY="AIzaSyDbDusDCBu-l78RmkzA3dl2GVdEg2t5Ny0"
``

``
FIREBASE_APP_ID="1:963003186645:web:7ef1ef46a17aca90c4915c"
``

### Step 3. Install the required dependencies and run the development server
``
npm install
``

``
npm run dev
``

This should start the Next.js application, and it will be accessible at `http://localhost:3000`.

### Final comments
Thank you for considering my submission. I'm enthusiastic about this role and am confident in my ability to learn and adapt to any technologies or frameworks that may be required in the future.
