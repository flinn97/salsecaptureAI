/**
 * A utility service for handling URL-related operations.
 * This class provides methods for validating URLs, extracting parts of URLs, and manipulating URL strings.
 */
 class UrlService {
  /**
   * Checks if the given string is likely a valid URL.
   * This is based on common domain suffixes or the presence of "http(s)://" or "mailto:".
   * @param {string} url - The string to validate as a URL.
   * @returns {boolean} - True if the string is likely a URL, false otherwise.
   */
  isLikelyUrl(url) {
      // Check for common domain suffixes or the presence of "http(s)://" or "mailto:" at the start.
      return /\.(com|net|org|io|gov|edu|co)\b/.test(url) || 
             /^(?:f|ht)tps?\:\/\//.test(url) || 
             /^mailto\:/i.test(url);
  }

  /**
   * Checks if the current page's URL contains the specified string.
   * @param {string} s - The string to search for in the current URL.
   * @returns {boolean} - True if the string is found in the URL, false otherwise.
   */
  checkURLforString(s) {
      let href = window.location.href; // Get the current page's full URL.
      return href.includes(s); // Check if the URL contains the specified string.
  }

  /**
   * Extracts an ID from the current page's URL based on its position and optional hyphen splitting.
   * @param {boolean} hyphen - Whether to split the ID by hyphens.
   * @param {number} index - The index of the ID in the split array. Defaults to the first element.
   * @returns {string} - The extracted ID from the URL.
   */
  getIdFromURL(hyphen, index) {
      let href = window.location.href; // Get the current page's full URL.
      let splitURL = href.split("/"); // Split the URL by slashes.
      let id = splitURL[splitURL.length - 1]; // Get the last segment of the URL.

      // Split the ID by hyphen if requested, otherwise wrap it in an array.
      let idList = hyphen ? id.split("-") : [id];
      
      // Return the element at the specified index or the first element by default.
      let campId = index ? idList[index] : idList[0];
      return campId;
  }

  /**
   * Extracts the second-to-last segment (typically the type) from the current page's URL.
   * @returns {string} - The type segment from the URL.
   */
  getTypeFromURL() {
      let href = window.location.href; // Get the current page's full URL.
      let splitURL = href.split("/"); // Split the URL by slashes.
      let type = splitURL[splitURL.length - 2]; // Get the second-to-last segment of the URL.
      return type;
  }

  /**
   * Converts a string into a valid URL by ensuring it starts with "http://" or "https://".
   * @param {string} string - The input string to convert.
   * @returns {string} - A valid URL string starting with "https://", or the original string if undefined.
   */
  convertStringToLink = (string) => {
      if (string) {
          // Prepend "https://" if the string doesn't already start with "http://" or "https://".
          if (!string.startsWith("http://") && !string.startsWith("https://")) {
              return "https://" + string;
          } else {
              return string; // Return the string as-is if it's already a valid URL.
          }
      }
      return string; // Return the original string if undefined or empty.
  };
}
let urlService = new UrlService();
export {urlService, UrlService};
