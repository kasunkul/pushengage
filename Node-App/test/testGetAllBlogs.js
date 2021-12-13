const { assert } = require("chai");
const axios = require("axios");

describe("blog/getAll GET", () => {

    it("should successfully get a list of blogs", async() => {
        let response = await axios.get("http://localhost:5000/blog/getAll?pageNumber=1&pageSize=3");
        let response_status = response.status;
        let response_data = response.data;

        //verify the reposonse status is correct
        assert.strictEqual(response_status, 200, "status code incorrect");

        //verify the reposonse data is correct
        assert.isArray(response_data.data.blogs, 'Data format is incorrect');

        //verify the reposonse message/status is correct
        assert.strictEqual(response_data.message, "Success", 'message/status is incorrect');
    });
});