import { TIMEOUT_SEC } from './config.js';

/**
 * Creates a promise that rejects after a given number of seconds.
 * @param {number} seconds Maximum time to wait before rejecting.
 * @returns {Promise<never>} A promise that rejects with a timeout error.
 */
const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(
        new Error(`Request took too long! Timeout after ${seconds} second`),
      );
    }, seconds * 1000);
  });
};

/**
 * Performs a GET request when no upload data is supplied, or a POST request when data is provided.
 * @param {string} url The request URL.
 * @param {Object} [uploadData=undefined] Optional payload sent as JSON.
 * @param {string} [message='Something went wrong while loading the recipe'] Fallback error message.
 * @returns {Promise<Object>} Parsed JSON response from the API.
 */
export const AJAX = async function (
  url,
  uploadData = undefined,
  message = 'Something went wrong while loading the recipe',
) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    const errorMessage = data.message || data.error || message;

    if (!res.ok) throw new Error(`${errorMessage} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
