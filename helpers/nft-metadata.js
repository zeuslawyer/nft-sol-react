/**
 * Generate NFT metadata including image SVG encoded as base64.
 * @param {string} name the unique NFT name
 * @param {string} base64str base64 encoded svg that renders the NFT image
 * @returns stringified JSON object containing the generated NFT metadata.
 */
const generateMetadataJsonString = (name, base64str) =>{
    const image="data:image/svg+xml;base64," + base64str
    return JSON.stringify(
        {
            name,
            description:"An NFT from the highly acclaimed square collection",
            image
        }
    )
}

module.exports = {generateMetadataJsonString}