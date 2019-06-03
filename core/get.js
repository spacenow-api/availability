import * as dynamoDbLib from "../libs/dynamodb-lib"
import { success, failure } from "../libs/response-lib"

export const main = async (event, context) => {
  
  const params = {
    TableName: process.env.tableName,
    Key: {
      listingId: event.pathParameters.id
    }
  }

  try {
    const result = await dynamoDbLib.call("get", params);
    console.log("RESULT --->>> ", result);
    if (result.Item)
      return success(result.Item)
    else
      return failure({ status: false, error: "Booking not found." })
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }

}