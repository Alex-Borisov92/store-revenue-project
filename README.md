
# Store Revenue Analysis

This project is a web application that displays store revenue data for selected date ranges. It performs user authentication via a POST request and retrieves financial data via a GET request. The data is displayed in a bar chart using Chart.js.

## Features

- User login using a POST request.
- Fetch store revenue data using a GET request.
- Date range selection using HTML date input fields.
- Display revenue data in a bar chart.

## Technologies Used

- HTML
- JavaScript (Vanilla)
- Chart.js (for rendering bar charts)
- Fetch API (for making HTTP requests)

## Installation

To run this project locally:

1. Clone the repository:
    ```bash
    git clone https://github.com/Alex-Borisov92/store-revenue-analysis.git
    ```

2. Open the `index.html` file in your web browser.

## Usage

1. Enter your login credentials (e.g., phone number and password).
2. Select the start and end dates for which you want to retrieve revenue data.
3. Click "Submit" to fetch the data and display it in the bar chart.

## Example API Endpoints

- **POST** `/admin_login`
    - **Parameters**: `username`, `password`
    - **Response**: `access_token`
    
- **GET** `/get_finance_plan`
    - **Parameters**: `start_date`, `end_date`
    - **Headers**: `Authorization: Bearer <access_token>`
    - **Response**: Revenue data for the selected date range.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
