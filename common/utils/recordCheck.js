async function recordCheck(model, condition) {
    try {
      let conditionPair = {};
      let response = { status: false };
  
      for (let [key, value] of Object.entries(condition)) {
        conditionPair[key] = value;
      }
  
      let masterCondition = {
        where: {
          is_deleted: false,
          ...conditionPair
        }
      };
  
      let count = await model.count(masterCondition);
      response.status = count > 0;
  
      return response;
    } catch (err) {
      console.log('Something went wrong!')
    }
}

module.exports = {
    recordCheck
}