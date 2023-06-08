export function countries(movie) {  
  let production_countries = '';
  if (movie['production_countries'].length === 0) {
    production_countries = '국가정보 미확인';
  } else {
    const nationCode = movie['production_countries'][0]['iso_3166_1'];
    switch (nationCode) {
      case '':
        production_countries = '국가정보 미확인';
        break;
      case 'KR':
        production_countries = '한국';
        break;
      case 'US':
        production_countries = '미국';
        break;
      case 'CN':
        production_countries = '중국';
        break;
      case 'JP':
        production_countries = '일본';
        break;
      case 'GB':
        production_countries = '영국';
        break;
      case 'FR':
        production_countries = '프랑스';
        break;
      case 'IN':
        production_countries = '인도';
        break;
      case 'DE':
        production_countries = '독일';
        break;
      case 'MX':
        production_countries = '멕시코';
        break;
      case 'RU':
        production_countries = '러시아';
        break;
      case 'KP':
        production_countries = '북한';
        break;
      case 'NZ':
        production_countries = '뉴질랜드';
        break;
      default:
        production_countries = '국가정보 미확인';
        break;
    }
  }
  return production_countries;
}