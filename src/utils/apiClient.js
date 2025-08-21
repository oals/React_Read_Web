
const defaultHeaders = {
  'Content-Type': 'application/json',
};

export async function apiClient(
  endpoint,
  { method = 'GET', body, headers, credentials = 'same-origin', retry = true, ...rest } = {}
) {

  const isFormData = body instanceof FormData;

  const config = {
    method,
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    credentials,
    ...rest,
  };

  if (isFormData) {
    delete config.headers['Content-Type'];
  }

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  let res = await fetch(endpoint, config);

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || res.statusText);
  }

  return res;
}