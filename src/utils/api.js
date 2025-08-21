import { apiClient } from './apiClient';

const API_URL = import.meta.env.VITE_API_URL;

export function uploadDocument(documentData) {
  return apiClient(`${API_URL}/api/upload/document`, {
    method: 'POST',
    body: documentData
  });
}

export function sendMessage(message, documentIdList) {
  return apiClient(`${API_URL}/api/message/send`, {
    method: 'POST',
    body: {
      message: message,
      documentIdList: documentIdList
    }
  });
}
