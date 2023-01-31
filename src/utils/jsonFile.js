
export default function parseJson (e) {
    let jsonFile = document.getElementById("jsonFile").value;
    try {
        jsonFile = JSON.parse(jsonFile);
        //console.log(savFile);
        return jsonFile;
    } catch (error) {
        //console.log("invalid JSON");
        return false;
    }
}
