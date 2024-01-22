# Movie Database API

This Node.js/Express.js API manages a movie database and user accounts. It supports various operations like adding, updating, deleting, and fetching movies and user data, with an emphasis on security and ease of use.

## Features

- CRUD operations for movie data.
- User registration, login, update, and deletion.
- JWT-based authentication.
- Secure password handling with bcrypt.
- MongoDB for data persistence.

## Installation

1. **Clone the repository:**
-git clone [repo]("https://github.com/abhinaba900/full-stack-backend.git")

2. **Install dependencies:**
-npm install

3. **Set up environment variables in a `.env` file:**
- `PORT`: Application port.
- `DBURL`: MongoDB connection URL.
- `AUTHKEY`: JWT authentication secret.
- `REFRESHKEY`: JWT refresh token secret.

4. **Start the server:**

-node app.js


## API Usage

### Movie Endpoints

1. **Add Movie**
- **Endpoint:** `POST /movie/posts`
- **Body:** Movie details (e.g., `movie_id`, `director_name`).
- **Auth Required:** Yes

2. **Update Movie**
- **Endpoint:** `PATCH /movie/update/:id`
- **Parameters:** `:id` (movie ID).
- **Body:** Updated movie details.
- **Auth Required:** Yes

3. **Delete Movie**
- **Endpoint:** `DELETE /movie/delete/:id`
- **Parameters:** `:id` (movie ID).
- **Auth Required:** Yes

### User Endpoints

1. **Register User**
- **Endpoint:** `POST /user/register`
- **Body:** `userName`, `pass`, `email`
- **Auth Required:** No

2. **User Login**
- **Endpoint:** `POST /user/login`
- **Body:** `userName`, `pass`
- **Auth Required:** No

3. **Update User**
- **Endpoint:** `PATCH /user/update/:id`
- **Parameters:** `:id` (user ID).
- **Body:** New `pass`.
- **Auth Required:** Yes

4. **Delete User**
- **Endpoint:** `DELETE /user/delete/:id`
- **Parameters:** `:id` (user ID).
- **Auth Required:** Yes

5. **Get All Users**
- **Endpoint:** `GET /user/`
- **Auth Required:** Yes

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

[MIT License](LICENSE)

## Contact

[abhinaba] - [abhinabajana900@gmail.com]

Project Link: [url]("https://github.com/abhinaba900/full-stack-backend.git")
