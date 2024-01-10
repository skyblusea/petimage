export const getGoogleLoginUrl = () => {
  const params = {
    'client_id': import.meta.env.VITE_GOOGLE_CLIENT_ID,
    'redirect_uri': 'http://localhost:5173',
    'response_type': 'token',
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),  
    'include_granted_scopes': 'true',
    'state': 'pass-through value'//현재 url 로 다시 돌아올때 파라미터로 전달되는 값
    }
    
    const qs = new URLSearchParams(params);
    return `https://accounts.google.com/o/oauth2/v2/auth?${qs.toString()}`;
}


export const getTokenURL = (code: string) => {
  const params = {
    'client_id': import.meta.env.VITE_GOOGLE_CLIENT_ID,
    'client_secret': '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',
    'code': code,
    'grant_type': 'authorization_code',
    }
    const qs = new URLSearchParams(params);
    return `https://oauth2.googleapis.com/token?${qs.toString()}`;
}