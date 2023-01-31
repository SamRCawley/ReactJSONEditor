import { render, screen } from '@testing-library/react';
import App from './App';
import template from './utils/template';
import hash from './utils/hash';


//not working.  Need to reformat JSON template to match formatting that will output
test('SHA256 calc matches known calculation', () => {
  let oldHash = template.checksum;
  template.checksum = ""
  hash(template);
  expect(template.checksum).toBe(oldHash);
});
