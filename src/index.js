const superagent = require("superagent");
const prefix = require("superagent-prefix")(
  "https://flick-radar-api.herokuapp.com"
);

// ================================

const generateRequest = async ({ method, path, query }) =>
  await method(path)
    .query(query)
    .use(prefix)
    .timeout({
      response: 26000,
      deadline: 60000
    });

// ================================

exports.searchDirectors = async ({ query, lang = "en" }) => {
  try {
    const response = await generateRequest({
      method: superagent.get,
      path: "/directors",
      query: {
        query,
        lang
      }
    });

    return response.body.directors;
  } catch (error) {
    console.log("error in searchDirectors in sdk: ", error.response);
    throw new Error(error.response.body.error.description);
  }
};

// ================================

exports.getDirectorInfo = async ({ directorId, lang = "en" }) => {
  try {
    const response = await generateRequest({
      method: superagent.get,
      path: "/directors/director",
      query: {
        directorId,
        lang
      }
    });

    return response.body.directorInfo;
  } catch (error) {
    console.log("error in getDirectorInfo in sdk: ", error.response);
    throw new Error(error.response.body.error.description);
  }
};

// ================================

exports.getMoviesByDirector = async ({ directorId, lang = "en" }) => {
  try {
    const response = await generateRequest({
      method: superagent.get,
      path: "/directors/movies",
      query: {
        directorId,
        lang
      }
    });

    return response.body.movies;
  } catch (error) {
    console.log("error in getMoviesByDirector in sdk: ", error.response);
    throw new Error(error.response.body.error.description);
  }
};

// ================================

exports.createUser = async ({ login, email, password }) => {
  try {
    const response = await generateRequest({
      method: superagent.post,
      path: "/users",
      query: {
        login,
        email,
        password
      }
    });

    return {
      user: response.body.user
    };
  } catch (error) {
    console.log("error in createUser in sdk: ", error.response);
    if (error.response.body.error.errorCode === "u001") {
      return {
        errorCode: "u001",
        duplicateFields: error.response.body.error.duplicateFields
      };
    } else {
      throw new Error(error.response.body.error.description);
    }
  }
};

// ================================

exports.login = async ({ loginOrEmail, password }) => {
  try {
    const response = await superagent
      .get("/login")
      .auth(loginOrEmail, password)
      .use(prefix);

    return response.body.user;
  } catch (error) {
    console.log("error in login in sdk: ", error.response);
    throw new Error(error.response.error.status);
  }
};

// ================================

exports.addDirectorToFavorites = async ({
  directorId,
  directorName,
  directorImage,
  userId
}) => {
  try {
    const response = await generateRequest({
      method: superagent.put,
      path: "/users/director",
      query: {
        directorId,
        directorName,
        directorImage,
        userId
      }
    });

    return response.body.director;
  } catch (error) {
    console.log("error in addDirectorToFavorites in sdk: ", error.response);
    if (
      error.response.body.error &&
      error.response.body.error.errorCode === "u003"
    ) {
      throw new Error(error.response.body.error.description);
    } else {
      throw new Error(error.response.body.errorMessage);
    }
  }
};

// ================================

exports.getFavoriteDirectors = async userId => {
  try {
    const response = await generateRequest({
      method: superagent.get,
      path: "/users/directors",
      query: {
        userId
      }
    });

    return response.body.favoriteDirectors;
  } catch (error) {
    console.log("error in getFavoriteDirectors in sdk :", error);
    throw error;
  }
};

// ================================

exports.removeFromFavorites = async ({ userId, directorId }) => {
  try {
    const response = await generateRequest({
      method: superagent.delete,
      path: "/users/director",
      query: {
        userId,
        directorId
      }
    });

    return response;
  } catch (error) {
    console.log("error in removeFromFavorites in sdk: ", error.response);
    if (
      error.response.body.error &&
      error.response.body.error.errorCode === "u003"
    ) {
      throw new Error(error.response.body.error.description);
    } else {
      throw new Error(error.response.body.errorMessage);
    }
  }
};

// ================================

/* exports.getFavoriteDirectorMovies = async ({ userId, directorId }) => {
  try {
    const response = await superagent
      .get("/users/director/movies")
      .query({
        userId,
        directorId
      })
      .use(prefix);

    return response.body.movies;
  } catch (error) {
    console.log("error :", error);
    return [];
  }
};
 */

// ================================

exports.toggleMovieWatched = async ({ userId, directorId, movieId }) => {
  try {
    const response = await generateRequest({
      method: superagent.put,
      path: "/users/movie",
      query: {
        userId,
        directorId,
        movieId
      }
    });

    return response.body.watched;
  } catch (error) {
    console.log("error in toggleMovieWatched in sdk: ", error.response);
    throw new error(error.response.body.errorMessage);
  }
};

// ================================
