import { CFP_ALLOWED_PATHS } from './constants';
import { getCookieKeyValue } from './utils';
import { getTemplate } from './template';


// Respond to OPTIONS method
export const onRequestOptions: PagesFunction = async () => {  
	return new Response(null, {    
		status: 204,    
		headers: {      
			'Access-Control-Allow-Origin': '*',      
			'Access-Control-Allow-Headers': '*',      
			'Access-Control-Allow-Methods': 'GET, OPTIONS',      
			'Access-Control-Max-Age': '86400',    
		},  
	});
};

// Set CORS to all /api responses
export const onRequest: PagesFunction = async ({ next }) => {  
	const response = await next();  
	response.headers.set('Access-Control-Allow-Origin', '*');  
	response.headers.set('Access-Control-Max-Age', '86400');  
	return response;
};


/*
export async function onRequest(context: {
  request: Request;
  next: () => Promise<Response>;
  env: { CFP_PASSWORD?: string };
}): Promise<Response> {
  const { request, next, env } = context;
  const { pathname, searchParams } = new URL(request.url);
  const { error } = Object.fromEntries(searchParams);
  const cookie = request.headers.get('cookie') || '';
  const cookieKeyValue = await getCookieKeyValue(env.CFP_PASSWORD);

  if (
    cookie.includes(cookieKeyValue) ||
    CFP_ALLOWED_PATHS.includes(pathname) ||
    !env.CFP_PASSWORD
  ) {
    // Correct hash in cookie, allowed path, or no password set.
    // Continue to next middleware.
    return await next();
  } else {
    // No cookie or incorrect hash in cookie. Redirect to login.
    return new Response(getTemplate({ redirectPath: pathname, withError: error === '1' }), {
      headers: {
        'content-type': 'text/html'
      }
    });
  }
}
*/
