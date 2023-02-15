import { ErrorResponseDto } from '@demo/shared/utils';

export const handleErrorMessage = (
  map: Record<string, string>,
  error: ErrorResponseDto
): string => {
  const statusKey = `status:${error.status}`;

  const messageKeys = error.message.map((m) => `message:${m}`);

  const existingMessages = messageKeys
    .map((key) => map[key])
    .filter((v) => !!v);

  const hasMessageMapped = existingMessages.length > 0;

  if (hasMessageMapped) {
    return existingMessages[0];
  }

  const existingStatus = map[statusKey];

  return existingStatus || error.message[0];
};
