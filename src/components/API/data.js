const apiList = [
  {
    'title': 'List Routes',
    'description': 'List all routes with parameters and descriptions.',
    'url': 'https://api.covid19api.com/'
  },  
  {
    'title': 'Get Summary Data',
    'description': 'Return new cases and total cases per country.',
    'url': 'https://api.covid19api.com/summary'
  },  
  {
    'title': 'Get All Data',
    'description': 'This call returns ~8MB of data and currently takes around 5 seconds.',
    'url': 'https://api.covid19api.com/all'
  },  
  {
    'title': 'Get All Countries',
    'description': 'List all countries and their provinces.',
    'url': 'https://api.covid19api.com/countries'
  },  
  {
    'title': 'Get Status By Country',
    'description': '{country} must be the country_slug the API call above {status} must be one of: confirmed, deaths, recovered.',
    'url': 'https://api.covid19api.com/total/country/{country}/status/{status}'
  },  
  {
    'title': 'Get Status By Country And Province',
    'description': '{country} must be the country_slug the API call above {status} must be one of: confirmed, deaths, recovered.',
    'url': 'https://api.covid19api.com/country/{country}/status/{status}'
  },  
  {
    'title': 'Get Status By Country From First Recorded Case',
    'description': '{country} must be the country_slug the API call above {status} must be one of: confirmed, deaths, recovered.',
    'url': 'https://api.covid19api.com/total/dayone/country/{country}/status/{status}'
  },  
  {
    'title': 'Get Status By Country And Province From First Recorded Case',
    'description': '{country} must be the country_slug the API call above {status} must be one of: confirmed, deaths, recovered',
    'url': 'https://api.covid19api.com/dayone/country/{country}/status/{status}'
  },  
  {
    'title': 'Submit Webhook',
    'description': 'Submit a webhook to be notified on new cases. The body of the webhook is the response from /summary and contains new and existing cases per country.',
    'url': 'POST https://api.covid19api.com/webook ... Body: {"URL":"https://api.covid19api.com/webhook"}'
  },  



]

export default apiList
