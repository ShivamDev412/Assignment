# Assignment

## Prerequisites

- Node.js installed on your system
- MySQL installed or available via a remote connection
- `npm` installed (comes with Node.js)

## Getting Started

1. **Clone the repository**:
    ```bash
    git clone [<repository_url>](https://github.com/ShivamDev412/Assignment)
    ```

2. **Navigate into the project directory**:
    ```bash
    cd <project_directory>
    ```

3. **Install dependencies**:
    Run the following command to install all required dependencies:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    Create a `.env` file in the root of your project and add the following environment variables:

    ```env
    PORT=3000
    NODE_ENV=development
    CURRENCY_LAYER_API_KEY=ebc13402623123f3f89b72a6b4e46bf7
    DB_HOST=localhost
    DB_PASSWORD=Shivam412
    DB_USER=root
    DB_NAME=userDB
    ```

    Make sure to replace any sensitive information (such as `DB_PASSWORD` or `CURRENCY_LAYER_API_KEY`) with your actual values.

5. **Run the app**:
    You can start the application in development mode using the following command:
    ```bash
    npm run dev
    ```

6. **Test the API**:
    Once the app is running, you can access the API at `http://localhost:3000`. You can use tools like [Postman](https://www.postman.com/) or `curl` to test the endpoints.

## Available Scripts

- `npm run dev`: Runs the application in development mode with auto-reloading.
- `npm test`: Runs the test suite using Jest.

## Testing

The application uses **Jest** for testing. To run the tests, simply use:
```bash
npm test
