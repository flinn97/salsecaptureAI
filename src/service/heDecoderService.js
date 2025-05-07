import he from "he";

function stripHTML(html){
    if (typeof html === "string"){
    const noTags = html.replace(/<[^>]+>/g, "");
    const plainText = he.decode(noTags);
    return plainText.replace(/\s+/g, " ").trim();
    }
}

export default stripHTML