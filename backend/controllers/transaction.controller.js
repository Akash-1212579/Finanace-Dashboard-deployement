// const fs = require("fs");
// const {parseCsvUpload} = require("../services/csv.service");

// const {processCsvHandle} = require("../services/transaction.service");
// async function uploadCsvHandler(req, res) {
//   try {
//   if (!req.file) {
//     return res.status(400).json({ error: "CSV file is required" });
//   }
//   const accountId = Number(req.query.accountId);
//   if (!accountId) {
//     return res.status(400).json({ error: "Valid accountId is required" });
//   }
//     const filePath = req.file.path;
//     const parsedData = await parseCsv(filePath);
//     fs.unlinkSync(filePath);


//     return res.status(200).json({
//       success: true,
//       totalRows: parsedData.length,
//       dataPreview: parsedData
//     });
//   } catch (error) {
//     console.log("error from transaction controller is ",error.message);
//      res.status(500).json({ error: err.message });
//   }
// }
// module.exports = {uploadCsvHandler};


const { processCSVUpload } = require("../services/transaction.service");
const {csvCategorizationScript} = require("../scripts/categorizeCsv");
async function uploadCsvHandler(req, res) {
  try {
    //const userId = req.user.id;
    //const {userId, accountId } = req.body;
    const userId = Number(req.userId);
    //const accountId = Number(req.body.accountId);
    //console.log("account id is ",accountId)
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file uploaded" });
    }

    const result = await processCSVUpload({
      userId,
      
      fileBuffer: req.file.buffer
    });
    
    await csvCategorizationScript(userId);


    res.json({ 
     "csv upload": "success",
     "categorization":"success"
    });

  } catch (err) { 
   
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}



module.exports = { uploadCsvHandler };
