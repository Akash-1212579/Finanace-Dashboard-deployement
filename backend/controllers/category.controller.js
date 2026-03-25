const { createCategory } = require("../services/category.service");

async function handleCategory(req, res) {
  try {
    const userId = Number(req.userId); // from auth middleware

    const result = await createCategory(userId);

    if (result.created === false) {
      return res.status(200).json({
        success: true,
        message: "Default categories already exist"
      });
    }

    // result.created === true
    return res.status(201).json({
      success: true,
      message: "Default categories created successfully"
    });

  } catch (err) {
    console.error("Error from category controller:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to create categories"
    });
  }
}

module.exports = { handleCategory };
