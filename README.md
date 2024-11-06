# Requirement Document: Google Login Page with Backend Authentication

## Project Overview

This project aims to create a modular Google Login page integrated with token-based authentication, suitable for deployment on AWS EC2. The front-end developer will build the Google Login interface, and the back-end developer will implement token-based authentication in Django. The project will store and display basic user information (name, email, and profile picture) and allow authenticated access to a dummy API. Role-based access will be added in a future phase.

## Objectives

1. **Enable Google Login** using OAuth 2.0.
2. **Securely store user data** (name, email, picture) on the back end and validate user sessions using token-based authentication (JWT).
3. **Implement a dummy API endpoint** that returns user data only for authenticated requests.
4. **Include logout functionality** to clear the session and redirect users back to the login page.

## Front-End Requirements

**Primary Responsibilities**

1. **Google Login Interface**
   - Use React to create a Google Login button that initiates the OAuth process.
   - After successful login, display the user's name, email, and profile picture on the page.
   - Send the obtained Google ID token to the back end for verification and further processing.

2. **JWT Storage and Management**
   - Store the JWT token in a secure location (such as `httpOnly` cookies or local storage).
   - Ensure the token persists across page reloads and is sent in headers for authenticated requests.
   - Implement a logout button that clears the token and redirects the user back to the login page.

3. **Frontend API Calls and Protected Page**
   - Create a protected page (e.g., `Profile` page) that calls the dummy API to fetch and display user information.
   - If the token is missing or expired, redirect the user to the login page.

**Tech Stack**: React, Google OAuth Library (e.g., `react-oauth/google`)

## Back-End Requirements

**Primary Responsibilities**

1. **OAuth Token Verification and User Data Handling**
   - Use Django to set up an endpoint that verifies the Google ID token received from the front end.
   - Upon successful verification, retrieve user data (name, email, and picture) from Google and generate a JWT token for the user.
   - Return the JWT token to the front end to be stored and used for subsequent API calls.

2. **Token-Based Authentication with JWT**
   - Implement a Django middleware or decorator that verifies the JWT token for each incoming request.
   - Configure token expiration and renewal as necessary.
   - Restrict access to the dummy API endpoint based on the presence and validity of the token.

3. **Dummy API Endpoint**
   - Set up a protected endpoint (e.g., `/api/user/info`) that returns the user’s name, email, and picture.
   - The endpoint should only respond if the request includes a valid JWT token; otherwise, it should return a 401 Unauthorized response.

4. **Logout Endpoint**
   - Implement a logout endpoint that invalidates the user’s token, or clear the JWT token from the front end, as needed.
   - Ensure logout securely ends the session.

**Tech Stack**: Django, Django REST Framework (DRF) for API, PyJWT for JWT handling

## Workflow and Authentication Flow

1. **User clicks the Google Login button** on the front end.
2. **Frontend initiates Google OAuth**, retrieves the Google ID token, and sends it to the back end.
3. **Back end verifies the ID token**, retrieves user information, and issues a JWT token for the session.
4. **JWT token is sent back to the front end**, where it’s stored securely.
5. **User accesses the Profile page**, which sends a request with the JWT token to the dummy API endpoint.
6. **Back end validates the JWT token** and returns user data to the front end.
7. **Logout** clears the JWT token from storage and redirects the user to the login page.

## Error Handling and Security

- **Front end should handle login failures gracefully** (e.g., display an error message if Google Login fails).
- **Back end should securely verify Google ID tokens** and prevent token spoofing.
- **Logout** should securely end the session by removing the JWT token from the client.

## Additional Suggested Features

- **Future Phase: Role-Based Access**: Add basic roles (e.g., user, admin) with differentiated access levels.
- **Token Renewal**: Add token expiration and refresh mechanisms if session persistence is needed over longer periods.
- **Documentation**: Include a README detailing setup steps, Google OAuth setup instructions, and API usage.

## Milestones

1. **Phase 1: Front-End Google Login Button**
   - Implement Google Login with OAuth integration.
   - Display user info (name, email, picture) after successful login.
   - Set up JWT token storage and basic error handling.

2. **Phase 2: Back-End OAuth and JWT Authentication**
   - Implement OAuth verification and JWT issuance.
   - Create a middleware for token-based API access control.
   - Set up dummy API endpoint to return user data only with valid token.

3. **Phase 3: Front-End and Back-End Integration**
   - Integrate front-end login flow with back-end authentication.
   - Implement a protected Profile page with API call to display user info.
   - Finalize logout functionality.

4. **Phase 4: Documentation and Testing**
   - Complete setup documentation and integration steps.
   - Test login, token storage, and API access workflows.
