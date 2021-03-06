const express = require('express');
const cors = require('cors');
const app = express();

const db = require('./db');
require('dotenv').config()


app.use(cors());
app.use(express.json());

// Get all courses
app.get( "/api/v1/courses", async ( req, res ) => {

  try {
    //const results = await db.query("select * from courses");
    const coursedescriptionData = await db.query(
      "select * from courses"
      // left join (select course_id, COUNT(*), TRUNC(AVG(description),1) as average_description from reviews group by course_id) reviews on courses.id = reviews.course_id;"
    );

    res.status(200).json({
      status: "success",
      results: coursedescriptionData.rows.length,
      data: {
        // courses:['taco','wendy']
        courses: coursedescriptionData.rows,
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
      "select * from courses left join (select courses_id, COUNT(*), TRUNC(AVG(description),1) as average_description from reviews group by course_id) reviews on courses.id = reviews.course_id where id = $1",
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
      "INSERT INTO courses (name, location, num_holes) values ($1, $2, $3) returning *",
      [req.body.name, req.body.location, req.body.num_holes]
    );
    console.log(results);
    res.status(201).json({
      status: "success",
      data: {
        course: results.rows[0],
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
      "UPDATE courses SET name = $1, location = $2, num_holes = $3 where id = $4 returning *",
      [req.body.name, req.body.location, req.body.num_holes, req.params.id]
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

// Delete course

app.delete("/api/v1/courses/:id", async (req, res) => {
  try {
    const result = db.query("DELETE FROM courses where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/v1/courses/:id/addReview", async (req, res) => {
  try {
    const newReview = await db.query(
      "INSERT INTO reviews (course_id, title, review, description) values ($1, $2, $3, $4) returning *;",
      [req.params.id, req.body.title, req.body.review, req.body.description]
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

const port = process.env.PORT || 3009;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
