export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!apiUrl || apiUrl === 'mock') {
    return 'mock';
  }
  
  return apiUrl;
};

export const isMockApi = () => {
  return getApiUrl() === 'mock';
};

export const getBaseUrl = () => {
  const apiUrl = getApiUrl();
  if (apiUrl === 'mock') {
    return '';
  }
  return apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
}; 