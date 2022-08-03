import execa from 'execa';
import logger from '../api/logger';

/**
 * Remove local file on server with filePath
 * @param filePath
 */
export function removeFile(filePath) {
  const removeCmd = `rm ${filePath}`;
  try {
    execa.command(removeCmd);
  } catch (error) {
    logger.error('removeFile execa error:', error);
    logger.error('removeFile execa error, filePath:', filePath);
  }
}
