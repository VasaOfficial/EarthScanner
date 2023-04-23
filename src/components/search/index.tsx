import { useEffect, useRef } from 'react';
import { Input } from '@nextui-org/react';
import { Loader } from '@googlemaps/js-api-loader';
import { env } from '~/env.mjs';

const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: env.NEXT_PUBLIC_GOOGLE_MAP_API ? env.NEXT_PUBLIC_GOOGLE_MAP_API : '',
      version: 'weekly',
      libraries: ['places'],
    });
  
    loader.load().then(() => {
      const input = inputRef.current;
      if (input) {
        const autocomplete = new google.maps.places.Autocomplete(input);
  
        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          console.log(place);
        });
      }
    }).catch((err) => {
      console.error(err);
    });
  
  }, []);  

  return (
    <>
      <Input size="xl" placeholder="Enter Location" type="search" clearable animated ref={inputRef} />
    </>
  );
};

export default Search;
