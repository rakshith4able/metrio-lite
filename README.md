# Metrio LITE

Metrio LITE is a web application designed for filling out forms to potentially generate environmental indicators. This project aims to provide a user-friendly interface for managing environmental data efficiently.

## Features

- **Form Management**: Visualize, create, edit, and delete forms.
- **Data Entry**: View and manage data entries associated with each form.
- **Responsive Design**: Ensures adaptability across desktop computers and mobile phones.

## Technologies Used

- React
- TypeScript
- Redux Toolkit (for state management)
- React Router (for navigation)
- MUI (for UI components)
- Framer Motion (for animations)
- Axios (for handling HTTP requests)
- JSON Server (for API mock server)

## Getting Started

To run the application locally, follow these steps:

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Run the JSON Server to serve the API using the following command:
   `npx json-server --watch db.json --port 3001`

4. Start the React application using `npm start`.

## API Endpoints

- **Forms**
- `GET /forms`: Get all forms
- `GET /forms/:id`: Get a specific form
- `POST /forms`: Create a new form
- `PUT /forms/:id`: Update an existing form
- `DELETE /forms/:id`: Delete a form

- **Data Entries**
- `GET /data?formId=:formId`: Get data entries for a specific form
- `GET /data/:id`: Get a specific data entry
- `POST /data`: Create a new data entry
- `PUT /data/:id`: Update an existing data entry
- `DELETE /data/:id`: Delete a data entry

## Developer Information

This project was developed by Rakshith Raj Gurupura Puttaraju as part of his technical interview for an internship as a Frontend Developer at Nasdaq. You can reach out to Rakshith via email at rakshithraj.gp11@gmail.com
