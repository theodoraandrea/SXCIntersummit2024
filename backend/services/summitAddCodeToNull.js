const Summit = require("../models/summit");
const { generateTeamCode } = require("../utils/generateTeamCode");

const updateNullSummitCodes = async () => {
  try {
    const rows = await Summit.findAll({
      where: { summitRegistrationCode: null },
    });

    if (rows.length === 0) {
      console.log("No rows found with NULL summitRegistrationCode.");
      return;
    }

    console.log(`Found ${rows.length} rows to update.`);

    const existingCodes = new Set();

    const allSummits = await Summit.findAll();
    allSummits.forEach((summit) => {
      if (summit.summitRegistrationCode) {
        existingCodes.add(summit.summitRegistrationCode);
      }
    });

    for (const row of rows) {
      let newCode;
      do {
        newCode = generateTeamCode(8);
      } while (existingCodes.has(newCode));
      existingCodes.add(newCode);
      await row.update({ summitRegistrationCode: newCode });
      console.log(`Updated row ID ${row.id} with code: ${newCode}`);
    }

    console.log("All NULL codes updated successfully.");
  } catch (error) {
    console.error("Error updating summit codes:", error);
  }
};

module.exports = { updateNullSummitCodes };
