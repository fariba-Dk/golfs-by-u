require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");


const app = express();

app.use(cors());
app.use(express.json());

// Get all courses
app.get("/api/v1/courses", async (req, res) => {
  try {
    //const results = await db.query("select * from courses");
    const courseRatingData = await db.query(
      "select * from courses left join (select course_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by course_id) reviews on courses.id = reviews.course_id;"
    );

    res.status(200).json({
      status: "success",
      results: courseRatingData.rows.length,
      data: {
        courses: courseRatingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a course
app.get("/api/v1/courses/:id", async (req, res) => {
  console.log(req.params.id);

  try {
    const course = await db.query(
      "select * from courses left join (select courses_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by course_id) reviews on courses.id = reviews.course_id where id = $1",
      [req.params.id]
    );
    // select * from courses wehre id = req.params.id

    const reviews = await db.query(
      "select * from reviews where courses_id = $1",
      [req.params.id]
    );
    console.log(reviews);

    res.status(200).json({
      status: "success",
      data: {
        course: course.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Add a Course

app.post("/api/v1/courses", async (req, res) => {
  console.log(req.body);

  try {
    const results = await db.query(
      "INSERT INTO courses (name, location, price_range) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

// Update courses

app.put("/api/v1/courses/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE courses SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        course: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
  console.log(req.body);
});

// Delete Restaurant

app.delete("/api/v1/courses/:id", async (req, res) => {
  try {
    const results = db.query("DELETE FROM courses where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "sucess",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/courses/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (course_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    console.log(newReview);
    res.status(201).json({
      status: "success",
      data: {
        review: newReview.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
