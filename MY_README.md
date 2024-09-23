# Real Estate Care

For demo login: Username: admin Password: admin123

This project is a mobile application for Real Estate Care, developed based on the specifications outlined in the assignment.

## Tools and Technologies

- **Visual Studio Code**: The primary IDE used for development.
- **Vue.js**: A progressive JavaScript framework for building user interfaces.
- **Vuetify**: A Material Design component framework for Vue.js, utilized to create a responsive and aesthetically pleasing user interface.
- **Pinia**: A state management library for Vue.js, providing a simple and intuitive API for managing application state.
- **JSON Server**: A lightweight server for mocking a REST API using JSON files.

## Design and Layout

To enhance user experience and ensure compliance with the Web Content Accessibility Guidelines (WCAG), I conducted comprehensive research on Vuetify to determine the most effective layout options. By leveraging Vuetify’s robust component library, I created a responsive interface that adapts seamlessly to various screen sizes. Additionally, I incorporated Material Design Icons (MDI) throughout the application to facilitate intuitive navigation and enhance visual appeal.

In implementing WCAG standards, I utilized appropriate HTML elements and prioritized mobile UI design principles within Vuetify. Special attention was given to color contrast and readability, adhering closely to the specifications outlined in the attached mockup file.

**Challenge:** The project specifications indicated the necessity for a toggle feature to switch between dark and light modes. Despite my attempts to implement this functionality dynamically using Vuetify’s theme options and CSS adjustments, I encountered difficulties that prevented successful integration. Consequently, I opted to remove this feature from the current version of the application. Additionally, I faced uncertainty regarding the implementation of notification mechanisms within a demo context, leading to the decision to retain notifications in a display-only format.

## Component Structure and Naming Conventions

After gaining a comprehensive understanding of the assignment requirements, I constructed the necessary components for the application. I adhered to the DRY (Don't Repeat Yourself) principle by creating reusable components and established a clear naming convention for all files and components, enhancing maintainability and readability.

Once the layout and components were finalized, I developed the router configuration to manage navigation effectively.

## Setting Up JSON Server

To provide backend functionality for my application, I chose to implement a local JSON server as a mock web API. The setup process involved installing the JSON Server package via npm. Upon successful installation, I developed the necessary logic to support CRUD (Create, Read, Update, Delete) operations, allowing seamless interaction with the server. I employed asynchronous programming patterns to ensure responsiveness and optimal user experience.

**Challenge:** During development, I encountered issues when attempting to upload images and PDFs to my JSON file, resulting in null property values for these uploads.

**Solution:** To address this, I initiated a systematic debugging process. First, I utilized `console.log` statements at critical points in my code to track the flow of data and verify the state of the relevant variables. By logging the values of the files being uploaded just before they were sent to the JSON server, I confirmed that the input elements were capturing the selected files correctly.

Next, I reviewed the file handling logic, ensuring that the event listeners for file inputs were properly configured to update the store with the correct file objects. I discovered that I needed to verify that the file input was accessing the files array correctly and whether the data binding to the state management (Pinia) was functioning as intended.

After confirming that the files were being captured, I traced the data flow into the function that handles the API request to the JSON server. I verified that the correct payload was being sent and adjusted the asynchronous logic to ensure that all file data was available before making the request.

Ultimately, by employing a methodical approach to debugging and making targeted adjustments based on my findings, I successfully resolved the issue, ensuring that images and PDFs were correctly uploaded to the JSON server, allowing for proper persistence and later retrieval.

## Usage Examples

1.  **Creating an Inspection**:

    - Navigate to the inspection form and select the desired inspection type from the dropdown menu.
    - Complete all required fields and upload any relevant documentation or images.
    - Click the "Submit" button to save the inspection data.

2.  **Viewing Inspections**:

    - After submission, users can navigate to the assigned inspections page to view a comprehensive list of all inspections.
    - Users have the option to edit or delete individual reports.
    - When an inspection is marked as 'Completed,' it is automatically moved to the completed reports section.
    - In the completed reports section, users can view detailed reports and delete them if necessary.
    - If an inspection includes an attached image, it will be displayed; if a PDF is attached, a link to the documentation will be provided.
    - Users can access settings to update their username and password or log out of the application.

## Security

To ensure the protection of user information, I implemented a robust authentication mechanism that restricts access to sensitive data within the application. This guarantees that only logged-in users can interact with critical features, while non-authenticated users are prevented from navigating directly via URL to restricted areas.

### Authentication and Access Control

The authentication process verifies user credentials against stored data, ensuring that only authorized individuals can access the application. This involves checking the username and password against a local JSON server that simulates a database, enhancing security by not exposing sensitive data.

### Mitigating XSS Attacks

To protect against Cross-Site Scripting (XSS) attacks, I employed Vue's double curly bracket syntax for data binding within the HTML templates. This practice effectively escapes HTML content, preventing script injections and safeguarding user input.

### Asynchronous Data Handling

Utilizing asynchronous programming with `async` and `await` enhances security during data transactions with the JSON server. This ensures that user inputs, such as file uploads, are handled correctly before any interaction with the server occurs. By managing these operations asynchronously, I minimized the risk of race conditions or incomplete data submissions, ensuring that all necessary validation checks are performed before data is sent to the server.

### Input Validation

I implemented validation checks for required fields within forms, preventing the submission of incomplete or invalid data. This not only improves user experience by providing immediate feedback but also adds a layer of security by ensuring that only correctly formatted data is sent to the server.

## Own Reflection

This project presented both enjoyable challenges and significant learning opportunities. My experience with Vue.js was particularly enlightening; I was impressed by its functionality and the clarity it brings to project organization. Working with Vuetify for the first time allowed me to appreciate the simplicity and effectiveness of component-based design. Throughout the development process, I encountered various obstacles, but the wealth of online resources—including tutorials and community forums—proved invaluable in overcoming these challenges. During development, I faced challenges in keeping some of my code files concise, particularly due to the numerous options available for different types of damage. This required careful organization and structuring of the code to ensure maintainability while accommodating the various inspection types. Overall, this project has greatly contributed to my growth as a developer.
