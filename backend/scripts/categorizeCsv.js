// const fs = require("fs");
// const csv = require("csv-parse");
// const { createObjectCsvWriter } = require("csv-writer");
// const {categorizeExpense} = require("../services/expenseCategorizer.service");
// // const inputFile = "./data/transactions.csv";
// // const outputFile = "./data/transactions_with_category.csv";

// const prisma = require("../config/db.config");

// const rows = [];
// async function processCsv() {
//     fs.createReadStream(inputFile).pipe(csv())
//     .on("data",(row)=>{
//         rows.push(row)
//     }).on("end",async ()=>{
//         console.log("CSV read completed");
//           for (let row of rows) {
//         console.log(`Categorizing: ${row.description}`);
//         row.category = await categorizeExpense(row.Particulars);
//       }

//       const csvWriter = createObjectCsvWriter({
//         path: outputFile,
//         header: [
//           { id: "date", title: "date" },
//           { id: "description", title: "description" },
//           { id: "amount", title: "amount" },
//           { id: "category", title: "category" }
//         ]
//       });
//          await csvWriter.writeRecords(rows);
//       console.log("Categorized CSV created successfully");

//     })

// }
// processCsv();


const prisma = require("../config/db.config");
const {categorizeExpense} = require("../services/expenseCategorizer.service");
async function csvCategorizationScript(userId) {
  console.log(`categorization has been started for ${userId}`);

  //here fetching data of transactions which matches with userId and 
  //categoryId is null 
   //console.log(`Categorization started for user ${userId}`);

  const llmInputTransactions = await prisma.transaction.findMany({
    where: { userId, categoryId: null },
    select: { id: true, description: true }
  });
  if (llmInputTransactions.length === 0) {
    console.log("No uncategorized transactions");
    return;
  }
  /*
  input is {id:1,description:"UPI4783xx/receiverbankName/merchantName/msg"}
  output should be {id:1,description:"merchantName/msg"}
  */
  const llmFilteredInput = [];
  for(let ele of llmInputTransactions)
  {
    const requiredData = ele.description;
    const dataArray = requiredData.split("/");
    const requiredDescription = dataArray.slice(2).join(" for ");
    llmFilteredInput.push({id:ele.id,description:`paid to ${requiredDescription}`})
  }
  console.log("LLM input is\n",llmFilteredInput);


   let llmCategorizedOutput;
  try {
    llmCategorizedOutput = await categorizeExpense(llmFilteredInput);
    console.log(llmCategorizedOutput);
  } catch (err) {
    console.error("LLM failed", err);
    return;
  }
  //now llmInputTransactions is ready i think but now i want to pass this 
  // data to a llm in a file expenseCategorizeer.servixe.js
  //first importiung that module
  
  //now llm given output but its not directly json data of inputs
  //it is a json of many things that doesnt require so giving this 
  //job to other module

  // now i get the categories now i have to iterate over llmCategorizedOutput
  // and updating the category id (of transaction table)
  //selecting trsctnId and from category table checking the id with respect to 
  //given llm category and updating this categoryId in trsctn table

 

  await applyCategorization(llmCategorizedOutput, userId);

}

async function applyCategorization(llmOutput, userId) {
  for (const item of llmOutput) {
    const { transactionId, category } = item;

    //  Find categoryId for this user
    const categoryRow = await prisma.category.findUnique({
      where: {
        name_userId: {
          name: category,
          userId: userId
        }
      }
    });

    // Safety check 
    if (!categoryRow) {
      console.warn(
        `Category '${category}' not found for user ${userId}, skipping transaction ${transactionId}`
      );
      continue;
    }

    //  Update transaction with categoryId
    await prisma.transaction.updateMany({
      where: {
        id: transactionId,
        userId: userId
      },
      data: {
        categoryId: categoryRow.id
      }
    });
  }
}



module.exports = {csvCategorizationScript}