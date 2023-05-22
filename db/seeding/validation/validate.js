const { recordCheck } = require('../../../common/utils/recordCheck')

/**
 * @param {tableName,jsonData,model,propery} getJosonData : This method will accept json and proceed
 * for column mapping
 */
module.exports.validateJSON = async(jsonData, model, field) => {

  let finalObject = [];

  for (let singleData of jsonData) {
    
    singleData.created_ts = new Date();
    singleData.updated_ts = new Date();
    singleData.is_deleted = false;

    const condition = { [field]: singleData[field] };
    let { status } = await recordCheck(model, condition);
    
    if (status === false) {
      finalObject.push(singleData);
    } else {
      continue;
    }

  }

  return finalObject;
}
