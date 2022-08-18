import { useRouter } from 'next/router';
import { FormEvent, FormEventHandler, useRef, useState } from 'react';

type MatchesSearchProps = {
  onSubmit: (year: string, month: string) => void;
};

export const MatchesSearch: React.FC<MatchesSearchProps> = ({ onSubmit }) => {
  const [year, setYear] = useState('2022');
  const [month, setMonth] = useState('07');


  // he uses refs
  const yearInputRef = useRef<HTMLSelectElement>();
  const monthInputRef = useRef<HTMLSelectElement>();

  // it is questionable if this component should be handling all of this by ite3self and hold this much logic - prolyl should be as dumb as possible
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(yearInputRef.current.value, monthInputRef.current.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor='year'>Year</label>
          <select ref={yearInputRef} id='year'>
            <option value='2021'>2021</option>
            <option value='2022'>2022</option>
          </select>
        </div>

        <div>
          <label htmlFor='month'>Month</label>
          <select ref={monthInputRef} id='month'>
            <option value='07'>07</option>
            <option value='08'>08</option>
          </select>
        </div>

        <button type='submit'>Search</button>
      </form>
    </div>
  );
};
