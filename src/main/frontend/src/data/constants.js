// Set default values as false
export const isLoggedIn = localStorage.getItem('isLoggedIn') || false;
export const isLoggedIn_session = sessionStorage.getItem('isLoggedIn') || false;
export const email = localStorage.getItem('loggedinuseremail') || '';
export const email_session = sessionStorage.getItem('loggedinuseremail') || '';

export const rank = localStorage.getItem('loggedinuserrank') || '';
export const rank_session = sessionStorage.getItem('loggedinuserrank') || '';
